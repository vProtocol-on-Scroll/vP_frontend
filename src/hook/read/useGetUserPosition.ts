import { useQuery } from "@tanstack/react-query";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { tokenData } from "../../constants/config/tokenData";
import { getVProtocolContract } from "../../api/contractsInstance";
import { readOnlyProvider } from "../../api/provider";
import getters from "../../abi/getters.json";
import useGetUtilitiesPeer from "./useGetUtilitiesPeer";
import { ethers } from "ethers";
import useGetAPY$APR from "./useGetAPY$APR";



const fetchUserPosition = async (address: string) => {
    if (!address) return null;

    const contract = getVProtocolContract(readOnlyProvider, getters);
    try {
        const userPosition = await Promise.all(
            tokenData.map(token => contract.getUserPosition(address, token.address))
        )
        const structuredUserPositions = userPosition.map((pos, index) => ({
            tokenIcon: tokenData[index]?.icon, 
            address: tokenData[index]?.address,
            name: tokenData[index]?.token,
            poolDeposits: pos[0],  
            poolBorrows: pos[1],  
            p2pLentAmount: pos[2],  
            p2pBorrowedAmount: pos[3],  
            collateral: pos[4],  
            totalLoanCollectedUSD: pos[5],  
            lastUpdate: pos[6],  
        }));

        return structuredUserPositions;
    
    } catch (error) {
        console.error("Error fetching user positions:", error);
        throw new Error("Failed to fetch user positions");
    }
    
}


const useGetUserPosition = () => {
    const { address, isConnected } = useWeb3ModalAccount();
    const { data } = useGetUtilitiesPeer();

    const { data: userPosition, isLoading, error } = useQuery({
        queryKey: ['userPosition', address],
        queryFn: () => fetchUserPosition(address!),
        enabled: !!address && isConnected,
        staleTime: 1000 * 60 * 5, 
        refetchOnWindowFocus: false,
    });

    const totalSupply = userPosition?.reduce((sum, pos, index) => {
       const token = tokenData[index]; 
       if (!token || !data?.tokenPrices[index]) return sum;

       const formattedDeposit = parseFloat(ethers.formatUnits(pos.poolDeposits, token.decimal)); 
       const tokenPriceInUSDT = parseFloat(String(data?.tokenPrices[index])); 

       return sum + (formattedDeposit * tokenPriceInUSDT);
    }, 0);
    
    const roundedTotalSupply = parseFloat(String(totalSupply?.toFixed(3)));


    const totalCollateral = userPosition?.reduce((sum, pos, index) => {
       const token = tokenData[index]; 
       if (!token || !data?.tokenPrices[index]) return sum;

       const formattedCollateral = parseFloat(ethers.formatUnits(pos.collateral, token.decimal)); 
       const tokenPriceInUSDT = parseFloat(String(data?.tokenPrices[index])); 

       return sum + (formattedCollateral * tokenPriceInUSDT);
    }, 0);
    
    const roundedTotalCollateral = parseFloat(String(totalCollateral?.toFixed(3)));
    
    // Fetch borrowAPR and supplyAPY
    const { data: apyAprData, isLoading: isAPYLoading, error: apyError } = useGetAPY$APR();
    const enhancedUserPosition = userPosition?.map((pos, index) => ({
        ...pos,
        borrowAPR: apyAprData?.borrowAPR?.[index] ?? 0n,
        supplyAPY: apyAprData?.supplyAPY?.[index] ?? 0n,
    }));
    

   return { userPosition : enhancedUserPosition, totalSupply: roundedTotalSupply, totalCollateral : roundedTotalCollateral, isLoading: isLoading || isAPYLoading, error: error || apyError };

}

export default useGetUserPosition
