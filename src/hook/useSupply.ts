import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useCallback } from "react"
import { isSupportedChain } from "../constants/utils/chains";
import { toast } from "sonner";

const useSupply = () => {
    const { chainId } = useWeb3ModalAccount();
    // const { walletProvider } = useWeb3ModalProvider();


    return useCallback(
        async () => {
            if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK");
        },
    [chainId]   
  )
}

export default useSupply