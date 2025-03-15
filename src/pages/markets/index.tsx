import { useState } from "react";
import PeerTable from "../../components/Markets/PeerTable";
import PoolTable from "../../components/Markets/PoolTable";
import { PeerData } from "../../constants/types";
import useGetAllBorrowRequestsPeer from "../../hook/read/useGetAllBorrowRequestsPeer";
import useGetAllLoanListingsOrderPeer from "../../hook/read/useGetAllLoanListingsOrderPeer";
import { formatAddress } from "../../constants/utils/formatAddress";
import useGetTotalSBPool from "../../hook/read/useGetTotalSBPool";
import useGetUtilitiesPeer from "../../hook/read/useGetUtilitiesPeer";
import { formatMoney } from "../../constants/utils/formatMoney";
import Loading from "../../components/shared/Loading";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import ConnectPrompt from "../../components/shared/ConnectPrompt";

const Markets = () => {
  const { isConnected } = useWeb3ModalAccount();
	const {
		isLoading: BorrowOrderLoading,
		othersRequests,
		borrowedRequests,
	} = useGetAllBorrowRequestsPeer();
	const {
		isLoading: lendOrderLoading,
		othersListings,
		avalaibleSupply,
	} = useGetAllLoanListingsOrderPeer();
	const { supplyBorrow, totalBorrowUSD, totalSupplyUSD } = useGetTotalSBPool();
	const { data, isLoading: utilitiesLoading } = useGetUtilitiesPeer();

	const tokenPrices: Record<string, number> = {
		ETH: data?.tokenPrices[0] || 1,
		USDC: data?.tokenPrices[1] || 1,
		WETH: data?.tokenPrices[2] || 1,
		WBTC: data?.tokenPrices[3] || 1,
	};

	const getTokenUSDV = (tokenName: string): number => {
		return tokenPrices[tokenName.toUpperCase()] || 1;
	};

	const isLoading = BorrowOrderLoading || lendOrderLoading;

	const mapPeerData = (items: any[], type: "borrow" | "lend"): PeerData[] => {
		return (
			items?.map((item) => {
				const usdv = getTokenUSDV(item.tokenName || "Unknown"); // Get USD value
				const amountUSD = parseFloat(item.amount) * usdv;

				return {
					asset: item.tokenName,
					icon: item.tokenIcon,
					duration: `${item.returnDate} D`,
					interest: `${item.interest / 100}%`,
					volume: item.amount,
					volumeUSD: `${utilitiesLoading ? 0 : amountUSD.toFixed(2)}`,
					address: formatAddress(item.author),
					tokenAddress: item.tokenAddress,
					id: item.requestId || item.listingId,
					tokenDecimal: item.tokenDecimal,
					type,
				};
			}) || []
		);
	};

	const borrowPeerData = mapPeerData(othersRequests, "borrow");
	const totalborrowedPeerData = mapPeerData(borrowedRequests, "borrow");
	const lendPeerData = mapPeerData(othersListings, "lend");
	const totalSupplylendPeerData = mapPeerData(avalaibleSupply, "lend");

	const marketPoolData = supplyBorrow
		.filter(
			(token) => token.totalSupply > 0n && token.totalSupply > token.totalBorrow
		)
		.map((token) => ({
			asset: token.name,
			icon: token.icon,
			supplyApy: `${(Number(token.supplyAPY) / 100).toFixed(2)}%`,
			borrowApr: `${(Number(token.borrowAPR) / 100).toFixed(2)}%`,
			totalSupply: token.totalSupply.toString(),
			totalSupplyUSD: `${token.supplyValueUSD.toFixed(2)}`,
			totalBorrow: token.totalBorrow.toString(),
			totalBorrowUSD: `${token.borrowValueUSD.toFixed(2)}`,
		}));

	const [selectedTab, setSelectedTab] = useState<"vPool" | "vPeer">("vPool");
	const [orderType, setOrderType] = useState<"lend" | "borrow">("lend");

	const allPeerData = [...lendPeerData, ...borrowPeerData];
	const filteredPeerData = allPeerData.filter(
		(order) => order.type === orderType
	);

	const totalBorrowedAmount = (
		totalborrowedPeerData.reduce(
			(sum, token) => sum + parseFloat(token.volumeUSD.slice(1)),
			0
		) + parseFloat(String(totalBorrowUSD))
	).toFixed(2);

	const totalSuppliedAmount = (
		totalSupplylendPeerData.reduce(
			(sum, token) => sum + parseFloat(token.volumeUSD.slice(1)),
			0
		) + parseFloat(String(totalSupplyUSD))
  ).toFixed(2);
  
  if (!isConnected) {
    return (
      <div className="max-w-[868px] w-full m-auto px-1 pb-12">
        <h3 className="text-left text-[35px] font-kaleko font-extrabold pl-4 pt-6">
          Market
        </h3>
        <ConnectPrompt />      
      </div>
    )
  }
  
	return (
		<div className="max-w-[868px] w-full m-auto py-6 px-1">
			<h3 className="text-left text-[35px] font-kaleko font-extrabold pl-4">
				Market
      </h3>

			{isLoading ? (
				<div className="mt-12 xl:mt-24">
					<Loading size={60} />
				</div>
			) : (
				<>
					<div
						className={`w-full rounded-2xl bg-noise-texture transition-all duration-500 ${
							selectedTab === "vPool" ? "bg-[#01D396]" : "bg-[#A66CFF]"
						}`}
					>
						<div className="p-4 bg-[#FFFFFF33] rounded-2xl flex items-center w-full justify-between gap-4">
							<div className="bg-[#FFFFFF] text-[#0D0D0D] font-kaleko w-1/2 p-4 rounded-2xl">
								<p className="font-normal text-sm">Total Supply</p>
								<p className="font-extrabold text-[28px]">
									{`$${formatMoney(totalSuppliedAmount)}`}
								</p>
							</div>

							<div className="text-white font-kaleko w-1/2 p-4 rounded-2xl">
								<p className="font-normal text-sm">Total Borrow</p>
								<p className="font-extrabold text-[28px]">
									{`$${formatMoney(totalBorrowedAmount)}`}
								</p>
							</div>
						</div>
					</div>

					<div
						className="mt-14 rounded-2xl px-6 py-8 transition-all duration-500 max550:px-3 max550:py-4 "
						style={{
							backgroundImage: `linear-gradient(180deg, #E3E8EA, #F4F5F8), 
                            linear-gradient(90deg, #00000000 0%, #12151A80 50%), 
                            url('/noise.svg')`,
						}}
					>
						<div className="w-full flex flex-wrap-reverse items-center gap-8">
							<div className="w-1/2 max550:w-full flex flex-col gap-4">
								<h5 className="text-xl font-bold text-[#0D0D0D]">
									Market Overview
								</h5>
								<div className="bg-[#FFFFFF33] rounded-3xl p-[2px] flex items-center w-full cursor-pointer">
									<button
										className={`text-center w-full py-2 rounded-3xl transition-all duration-300 ${
											selectedTab === "vPool"
												? "bg-white text-[#0D0D0D]"
												: "bg-transparent text-[#0D0D0DCC]"
										}`}
										onClick={() => setSelectedTab("vPool")}
									>
										vPool
									</button>
									<button
										className={`text-center w-full py-2 rounded-3xl transition-all duration-300 ${
											selectedTab === "vPeer"
												? "bg-white text-[#0D0D0D]"
												: "bg-transparent text-[#0D0D0DCC]"
										}`}
										onClick={() => setSelectedTab("vPeer")}
									>
										vPeer
									</button>
								</div>
							</div>

							{/* Order Type Toggle for Peer Market */}
							{selectedTab === "vPeer" && (
								<div className="bg-white/70 rounded-3xl p-2 flex items-center w-1/2 gap-2 max550:w-full">
									<div
										className={`rounded-3xl w-full px-4 py-2 cursor-pointer ${
											orderType === "lend" ? "bg-[#01D396]" : "bg-transparent"
										}`}
										onClick={() => setOrderType("lend")}
									>
										<p className="text-[#0D0D0D] font-extrabold text-xl mt-1 max550:text-sm">
											Lend Orders
										</p>
									</div>
									<div
										className={`rounded-3xl w-full px-4 py-2 cursor-pointer ${
											orderType === "borrow" ? "bg-[#A66CFF]" : "bg-transparent"
										}`}
										onClick={() => setOrderType("borrow")}
									>
										<p className="text-[#0D0D0D] font-extrabold text-xl mt-1 max550:text-sm">
											Borrow Orders
										</p>
									</div>
								</div>
							)}

							{selectedTab === "vPool" && (
								<div className="bg-[#FFFFFF33] rounded-3xl p-2 flex items-center w-1/2 gap-2">
									<div className="bg-white rounded-3xl w-full px-4 py-2">
										<p className="text-[#0D0D0D80] font-medium text-sm">
											{selectedTab} Total Supply
										</p>
										<p className="text-[#0D0D0D] font-extrabold text-xl mt-1">
											$
											{formatMoney(
												parseFloat(String(totalSupplyUSD)).toFixed(2)
											)}
										</p>
									</div>
									<div className="bg-transparent rounded-3xl w-full px-4 py-2">
										<p className="text-[#0D0D0D80] font-medium text-sm">
											{selectedTab} Total Borrow
										</p>
										<p className="text-[#0D0D0D] font-extrabold text-xl mt-1">
											$
											{formatMoney(
												parseFloat(String(totalBorrowUSD)).toFixed(2)
											)}
										</p>
									</div>
								</div>
							)}
						</div>

						<div className="mt-8 w-full">
							{selectedTab === "vPool" ? (
								<PoolTable poolData={marketPoolData} />
							) : (
								<PeerTable peerData={filteredPeerData} />
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Markets;
