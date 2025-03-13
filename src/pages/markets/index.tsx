import { useState } from "react";
import PeerTable from "../../components/Markets/PeerTable";
import PoolTable from "../../components/Markets/PoolTable";
import { PeerData } from "../../constants/types";
import useGetAllBorrowRequestsPeer from "../../hook/read/useGetAllBorrowRequestsPeer";
import useGetAllLoanListingsOrderPeer from "../../hook/read/useGetAllLoanListingsOrderPeer";
import { formatAddress } from "../../constants/utils/formatAddress";


const marketPoolData = [
  {
    asset: "USDT",
    icon: "/coins/tether.svg",
    supplyApy: "1.23%",
    borrowApr: "5.54%",
    totalSupply: "19,672,710.53",
    totalSupplyUSD: "$19,661,005.25",
    totalBorrow: "5,608,592.73",
    totalBorrowUSD: "$5,608,592.73",
  },
  {
    asset: "FIVE",
    icon: "/coins/vToken.svg",
    supplyApy: "2.10%",
    borrowApr: "4.89%",
    totalSupply: "12,345,678.90",
    totalSupplyUSD: "$12,300,000.00",
    totalBorrow: "4,321,987.65",
    totalBorrowUSD: "$4,310,000.00",
  },
];


const Markets = () => {
  const { isLoading:BorrowOrderLoading, error:BorrowOrderError, othersRequests } = useGetAllBorrowRequestsPeer(); 

  const { isLoading:lendOrderLoading, error:lendOderError, othersListings } = useGetAllLoanListingsOrderPeer();

  

  console.log("requests", BorrowOrderLoading, BorrowOrderError);
  console.log("listings", lendOrderLoading, lendOderError);
  

  const borrowPeerData: PeerData[] = othersRequests?.map((request) => ({
    asset: request.tokenName,
    icon: request.tokenIcon,
    // duration:formatUnixTimestamp(request.returnDate),
    duration: `${Math.round((request.returnDate - Date.now() / 1000) / (24 * 3600))} D`,
    interest: `${request.interest/100}%`,
    volume: request.amount,
    volumeUSD: `$${request.totalRepayment}`,
    address: formatAddress(request.author),
    tokenAddress: request.tokenAddress,
    id: request.requestId,
    tokenDecimal: request.tokenDecimal,
    type: "borrow",
  })) || [];

  const lendPeerData: PeerData[] = othersListings?.map((listing) => ({
    asset: listing.tokenName,
    icon: listing.tokenIcon,
    // duration: formatUnixTimestamp(request.returnDate),
    duration: `${Math.floor(listing.returnDate / (24 * 3600))} D`,
    interest: `${listing.interest/100}%`,
    volume: listing.amount,
    volumeUSD: `$${listing.amount}`,
    address: formatAddress(listing.author),
    tokenAddress: listing.tokenAddress,
    id: listing.listingId,
    tokenDecimal: listing.tokenDecimal,
    type: "lend",
  })) || [];


  const [selectedTab, setSelectedTab] = useState<"vPool" | "vPeer">("vPool");
  const [orderType, setOrderType] = useState<"lend" | "borrow">("lend"); 

  const allPeerData = [...lendPeerData, ...borrowPeerData];


  const filteredPeerData = allPeerData.filter((order) => order.type === orderType);

  return (
    <div className="max-w-[868px] w-full m-auto py-6 px-1">
      <h3 className="text-left text-[35px] font-kaleko font-extrabold pl-4">Market</h3>

      <div
        className={`w-full rounded-2xl bg-noise-texture transition-all duration-500 ${
          selectedTab === "vPool" ? "bg-[#01D396]" : "bg-[#A66CFF]"
        }`}
      >
        <div className="p-4 bg-[#FFFFFF33] rounded-2xl flex items-center w-full justify-between gap-4">
          <div className="bg-[#FFFFFF] text-[#0D0D0D] font-kaleko w-1/2 p-4 rounded-2xl">
            <p className="font-normal text-sm">Total Supply</p>
            <p className="font-extrabold text-[28px]">
              {selectedTab === "vPool" ? "$61,235,195" : "$12,000,000"}
            </p>
          </div>

          <div className="text-white font-kaleko w-1/2 p-4 rounded-2xl">
            <p className="font-normal text-sm">Total Borrow</p>
            <p className="font-extrabold text-[28px]">
              {selectedTab === "vPool" ? "$10,235,195" : "$5,500,000"}
            </p>
          </div>
        </div>
      </div>


      <div className="mt-14 rounded-2xl px-6 py-8 transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(180deg, #E3E8EA, #F4F5F8), 
                            linear-gradient(90deg, #00000000 0%, #12151A80 50%), 
                            url('/noise.svg')`,
        }}
        >
        <div className="w-full flex items-center gap-8">

          <div className="w-1/2 flex flex-col gap-4">
            <h5 className="text-xl font-bold text-[#0D0D0D]">Market Overview</h5>
            <div className="bg-[#FFFFFF33] rounded-3xl p-[2px] flex items-center w-full cursor-pointer">
              <button
                className={`text-center w-full py-2 rounded-3xl transition-all duration-300 ${
                  selectedTab === "vPool" ? "bg-white text-[#0D0D0D]" : "bg-transparent text-[#0D0D0DCC]"
                }`}
                onClick={() => setSelectedTab("vPool")}
              >
                vPool
              </button>
              <button
                className={`text-center w-full py-2 rounded-3xl transition-all duration-300 ${
                  selectedTab === "vPeer" ? "bg-white text-[#0D0D0D]" : "bg-transparent text-[#0D0D0DCC]"
                }`}
                onClick={() => setSelectedTab("vPeer")}
              >
                vPeer
              </button>
            </div>
          </div>

          {/* Order Type Toggle for Peer Market */}
          {selectedTab === "vPeer" && (
            <div className="bg-white/70 rounded-3xl p-2 flex items-center w-1/2 gap-2">
              <div
                className={`rounded-3xl w-full px-4 py-2 cursor-pointer ${
                  orderType === "lend" ? "bg-[#01D396]" : "bg-transparent"
                }`}
                onClick={() => setOrderType("lend")}
              >
                <p className="text-[#0D0D0D] font-extrabold text-xl mt-1">Lend Orders</p>
              </div>
              <div
                className={`rounded-3xl w-full px-4 py-2 cursor-pointer ${
                  orderType === "borrow" ? "bg-[#A66CFF]" : "bg-transparent"
                }`}
                onClick={() => setOrderType("borrow")}
              >
                <p className="text-[#0D0D0D] font-extrabold text-xl mt-1">Borrow Orders</p>
              </div>
            </div>
          )}
          
          {selectedTab === "vPool" && (
            <div className="bg-[#FFFFFF33] rounded-3xl p-2 flex items-center w-1/2 gap-2">
                <div className="bg-white rounded-3xl w-full px-4 py-2">
                    <p className="text-[#0D0D0D80] font-medium text-sm">{selectedTab} Total Supply</p>
                    <p className="text-[#0D0D0D] font-extrabold text-xl mt-1">
                        {selectedTab === "vPool" ? "$51,305,620" : "$6,500,000"}
                    </p>
                </div>
                <div className="bg-transparent rounded-3xl w-full px-4 py-2">
                    <p className="text-[#0D0D0D80] font-medium text-sm">{selectedTab} Total Borrow</p>
                    <p className="text-[#0D0D0D] font-extrabold text-xl mt-1">
                        {selectedTab === "vPool" ? "$7,807,480" : "$3,200,000"}
                    </p>
                </div>
            </div>
          )}
        </div>

        {/* Table Display */}
        <div className="mt-8 w-full">
          {selectedTab === "vPool" ? (
            <PoolTable poolData={marketPoolData} />
          ) : (
            <PeerTable peerData={filteredPeerData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Markets;