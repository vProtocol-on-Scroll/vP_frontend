import {
	useWeb3ModalAccount,
	useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { isSupportedChain } from "../../constants/utils/chains";
import { toast } from "sonner";
import { getProvider } from "../../api/provider";
import { getVProtocolContract } from "../../api/contractsInstance";
import pool from "../../abi/pool.json";
import erc20 from "../../abi/erc20.json";
import { ethers } from "ethers";
import { ErrorDecoder } from "ethers-decode-error";
import { tokenData } from "../../constants/config/tokenData";
// import { getTokenBalance } from "../../constants/utils/getBalances";

const useBorrowPool = (
	tokenTypeAddress: string,
	_amount: string,
	tokenDecimal: number
) => {
	const { chainId, address } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();

	const errorDecoder = ErrorDecoder.create([pool, erc20]);

	return useCallback(async () => {
		if (!address) return toast.warning("CONNECT WALLET");
		if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK");

		const readWriteProvider = getProvider(walletProvider);
		const signer = await readWriteProvider.getSigner();
		const contract = getVProtocolContract(signer, pool);

		const _weiAmount = ethers.parseUnits(_amount, tokenDecimal);

		const _collateralAmounts: Array<string> = []
		const _collateralTokens: Array<string> = []

		for (let i = 0; i < tokenData.length; i++) {
			let token = tokenData[i]
			let balance = "0";
			if (token.address === "0x0000000000000000000000000000000000000001") {
				balance = "0" // await getEthBalance(address);
			} else {
				balance = "0" // await getTokenBalance(address, token.address, token.decimal);
			}

			if (balance !== "0") {
				_collateralTokens.push(token.address);
				_collateralAmounts.push(ethers.parseUnits(balance, token.decimal).toString());
			}
		}

		let toastId: string | number | undefined;

		console.log(_collateralTokens, _collateralAmounts,
			tokenTypeAddress, _weiAmount, true);

		try {
			toastId = toast.loading(`Processing borrow transaction...`);

			const transaction = await contract.createPosition(_collateralTokens, _collateralAmounts,
				tokenTypeAddress, _weiAmount, true);
			const receipt = await transaction.wait();

			if (receipt.status) {
				toast.success(`${_amount} successfully borrowed!`, {
					id: toastId,
				});
			}
		} catch (error: unknown) {
			console.log(error);
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
		tokenDecimal,
		tokenTypeAddress,
		walletProvider,
	]);
};

export default useBorrowPool;
