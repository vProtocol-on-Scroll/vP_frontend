import {
	useWeb3ModalAccount,
	useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { isSupportedChain } from "../../constants/utils/chains";
import { toast } from "sonner";
import { getProvider } from "../../api/provider";
import {
	getERC20Contract,
	getVProtocolContract,
} from "../../api/contractsInstance";
import peer from "../../abi/peer.json";
import erc20 from "../../abi/erc20.json";
import { MaxUint256 } from "ethers";
import { ErrorDecoder } from "ethers-decode-error";
import { envVars } from "../../constants/config/envVars";
import useCheckAllowances from "../read/useCheckAllowances";

const useServiceRequest = (
	_amount: string,
	_requestId: number,
	tokenTypeAddress: string,
) => {
	const { chainId } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();
	const { data: allowanceVal = 0, isLoading } = useCheckAllowances(tokenTypeAddress);

	const errorDecoder = ErrorDecoder.create([peer, erc20]);

	console.log("_amount", _amount, "_requestId,", _requestId, "tokenTypeAddress", tokenTypeAddress);
	

	return useCallback(async () => {
        if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK");
        if (isLoading) return toast.loading("Checking allowance...");

		const readWriteProvider = getProvider(walletProvider);
		const signer = await readWriteProvider.getSigner();
		const contract = getVProtocolContract(signer, peer);
		const erc20contract = getERC20Contract(signer, tokenTypeAddress);


		let toastId: string | number | undefined;

		try {
			toastId = toast.loading(`Processing... Servicing request...`);

			if (allowanceVal == 0 || allowanceVal < Number(_amount)) {
				const allowance = await erc20contract.approve(
					envVars.vProtocolContractAddress,
					MaxUint256
				);
				const allowanceReceipt = await allowance.wait();

				if (!allowanceReceipt.status)
					return toast.error("Approval failed!", { id: toastId });
			}

			const transaction = await contract.serviceRequest(
				_requestId,
				tokenTypeAddress
			);
			const receipt = await transaction.wait();

			if (receipt.status) {
				toast.success(`request ${_requestId} successfully serviced!`, {
					id: toastId,
				});
			}
		} catch (error: unknown) {
			try {
				const decodedError = await errorDecoder.decode(error);
				console.error("Transaction failed:", decodedError.reason);
				toast.error(`Transaction failed: ${decodedError.reason}`, { id: toastId });
			} catch (decodeError) {
				console.error("Error decoding failed:", decodeError);
				toast.error("Transaction failed: Unknown error", { id: toastId });
			}
		}
	}, [chainId, isLoading, walletProvider, tokenTypeAddress, allowanceVal, _amount, _requestId, errorDecoder]);
};

export default useServiceRequest;
