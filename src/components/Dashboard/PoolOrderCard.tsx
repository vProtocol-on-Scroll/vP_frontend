// import { useEffect, useRef, useState } from "react";
import { OrderCardProps } from "../../constants/types";
import { formatMoney } from "../../constants/utils/formatMoney";
// import { useNavigate } from "react-router-dom";

const PoolOrderCard: React.FC<OrderCardProps> = ({
	type,
	token,
	icon,
	amount,
	amountUSD,
	stat1Value,
	stat1ValueUSD,
	stat2Value,
}) => {
	// const navigate = useNavigate()
	// const [isDropdownOpen, setDropdownOpen] = useState(false);

	// const dropdownRef = useRef<HTMLDivElement | null>(null);

	// useEffect(() => {
	// 	function handleClickOutside(event: MouseEvent) {
	// 		if (
	// 			dropdownRef.current &&
	// 			!dropdownRef.current.contains(event.target as Node)
	// 		) {
	// 			setDropdownOpen(false);
	// 		}
	// 	}
	// 	document.addEventListener("mousedown", handleClickOutside);
	// 	return () => document.removeEventListener("mousedown", handleClickOutside);
	// }, []);

	
	return (
		<div className="w-full rounded-xl text-[#ffffff] bg-[#12151A] p-3 mt-2 noise-3">
			<div className="flex justify-between items-start">
				<div className="flex items-center gap-4">
					<img src={icon} width={40} height={40} alt={token} />
					<p className="font-extrabold text-lg">{token}</p>
				</div>
				<div className="flex gap-6">
					<div className="flex flex-col items-end">
						<p className="font-extrabold text-2xl leading-none tracking-tighter">
							{formatMoney(amount)}
						</p>
						<p className="text-[13px] font-kaleko font-normal text-[#ffffff]">
							${formatMoney(amountUSD)}
						</p>
					</div>
					{/* <div
						className="relative cursor-pointer"
						ref={dropdownRef}
						onClick={() => setDropdownOpen(!isDropdownOpen)}
					>
						<img
							src="/icons/ellipse.svg"
							alt="options"
							width={5}
							className="cursor-pointer"
						/>
						{isDropdownOpen && (
							<div className="absolute right-0 mt-2 w-36 bg-[#000000] shadow-lg rounded-lg p-2 font-kaleko font-bold z-20">
								{type === "borrow" ? (
									<button className="w-full text-center px-4 py-2 text-xs text-[#12151A] hover:bg-gray-300 bg-white rounded-md">
										Repay Loan
									</button>
								) : (
									<div className="w-full space-y-4">
										<button className="w-full px-4 py-2 text-sm text-center text-[#12151A] hover:bg-gray-300 bg-white rounded-md whitespace-nowrap">
											Collateralise
										</button>
										<button className="w-full px-4 py-2 text-xs text-center text-[#12151A] hover:bg-gray-300 bg-white  rounded-md whitespace-nowrap"
										onClick={() =>
											navigate("/transact/withdraw", {
											state: {
												amount: amount,
												amountUSD: amountUSD,
												tokenName: token,
											},
										})}
										>
											Close Position
										</button>
									</div>
								)}
							</div>
						)}
					</div> */}
				</div>
			</div>

			<div className="flex justify-between items-start mt-6 w-full">
				<div className="flex flex-col w-1/2">
					<p className="text-[13px] font-medium text-[#ffffff]">
						{type === "borrow" ? "Monthly Cost" : "Monthly Yield"}
					</p>
					<p className="font-bold text-[16px] font-kaleko">
						{formatMoney(stat1Value!)}
						<span className="text-[#ffffff] text-[13px] pl-2">
							${formatMoney(stat1ValueUSD!)}
						</span>
					</p>
				</div>

				<div className="flex flex-col w-1/2 text-left">
					<p className="text-[13px] font-medium text-[#ffffff]">
						{type === "borrow" ? "Borrow APR" : "Supply APY"}
					</p>
					<p className="font-bold text-[16px] font-kaleko">{stat2Value}</p>
				</div>
			</div>
		</div>
	);
};

export default PoolOrderCard;
