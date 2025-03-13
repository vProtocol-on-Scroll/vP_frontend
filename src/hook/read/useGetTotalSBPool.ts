import { useQuery } from "@tanstack/react-query";
import { tokenData } from "../../constants/config/tokenData";
import { getVProtocolContract } from "../../api/contractsInstance";
import { readOnlyProvider } from "../../api/provider";
import getters from "../../abi/getters.json";
import useGetAPY$APR from "./useGetAPY$APR";
import useGetUtilitiesPeer from "./useGetUtilitiesPeer";
import { ethers } from "ethers";

const fetchTotalSupplyBorrow = async () => {
    const contract = getVProtocolContract(readOnlyProvider, getters);

    try {
        const totalBorrow = await Promise.all(
            tokenData.map(token => contract.getTotalBorrows(token.address))
        );

        const totalSupply = await Promise.all(
            tokenData.map(token => contract.getTotalDeposits(token.address))
        );

        return {
            totalBorrow,
            totalSupply,
        };
    } catch (error) {
        console.error("Error fetching total supply and borrow:", error);
        throw new Error("Failed to fetch total supply and borrow");
    }
};

const useGetTotalSBPool = () => {
    const { data: supplyBorrow, isLoading, error } = useQuery({
        queryKey: ['getTotalSupplyBorrow'],
        queryFn: () => fetchTotalSupplyBorrow(),
        staleTime: 1000 * 60 * 5, 
        refetchOnWindowFocus: false,
    });

    const { data } = useGetUtilitiesPeer();
    const { data: apyAprData, isLoading: isAPYLoading, error: apyError } = useGetAPY$APR();

    const enhancedSupplyBorrow = supplyBorrow
        ? tokenData.map((token, index) => {
            const formattedSupply = supplyBorrow.totalSupply[index]
                ? parseFloat(ethers.formatUnits(supplyBorrow.totalSupply[index], token.decimal))
                : 0;

            const formattedBorrow = supplyBorrow.totalBorrow[index]
                ? parseFloat(ethers.formatUnits(supplyBorrow.totalBorrow[index], token.decimal))
                : 0;

            const tokenPriceInUSDT = data?.tokenPrices?.[index] 
                ? parseFloat(String(data.tokenPrices[index])) 
                : 0;

            return {
                icon: token.icon,
                name: token.token,
                totalSupply: formattedSupply,
                totalBorrow: formattedBorrow,
                borrowAPR: apyAprData?.borrowAPR?.[index] ?? 0n,
                supplyAPY: apyAprData?.supplyAPY?.[index] ?? 0n,
                supplyValueUSD: formattedSupply * tokenPriceInUSDT, 
                borrowValueUSD: formattedBorrow * tokenPriceInUSDT,
            };
        })
        : [];

    // **Total supply and borrow values in USD**
    const totalSupplyUSD = enhancedSupplyBorrow.reduce((sum, token) => sum + token.supplyValueUSD, 0);
    const totalBorrowUSD = enhancedSupplyBorrow.reduce((sum, token) => sum + token.borrowValueUSD, 0);

    return { 
        supplyBorrow: enhancedSupplyBorrow, 
        totalSupplyUSD, 
        totalBorrowUSD, 
        isLoading, 
        error, 
        isAPYLoading, 
        apyError 
    };
};

export default useGetTotalSBPool;
