import { CardsProps } from "../../constants/types"

export const AssetsCard: React.FC<CardsProps> = ({ coin }) => {
  return (
    <div className="bg-[#161616] rounded-xl p-4 w-full space-y-2">
              
        <div className="flex items-center gap-2">
            <img
                src={coin.icon}
                width={"45px"}
                height={"45px"}
                alt={`${coin.name} icon`}
                className="cursor-pointer w-9 h-9 lg:w-[45px] lg:h-[45px]"
            />
            <div className="text-start font-kaleko">
                <p className="font-normal text-sm lg:text-lg">{coin.name}</p>
                <p className="font-extralight text-xs lg:text-base">{coin.symbol}</p>
            </div>
        </div>
              
        <div className="flex items-center justify-between">
            <h3 className="text-xs font-kaleko font-extralight">Risk Level</h3>
            <img
                src="/icons/meter.svg"
                width={"36px"}
                height={"26px"}
                alt="meter"
                className="cursor-pointer"
            />
        </div>
          
        <div className="text-start flex justify-between">
            <h3 className="text-xs font-kaleko font-extralight">Total Supplied</h3>
            <div className="">
                <p className="text-[10px] font-kaleko font-bold">${coin.supplied.value}</p>
                <p className="text-[8px] font-kaleko font-extralight text-end">{coin.supplied.amount}</p>
            </div>
        </div>
          
        <div className="flex justify-between">
            <p className="text-xs font-kaleko font-extralight">Supply APY:</p>
            <p className="text-[#008000] text-[10px] font-kaleko font-bold">{coin.supplied.apy}</p>
        </div>
        
        <div className="text-start flex justify-between">
            <h3 className="text-xs font-kaleko font-extralight">Total Borrowed</h3>
            <div className="">
                <p className="text-[10px] font-kaleko font-bold">${coin.borrowed.value}</p>
                <p className="text-[8px] font-kaleko font-extralight text-end">{coin.borrowed.amount}</p>
            </div>
        </div>
          
        <div className="flex justify-between">
            <p className="text-xs font-kaleko font-extralight">Borrowed APR:</p>
            <p className="text-[#008000] text-[10px] font-kaleko font-bold">{coin.borrowed.apr}</p>
        </div>
    </div>
)}