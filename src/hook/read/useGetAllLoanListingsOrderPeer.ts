import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { readOnlyProvider } from '../../api/provider';
import { getVProtocolContract } from '../../api/contractsInstance';
import peer from "../../abi/peer.json";
import { LoanListing } from '../../constants/types';
import { tokenData } from '../../constants/config/tokenData';


const fetchAllLoanListingsPeer = async (): Promise<LoanListing[]> => {
    const contract = getVProtocolContract(readOnlyProvider, peer);
    let _index = 1;
    const fetchedListings: LoanListing[] = [];

    while (true) {
        try {
            const _listing = await contract.getLoanListing(_index);
            console.log(`Fetched Listing at ${_index}:`, JSON.stringify(_listing, (_key, value) =>
                typeof value === 'bigint' ? value.toString() : value, 2));


            if (!_listing || _listing[1] === "0x0000000000000000000000000000000000000000") {
                // console.log(`Breaking at index ${_index} as author is zero.`);
                break;
            }

            const tokenInfo = tokenData.find(token => token.address.toLowerCase() === _listing[2].toLowerCase()) || {
                name: "Unknown",
                icon: "/coins/unknown.svg",
                decimal: 18,
            };

            const structuredListing: LoanListing = {
                listingId: Number(_listing[0]),
                author: _listing[1],
                tokenAddress: _listing[2],
                tokenName: tokenInfo.name, 
                tokenIcon: tokenInfo.icon, 
                tokenDecimal: tokenInfo.decimal,
                amount: String(ethers.formatUnits(_listing[3], tokenInfo.decimal)),
                min_amount: String(ethers.formatUnits(_listing[4], tokenInfo.decimal)),
                max_amount: String(ethers.formatUnits(_listing[5], tokenInfo.decimal)),
                returnDate: Number(_listing[6]),
                expirationDate: Number(_listing[7]),
                interest: Number(_listing[8]),
                status: Number(_listing[9]) === 0 ? 'OPEN' : 'CLOSED',
            };
// console.log("_listing[9]", _listing[9]);

            fetchedListings.push(structuredListing);
            _index += 1;

           
        } catch (error) {
            console.error(`Error fetching loan listing at index ${_index}:`, error);
            break;
        }
    }

    return fetchedListings;
};

const useGetAllLoanListingsOrderPeer = () => {
	const { address } = useWeb3ModalAccount();

	const { data: listings, isLoading, error } = useQuery({
		queryKey: ['allLoanListings'],
		 queryFn: async () => {
            console.log("Fetching loan requests...");
            return fetchAllLoanListingsPeer();
        },
		staleTime: 1000 * 60 * 5, // Cache for 5 minutes
		refetchOnWindowFocus: false, // Prevent refetch on window focus
	});

	// console.log("listings", listings);
	

	const othersListings = listings?.filter(listing =>
		listing.status === 'OPEN' &&  // Exclude 'CLOSED' listings
		listing.returnDate > 0 && // Exclude listings with expired returnDate
		Number(listing.max_amount) > 0 &&  // Exclude listings with max_amount <= 0
		listing.author !== address
	) || [];

    const myLendOrder = listings?.filter(listing => listing.author === address) || [];

    const myActiveLendOrder = myLendOrder?.filter(listing => listing.status === 'OPEN') || [];
    
    // console.log("othersListings", othersListings);

	return {
		isLoading,
		error,
		listings,
		othersListings,
        myLendOrder,
        myActiveLendOrder,
	};
};

export default useGetAllLoanListingsOrderPeer;


// const { isLoading, error, listings, othersListings, myLendOrder } = useGetAllLoanListingsOrderPeer();
