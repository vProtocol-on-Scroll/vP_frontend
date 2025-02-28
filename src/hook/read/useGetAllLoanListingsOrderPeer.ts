import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { readOnlyProvider } from '../../api/provider';
import { getVProtocolContract } from '../../api/contractsInstance';
import peer from "../../abi/peer.json";

export interface LoanListing {
	listingId: number;
	author: string;
	tokenAddress: string;
	amount: string;
	min_amount: string;
	max_amount: string;
	returnDate: number;
	expirationDate: number;
	interest: number;
	status: string;
}

// Function to fetch all loan listings
const fetchAllLoanListingsPeer = async (): Promise<LoanListing[]> => {
	const contract = getVProtocolContract(readOnlyProvider, peer);
	let _index = 1;
	const fetchedListings: LoanListing[] = [];

	while (true) {
		try {
			const _listing = await contract.getLoanListing(_index);

			if (_listing[0] === 0) break;

			// Convert and structure the listing data
			const structuredListing: LoanListing = {
				listingId: Number(_listing[0]),
				author: _listing[1],
				tokenAddress: _listing[2],
				amount: String(ethers.formatEther(_listing[3])),
				min_amount: String(ethers.formatEther(_listing[4])),
				max_amount: String(ethers.formatEther(_listing[5])),
				returnDate: Number(_listing[6]),
				expirationDate: Number(_listing[7]),
				interest: Number(_listing[8]),
				status: _listing[9] === 0 ? 'OPEN' : 'CLOSED',
			};

			fetchedListings.push(structuredListing);
			_index += 1;
		} catch (error) {
			console.error("Error fetching loan listings:", error);
			break;
		}
	}

	return fetchedListings;
};

const useGetAllLoanListingsOrderPeer = () => {
	const { address } = useWeb3ModalAccount();

	// Fetch all loan listings
	const { data: listings, isLoading, error } = useQuery({
		queryKey: ['allLoanListings'],
		queryFn: fetchAllLoanListingsPeer,
		staleTime: 1000 * 60 * 5, // Cache for 5 minutes
		refetchOnWindowFocus: false, // Prevent refetch on window focus
	});

	// Filter listings based on user conditions
	const filteredListings = listings?.filter(listing =>
		listing.status === 'OPEN' &&  // Exclude 'CLOSED' listings
		listing.returnDate > Date.now() && // Exclude listings with expired returnDate
		Number(listing.max_amount) > 0 &&  // Exclude listings with max_amount <= 0
		listing.author !== address
	) || [];

	// User's own loan orders
	const myLendOrder = listings?.filter(listing => listing.author === address) || [];

	return {
		isLoading,
		error,
		listings,
		filteredListings,
		myLendOrder,
	};
};

export default useGetAllLoanListingsOrderPeer;


// const { isLoading, error, listings, filteredListings, myLendOrder } = useGetAllLoanListingsOrderPeer();
