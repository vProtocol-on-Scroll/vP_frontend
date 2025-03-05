import {
	useWeb3ModalAccount,
	useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { isSupportedChain } from "../../constants/utils/chains";
import { toast } from "sonner";
import { getProvider } from "../../api/provider";
import { getVProtocolContract } from "../../api/contractsInstance";
import peer from "../../abi/peer.json";
import erc20 from "../../abi/erc20.json";
import { ethers } from "ethers";
import { ErrorDecoder } from "ethers-decode-error";

import { tokenData } from "../../constants/config/tokenData";
import { getTokenBalance } from "../../constants/utils/getBalances";
import { parseDate } from "../../constants/utils/formatDate";

const useCreateBorrowOrder = (
	_amount: string,
	_interest: number,
	_returnDate: string,
	tokenTypeAddress: string,
	tokenDecimal: number
) => {
	const { chainId, address } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();

	const errorDecoder = ErrorDecoder.create([peer, erc20]);

	return useCallback(async () => {
		if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK");
		if (!address) return toast.warning("CONNECT WALLET");

		const readWriteProvider = getProvider(walletProvider);
		const signer = await readWriteProvider.getSigner();
		const contract = getVProtocolContract(signer, peer);

		const _weiAmount = ethers.parseUnits(_amount, tokenDecimal);

		const _expirationDate = parseDate(_returnDate) + (30 * 24 * 3600) // 30 days expiration

		const _collateralAmounts: Array<string> = []
		const _collateralTokens: Array<string> = []

		for (let i = 0; i < tokenData.length; i++) {
			let token = tokenData[i]
			let balance = "0";
			if (token.address === "0x0000000000000000000000000000000000000001") {
				balance = "0" // await getEthBalance(address);
			} else {
				balance = await getTokenBalance(address, token.address, token.decimal);
			}

			if (balance !== "0") {
				_collateralTokens.push(token.address);
				_collateralAmounts.push(ethers.parseUnits(balance, token.decimal).toString());
			}
		}

		let toastId: string | number | undefined;

		try {
			toastId = toast.loading(`Processing order creation...`);

			const transaction = await contract.createAndMatchLendingRequest(
				_weiAmount, _interest * 100, parseDate(_returnDate), _expirationDate,
				tokenTypeAddress, _collateralTokens, _collateralAmounts);
			const receipt = await transaction.wait();

			if (receipt.status) {
				toast.success(`${_amount} order successfully created!`, {
					id: toastId,
				});
			}
		} catch (error: unknown) {
			try {
				const decodedError = await errorDecoder.decode(error);
				console.error("Transaction failed:", decodedError);
				toast.error(`Transaction failed: ${decodedError.reason}`, { id: toastId });
			} catch (decodeError) {
				console.error("Error decoding failed:", decodeError);
				toast.error("Transaction failed: Unknown error", { id: toastId });
			}
		}
	}, [
		_amount,
		chainId,
		errorDecoder,
		_interest,
		_returnDate,
		tokenDecimal,
		tokenTypeAddress,
		walletProvider,
	]);
};

export default useCreateBorrowOrder;
