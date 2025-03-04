import { useEffect, useRef, useState } from "react";
import { OrderCardProps } from "../../constants/types";

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
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="max-w-[386px] w-full rounded-xl text-[#0D0D0D] bg-[#FFFFFF] p-3 mt-2">
			<div className="flex justify-between items-start">
				<div className="flex items-center gap-4">
					<img src={icon} width={40} height={40} alt={token} />
					<p className="font-extrabold text-lg">{token}</p>
				</div>
				<div className="flex gap-6">
					<div className="flex flex-col items-end">
						<p className="font-extrabold text-2xl leading-none tracking-tighter">
							{amount}
						</p>
						<p className="text-[13px] font-kaleko font-normal text-[#0D0D0D80]">
							{amountUSD}
						</p>
					</div>
					<div
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
							<div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg p-2 font-kaleko font-bold">
								{type === "borrow" ? (
									<button className="w-full text-center px-4 py-2 text-sm bg-gray-100 hover:bg-gray-300 rounded-md">
										Repay
									</button>
								) : (
									<div className="w-full space-y-4">
										<button className="w-full px-4 py-2 text-sm text-left bg-gray-100 hover:bg-gray-300 rounded-md whitespace-nowrap">
											Collaterise
										</button>
										<button className="w-full px-4 py-2 text-sm text-left bg-gray-100 hover:bg-gray-300 rounded-md whitespace-nowrap">
											Close Position
										</button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="flex justify-between items-start mt-6 w-full">
				<div className="flex flex-col w-1/2">
					<p className="text-[13px] font-medium text-[#0D0D0D80]">
						{type === "borrow" ? "Monthly Cost" : "Monthly Yield"}
					</p>
					<p className="font-bold text-[16px] font-kaleko">
						{stat1Value}
						<span className="text-[#0D0D0D80] text-[13px] pl-2">
							{stat1ValueUSD}
						</span>
					</p>
				</div>

				<div className="flex flex-col w-1/2 text-left">
					<p className="text-[13px] font-medium text-[#0D0D0D80]">
						{type === "borrow" ? "Borrow APR" : "Supply APY"}
					</p>
					<p className="font-bold text-[16px] font-kaleko">{stat2Value}</p>
				</div>
			</div>
		</div>
	);
};

export default PoolOrderCard;
