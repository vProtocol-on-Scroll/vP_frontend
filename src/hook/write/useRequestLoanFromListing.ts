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
import { ethers } from "ethers";
import { ErrorDecoder } from "ethers-decode-error";

const useRequestLoanFromListing = (
    _orderId: number,
    _amount: string,
	tokenDecimal: number
) => {
	const { chainId } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();

	const errorDecoder = ErrorDecoder.create([peer]);

	return useCallback(async () => {
		if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK");

		const readWriteProvider = getProvider(walletProvider);
		const signer = await readWriteProvider.getSigner();
		const contract = getVProtocolContract(signer, peer);

		const _weiAmount = ethers.parseUnits(_amount, tokenDecimal);

		let toastId: string | number | undefined;

		try {
			toastId = toast.loading(`Processing borrow transaction...`);

			const transaction = await contract.requestLoanFromListing(_orderId,_weiAmount);
			const receipt = await transaction.wait();

			if (receipt.status) {
				toast.success(`${_amount} successfully borrowed!`, {
					id: toastId,
				});
			}
		} catch (error: unknown) {
			try {
				const decodedError = await errorDecoder.decode(error);
				console.error("Transaction failed:", decodedError);
				toast.error(`Transaction failed: ${decodedError}`, { id: toastId });
			} catch (decodeError) {
				console.error("Error decoding failed:", decodeError);
				toast.error("Transaction failed: Unknown error", { id: toastId });
			}
		}
	}, [_amount, _orderId, chainId, errorDecoder, tokenDecimal, walletProvider]);
};

export default useRequestLoanFromListing;
