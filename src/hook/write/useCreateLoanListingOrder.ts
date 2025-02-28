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
import { ethers, MaxUint256 } from "ethers";
import { ErrorDecoder } from "ethers-decode-error";
import { envVars } from "../../constants/config/envVars";
import useCheckAllowances from "../read/useCheckAllowances";

const useCreateLoanListingOrder = (
	_amount: string,
	_min_amount: string,
	_max_amount: string,
	_interest: number,
	_returnDate: number,
	tokenTypeAddress: string,
	tokenDecimal: number
) => {
	const { chainId } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();
	const { data: allowanceVal = 0, isLoading } = useCheckAllowances(tokenTypeAddress);

	const errorDecoder = ErrorDecoder.create([peer]);

	return useCallback(async () => {
        if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK");
        if (isLoading) return toast.loading("Checking allowance...");

		const readWriteProvider = getProvider(walletProvider);
		const signer = await readWriteProvider.getSigner();
		const contract = getVProtocolContract(signer, peer);
		const erc20contract = getERC20Contract(signer, tokenTypeAddress);

        const _weiAmount = ethers.parseUnits(_amount, tokenDecimal);
        const _min_amount_wei = ethers.parseUnits(_min_amount, tokenDecimal);
        const _max_amount_wei = ethers.parseUnits(_max_amount, tokenDecimal);

		let toastId: string | number | undefined;

		try {
			toastId = toast.loading(`Processing... Finding matches...`);

			if (allowanceVal == 0 || allowanceVal < Number(_weiAmount)) {
				const allowance = await erc20contract.approve(
					envVars.vProtocolContractAddress,
					MaxUint256
				);
				const allowanceReceipt = await allowance.wait();

				if (!allowanceReceipt.status)
					return toast.error("Approval failed!", { id: toastId });
			}

			const transaction = await contract.createLoanListingWithMatching(
				_weiAmount,
				_min_amount_wei,
				_max_amount_wei,
				_returnDate,
				_interest,
				tokenTypeAddress
			);
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
				toast.error(`Transaction failed: ${decodedError}`, { id: toastId });
			} catch (decodeError) {
				console.error("Error decoding failed:", decodeError);
				toast.error("Transaction failed: Unknown error", { id: toastId });
			}
		}
	}, [chainId, isLoading, walletProvider, tokenTypeAddress, _amount, tokenDecimal, _min_amount, _max_amount, allowanceVal, _returnDate, _interest, errorDecoder]);
};

export default useCreateLoanListingOrder;
