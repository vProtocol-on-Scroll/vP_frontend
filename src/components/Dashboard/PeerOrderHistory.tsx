import { Link } from "react-router-dom";
import { OrderCardProps } from "../../constants/types";
import Empty from "./Empty";
import PeerOrderCard from "./PeerOrderCard";
import useGetUserActiveRequestPeer from "../../hook/read/useGetUserActiveRequestPeer";
import useGetAllLoanListingsOrderPeer from "../../hook/read/useGetAllLoanListingsOrderPeer";
import useGetUtilitiesPeer from "../../hook/read/useGetUtilitiesPeer";

const PeerOrderHistory = () => {
	const { data: activeRequests } = useGetUserActiveRequestPeer();
	const { myActiveLendOrder } = useGetAllLoanListingsOrderPeer();
	const { data, isLoading } = useGetUtilitiesPeer();

	const tokenPrices: Record<string, number> = {
		"ETH": data?.tokenPrices[0] || 1, 
		"USDC": data?.tokenPrices[1] || 1,
		"WETH": data?.tokenPrices[2] || 1,
		"WBTC": data?.tokenPrices[3] || 1,
	};

	const getTokenUSDV = (tokenName: string): number => {
	return tokenPrices[tokenName.toUpperCase()] || 1; 
	};

	if (!activeRequests && !myActiveLendOrder) {
	return (
		<Empty
		text1={"Let's get things rolling—create your"}
		text2={"first order now and start your"}
		text3={"lending adventure!"}
		btn1={"Create Borrow Order"}
		btn2={"Create Lend Order"}
		link1={"/create-order/borrow"}
		link2={"/create-order/lend"}
		/>
	);
	}

	const borrowOrders = activeRequests?.map((req) => {
	const usdv = getTokenUSDV(req.tokenName || "Unknown"); // Get USD value
	const amountUSD = parseFloat(req.amount) * usdv;
	const profitOrInterestValueUSD = amountUSD * (req.interest / 100);

	return {
		type: "borrow" as const,
		token: req.tokenName || "Unknown",
		icon: req.tokenIcon || "/coins/vToken.svg",
		amount: req.amount,
		amountUSD: `$${isLoading ? 0 : amountUSD.toFixed(2)}`, 
		expiry: `${Math.ceil((req.expirationDate - Date.now() / 1000) / (60 * 60 * 24))}D`, 
		profitOrInterestValue: `${(req.interest / 100).toFixed(2)}%`,
		profitOrInterestValueUSD: `$${isLoading ? 0 : profitOrInterestValueUSD.toFixed(2)}`,
		duration: `${Math.ceil((req.returnDate - Date.now() / 1000) / (60 * 60 * 24))}D`, 
	};
	}) || [];

	const lendOrders = myActiveLendOrder?.map((lend) => {
	const usdv = getTokenUSDV(lend.tokenName || "Unknown"); // Get USD value
	const amountUSD = parseFloat(lend.amount) * usdv;
	const profitOrInterestValueUSD = amountUSD * (lend.interest / 100);

	return {
		type: "lend" as const,
		token: lend.tokenName || "Unknown",
		icon: lend.tokenIcon || "/coins/vToken.svg",
		amount: lend.amount,
		amountUSD: `$${isLoading ? 0 : amountUSD.toFixed(2)}`, 
		expiry: `${Math.ceil(lend.returnDate / (24 * 3600))} D`,
		profitOrInterestValue: `${(lend.interest / 100).toFixed(2)}%`,
		profitOrInterestValueUSD: `$${isLoading ? 0 : profitOrInterestValueUSD.toFixed(2)}`,
		duration: `${Math.ceil(lend.returnDate / (24 * 3600))}D`,
	};
	}) || [];

	const peerData: OrderCardProps[] = [...lendOrders, ...borrowOrders];

	return (
		<div className="mt-4 2xl:mt-1 max-w-[868px] m-auto w-full">
			<div className="flex justify-between">
				{peerData.length > 0 ? (
					<>
						{/* Supplies */}
						<div className="w-1/2 p-6">
							<div className="flex items-center justify-between">
								<h4 className="font-bold text-xl mb-4 font-kaleko pl-3">
									Lend Orders
								</h4>

								<Link to={"/create-order/lend"} className="pr-3">
									<img src="/icons/plusDatabase.svg" />
								</Link>
							</div>
							{peerData
								.filter((item) => item.type === "lend")
								.map((item, index) => (
									<PeerOrderCard key={index} {...item} />
								))}
						</div>

						{/* Borrows */}
						<div className="w-1/2 p-6">
							<div className="flex items-center justify-between">
								<h4 className="font-bold text-xl mb-4 font-kaleko pl-3">
									Borrow Orders
								</h4>
								<Link to={"/create-order/borrow"} className="pr-3">
									<img src="/icons/plusCloud.svg" />
								</Link>
							</div>

							{peerData
								.filter((item) => item.type === "borrow")
								.map((item, index) => (
									<PeerOrderCard key={index} {...item} />
								))}
						</div>
					</>
				) : (
					<Empty
						text1={"Let's get things rolling—create your"}
						text2={"first order now and start your"}
						text3={"lending adventure!"}
						btn1={"Create Borrow Order"}
						btn2={"Create Lend Order"}
						link1={"/create-order/borrow"}
						link2={"/create-order/lend"}
					/>
				)}
			</div>
		</div>
	);
};

export default PeerOrderHistory;
