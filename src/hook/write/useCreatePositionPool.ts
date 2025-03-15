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
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const useCreatePositionPool = (
    
	// collateralTokens: string[],
	// collateralAmounts: number[],
) => {
	const { chainId } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();

	const errorDecoder = ErrorDecoder.create([pool,erc20]);
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    return useCallback(async (
        _amount: string,
        tokenTypeAddress: string,
        tokenDecimal: number,
        tokenName: string
    ) => {
		if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK");

		const readWriteProvider = getProvider(walletProvider);
		const signer = await readWriteProvider.getSigner();
		const contract = getVProtocolContract(signer, pool);

		const _weiAmount = ethers.parseUnits(_amount, tokenDecimal);

		let toastId: string | number | undefined;

		try {
			toastId = toast.loading(`Processing borrowing...`);

			const transaction = await contract.createPosition([], [], tokenTypeAddress, _weiAmount, true );
			
			const receipt = await transaction.wait();

			if (receipt.status) {
				toast.success(`${_amount} ${tokenName} borrowed successfully!`, {
					id: toastId,
                });
                queryClient.invalidateQueries({ queryKey: ["userUtilities"] });
                queryClient.invalidateQueries({ queryKey: ["getAPR&APY"] });
                queryClient.invalidateQueries({ queryKey: ["getTotalSupplyBorrow"] });
                queryClient.invalidateQueries({ queryKey: ["userPosition"] });
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
	}, [chainId, walletProvider, queryClient, navigate, errorDecoder]);
};

export default useCreatePositionPool;
