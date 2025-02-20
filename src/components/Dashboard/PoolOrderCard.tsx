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
  return (
    <div className="max-w-[386px] w-full rounded-xl text-[#0D0D0D] bg-[#FFFFFF] p-3 mt-2">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <img src={icon} width={40} height={40} alt={token} />
          <p className="font-extrabold text-lg">{token}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-extrabold text-2xl leading-none tracking-tighter">{amount}</p>
          <p className="text-[13px] font-kaleko font-normal text-[#0D0D0D80]">{amountUSD}</p>
        </div>
      </div>

      <div className="flex justify-between items-start mt-6 w-full">
        <div className="flex flex-col w-1/2">
          <p className="text-[13px] font-medium text-[#0D0D0D80]">{type === "borrow" ? "Monthly Cost" : "Monthly Yield"}</p>
          <p className="font-bold text-[16px] font-kaleko">
            {stat1Value}
            <span className="text-[#0D0D0D80] text-[13px] pl-2">{stat1ValueUSD}</span>
          </p>
        </div>

        <div className="flex flex-col w-1/2 text-left">
          <p className="text-[13px] font-medium text-[#0D0D0D80]">{type === "borrow" ? "Borrow APR" : "Supply APY"}</p>
          <p className="font-bold text-[16px] font-kaleko">{stat2Value}</p>
        </div>
      </div>
    </div>
  );
};

export default PoolOrderCard;