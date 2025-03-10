import {
	useWeb3ModalAccount,
	useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { isSupportedChain } from "../../constants/utils/chains";
import { toast } from "sonner";
import { getProvider } from "../../api/provider";
import { getERC20Contract, getVProtocolContract } from "../../api/contractsInstance";
import pool from "../../abi/pool.json";
import erc20 from "../../abi/erc20.json";
import { ethers, MaxUint256 } from "ethers";
import { ErrorDecoder } from "ethers-decode-error";
import useCheckAllowances from "../read/useCheckAllowances";
import { envVars } from "../../constants/config/envVars";

const useSupply = (
    _amount: string,
    tokenTypeAddress: string,
    tokenDecimal: number,
    tokenName: string,
) => {
	const { chainId } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();

    const errorDecoder = ErrorDecoder.create([pool, erc20]);
    const { data: allowanceVal = 0, isLoading } = useCheckAllowances(tokenTypeAddress); 

   

    return useCallback(async () => {
        let toastId: string | number | undefined;
        if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK");
        if (isLoading) return toast.loading("Checking allowance...");
        

		const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();
        const erc20contract = getERC20Contract(signer, tokenTypeAddress);
		const contract = getVProtocolContract(signer, pool);

        const _weiAmount = ethers.parseUnits(_amount, tokenDecimal);
        

		try {
            toastId = toast.loading(`Processing supply...`);
            // console.log("AMOUNT OF SUPPLY IN WEI", _weiAmount);

            if (allowanceVal === 0 || allowanceVal < Number(_weiAmount)) {
                toast.loading(`Approving tokens...`, { id: toastId });

                const allowance = await erc20contract.approve(
                    envVars.vProtocolContractAddress,
                    MaxUint256
                );
                const allowanceReceipt = await allowance.wait();

                if (!allowanceReceipt.status) {
                    return toast.error("Approval failed!", { id: toastId });
                }
            }
            
            toast.loading(`Processing supply of ${_amount} ${tokenName}...`, { id: toastId })

			const transaction = await contract.deposit(tokenTypeAddress,_weiAmount, false);
			const receipt = await transaction.wait();

			if (receipt.status) {
				toast.success(`${_amount}${tokenName} successfully supplied, happy earning!`, {
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
	}, [_amount, allowanceVal, chainId, errorDecoder, isLoading, tokenDecimal, tokenName, tokenTypeAddress, walletProvider]);
};

export default useSupply;
