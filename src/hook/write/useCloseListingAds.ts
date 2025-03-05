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
import { ErrorDecoder } from "ethers-decode-error";
import { ethers } from "ethers";


const useCloseListingAd = (listingId: bigint) => {


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
            toastId = toast.loading("Closing loan listing...");

            const transaction = await contract.closeListingAd(listingId);
            const receipt = await transaction.wait();


            if (receipt.status) {
                toast.success("Loan listing closed successfully!", { id: toastId });
                return true;
              }
              
              toast.error("Transaction failed", { id: toastId });
              return false;
            } catch (error: unknown) {
              try {
                const decodedError = await errorDecoder.decode(error);
                console.error("Transaction failed:", decodedError);
                toast.error(`Transaction failed: ${decodedError}`, { id: toastId });
              } catch (decodeError) {
                console.error("Error decoding failed:", decodeError);
                toast.error("Transaction failed: Unknown error", { id: toastId });
              }
              return false;
            }
          }, [chainId, walletProvider, listingId, errorDecoder]);
        };
        
        export default useCloseListingAd;



