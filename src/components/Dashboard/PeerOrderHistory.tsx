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

	const mapOrders = (orders: any[], type: "borrow" | "lend"): OrderCardProps[] => {
	return orders?.map((order) => {
		const usdv = getTokenUSDV(order.tokenName || "Unknown"); 
		const amountUSD = parseFloat(order.amount) * usdv;
		const profitOrInterestValueUSD = amountUSD * (order.interest / 100);

		return {
		type,
		token: order.tokenName || "Unknown",
		icon: order.tokenIcon || "/coins/vToken.svg",
		amount: order.amount,
		id: type === "borrow" ? order.requestId : order.listingId,
  		tokenAddress: order.tokenAddress,
		decimal: order.tokenDecimal,
		amountUSD: `${isLoading ? 0 : amountUSD.toFixed(2)}`,
		expiry: type === "borrow"
			? `${Math.ceil((order.expirationDate - Date.now() / 1000) / (60 * 60 * 24))}D`
			: `${order.returnDate} D`,
		profitOrInterestValue: `${(order.interest / 100).toFixed(2)}%`,
		profitOrInterestValueUSD: `${isLoading ? 0 : profitOrInterestValueUSD.toFixed(2)}`,
		duration: type === "borrow"
			? `${Math.ceil((order.returnDate - Date.now() / 1000) / (60 * 60 * 24))}D`
			: `${order.returnDate}D`,
		};
	}) || [];
	};

	const borrowOrders = mapOrders(activeRequests ?? [], "borrow");
	const lendOrders = mapOrders(myActiveLendOrder ?? [], "lend");

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
