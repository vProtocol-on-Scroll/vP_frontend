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
import pool from "../../abi/pool.json";
import erc20 from "../../abi/erc20.json";
import { ethers, MaxUint256 } from "ethers";
import { envVars } from "../../constants/config/envVars";
import { ErrorDecoder } from "ethers-decode-error";
import { useNavigate } from "react-router-dom";

const useDepositCollateral = (
	tokenTypeAddress: string,
	_amount: string,
	tokenDecimal: number,
	tokenName: string,
) => {
	const { chainId } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();
	const { data: allowanceVal = 0, isLoading } = useCheckAllowances(tokenTypeAddress); 
	const navigate = useNavigate();

	const errorDecoder = ErrorDecoder.create([pool, erc20]);

	return useCallback(async () => {
		if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK");
		if (isLoading) return toast.loading("Checking allowance...");

		const readWriteProvider = getProvider(walletProvider);
		const signer = await readWriteProvider.getSigner();
		const erc20contract = getERC20Contract(signer, tokenTypeAddress);
		const contract = getVProtocolContract(signer, pool);

		const _weiAmount = ethers.parseUnits(_amount, tokenDecimal);
		let toastId: string | number | undefined;

		try {
			toastId = toast.loading(`Processing deposit collateral transaction...`);

			// **Check Allowance and Approve if Needed**
			if (allowanceVal === 0 || allowanceVal < Number(_weiAmount)) {
				toast.loading(`Approving ${tokenName} tokens...`, { id: toastId });

				const allowance = await erc20contract.approve(
					envVars.vProtocolContractAddress,
					MaxUint256
				);
				const allowanceReceipt = await allowance.wait();

				if (!allowanceReceipt.status) {
					return toast.error("Approval failed!", { id: toastId });
				}
			}

			toast.loading(`Processing deposit of ${_amount}${tokenName} as collateral...`, { id: toastId })

			// **Proceed with Deposit**
			const transaction = await contract.deposit(tokenTypeAddress, _weiAmount, true);
			const receipt = await transaction.wait();

			if (receipt.status) {
				toast.success(`${_amount}${tokenName} successfully deposited as collateral!`, {
					id: toastId,
				});
				navigate("/")
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
	}, [chainId, isLoading, walletProvider, tokenTypeAddress, _amount, tokenDecimal, allowanceVal, tokenName, navigate, errorDecoder]);
};

export default useDepositCollateral;