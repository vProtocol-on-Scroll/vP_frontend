import { useQuery } from "@tanstack/react-query";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { tokenData } from "../../constants/config/tokenData";
import { getVProtocolContract } from "../../api/contractsInstance";
import { readOnlyProvider } from "../../api/provider";
import getters from "../../abi/getters.json";


const fetchSupplyAPYborrowAPR = async () => {

    const contract = getVProtocolContract(readOnlyProvider, getters);

    try {
        const borrowAPR = await Promise.all(
            tokenData.map(token => contract.getBorrowApr(token.address))
        )

        const supplyAPY = await Promise.all(
            tokenData.map(token => contract.getSupplyApy(token.address))
        )

        return {
            borrowAPR,
            supplyAPY,
        }

    } catch (error) {
        console.error("Error fetching  apy and apr:", error);
        throw new Error("Failed to fetch apy and apr");
    }


}


const useGetAPY$APR = () => {
    const { address, isConnected } = useWeb3ModalAccount();

    const { data, isLoading, error } = useQuery({
        queryKey: ['getAPR&APY', address],
        queryFn: () => fetchSupplyAPYborrowAPR(),
        enabled: !!address && isConnected,
        staleTime: 1000 * 60 * 5, 
        refetchOnWindowFocus: false,
    });

    return { data, isLoading, error };
}

export default useGetAPY$APR