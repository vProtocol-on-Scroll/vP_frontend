import {
	useWeb3ModalAccount,
	useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { isSupportedChain } from "../../constants/utils/chains";
import { toast } from "sonner";
import { getProvider } from "../../api/provider";
import {getVProtocolContract,} from "../../api/contractsInstance";
import peer from "../../abi/peer.json";
import { ErrorDecoder } from "ethers-decode-error";

const useCloseListingAd = (
	_requestId: number,
) => {
	const { chainId } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();

	const errorDecoder = ErrorDecoder.create([peer]);

	return useCallback(async () => {
        if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK");

		const readWriteProvider = getProvider(walletProvider);
		const signer = await readWriteProvider.getSigner();
		const contract = getVProtocolContract(signer, peer);


		let toastId: string | number | undefined;

		try {
			toastId = toast.loading(`closing ads position...`);


			const transaction = await contract.closeListingAd(
				_requestId,
			);
			const receipt = await transaction.wait();

			if (receipt.status) {
				toast.success(`ads position of ${_requestId} closed!`, {
					id: toastId,
				});
			}
		} catch (error: unknown) {
			try {
				const decodedError = await errorDecoder.decode(error);
				console.error("Transaction failed:", decodedError.reason);
				toast.error(`ads closing failed: ${decodedError.reason}`, { id: toastId });
			} catch (decodeError) {
				console.error("Error decoding failed:", decodeError);
				toast.error("Repayment failed: Unknown error", { id: toastId });
			}
		}
	}, [chainId, walletProvider, _requestId, errorDecoder]);
};

export default useCloseListingAd;
