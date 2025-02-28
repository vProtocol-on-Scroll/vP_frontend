import {
	useWeb3ModalAccount,
	useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { isSupportedChain } from "../../constants/utils/chains";
import { toast } from "sonner";
import { getProvider } from "../../api/provider";
import useCheckAllowances from "../read/useCheckAllowances";
import {
	getERC20Contract,
	getVProtocolContract,
} from "../../api/contractsInstance";
import peer from "../../abi/peer.json";
import { ethers, MaxUint256 } from "ethers";
import { envVars } from "../../constants/config/envVars";
import { ErrorDecoder } from "ethers-decode-error";

const useDepositCollateral = (
	tokenTypeAddress: string,
	_amount: string,
	tokenDecimal: number
) => {
	const { chainId } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();
	const { data: allowanceVal = 0, isLoading } = useCheckAllowances(tokenTypeAddress); // Extract allowance

	const errorDecoder = ErrorDecoder.create([peer]);

	return useCallback(async () => {
		if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK");
		if (isLoading) return toast.loading("Checking allowance...");

		const readWriteProvider = getProvider(walletProvider);
		const signer = await readWriteProvider.getSigner();
		const erc20contract = getERC20Contract(signer, tokenTypeAddress);
		const contract = getVProtocolContract(signer, peer);

		const _weiAmount = ethers.parseUnits(_amount, tokenDecimal);
		let toastId: string | number | undefined;

		try {
			toastId = toast.loading(`Processing deposit transaction...`);

			// **Check Allowance and Approve if Needed**
			if (allowanceVal === 0 || allowanceVal < Number(_weiAmount)) {
				toast.loading(`Approving ${_amount} tokens...`, { id: toastId });

				const allowance = await erc20contract.approve(
					envVars.vProtocolContractAddress,
					MaxUint256
				);
				const allowanceReceipt = await allowance.wait();

				if (!allowanceReceipt.status) {
					return toast.error("Approval failed!", { id: toastId });
				}
			}

			// **Proceed with Deposit**
			const transaction = await contract.depositCollateral(tokenTypeAddress, _weiAmount);
			const receipt = await transaction.wait();

			if (receipt.status) {
				toast.success(`${_amount} successfully supplied, happy earning!`, {
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
	}, [_amount, allowanceVal, isLoading, chainId, errorDecoder, tokenDecimal, tokenTypeAddress, walletProvider]);
};

export default useDepositCollateral;