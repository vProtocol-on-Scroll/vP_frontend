import { OrderCardProps } from "../../constants/types";

const PeerOrderCard: React.FC<OrderCardProps> = ({
  type,
  token,
  icon,
  amount,
  amountUSD,
  expiry,
  profitOrInterestValueUSD,
  profitOrInterestValue,
  duration,
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
        <div className="flex flex-col w-1/3">
          <p className="text-[13px] font-medium text-[#0D0D0D80]">Expiry</p>
          <p className="font-bold text-[16px] font-kaleko">
            {expiry}
          </p>
        </div>

        <div className="flex flex-col w-1/3 text-center">
          <p className="text-[13px] font-medium text-[#0D0D0D80]">{type === "borrow" ? "Intrest" : "Profits"}</p>
          <p className="font-bold text-[16px] font-kaleko">{profitOrInterestValue}
            <span className="text-[#0D0D0D80] text-[13px] pl-2">{profitOrInterestValueUSD}</span>
          </p>
        </div>
        
        <div className="flex flex-col w-1/3 text-right">
          <p className="text-[13px] font-medium text-[#0D0D0D80]">Duration</p>
          <p className="font-bold text-[16px] font-kaleko">{duration}</p>
        </div>
      </div>
    </div>
  );
};

export default PeerOrderCard;