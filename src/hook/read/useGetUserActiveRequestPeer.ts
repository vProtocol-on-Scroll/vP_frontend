import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useQuery } from "@tanstack/react-query";
import { readOnlyProvider } from "../../api/provider";
import { getVProtocolContract } from "../../api/contractsInstance";
import peer from "../../abi/peer.json";

export interface Request {
	requestId: number;
	author: string;
	amount: string;
	interest: number;
	totalRepayment: string;
	returnDate: number;
	expirationDate: number;
	lender: string;
	tokenAddress: string;
	status: string;
	tokenName?: string,
    tokenIcon?: any,
}

const fetchUserActiveRequestsPeer = async (address: string | undefined): Promise<Request[]> => {
	if (!address) return [];

	const contract = getVProtocolContract(readOnlyProvider, peer);
	const res = await contract.getUserActiveRequests(address);

	return res.map((req: any) => ({
		requestId: Number(req[0]), // Convert BigNumber to number
		author: req[1],
		amount: String(req[2]), // Convert BigNumber to string for amount
		interest: Number(req[3]), // Convert BigNumber to number for interest
		totalRepayment: String(req[4]), // Convert BigNumber to string
		returnDate: Number(req[5]), // Convert BigNumber to number for date
		expirationDate: Number(req[6]), // Convert BigNumber to number for expirationDate
		lender: req[7],
		tokenAddress: req[8], // Assuming token address is at index 8
		status: String(Number(req[9])), // Map status to a string representation
	}));
};

const useGetUserActiveRequestPeer = () => {
	const { address } = useWeb3ModalAccount();

	return useQuery({
		queryKey: ["userActiveRequests", address],
		queryFn: () => fetchUserActiveRequestsPeer(address),
		enabled: !!address, // Only run query when address is available
		staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
		refetchOnWindowFocus: false, // Prevent automatic refetching on window focus
	});
};

export default useGetUserActiveRequestPeer;


// const { data: activeRequests, isLoading, error } = useGetUserActiveRequestPeer();

