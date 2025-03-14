import { tokenData } from "../../constants/config/tokenData";
import { OrderCardProps } from "../../constants/types";
import useGetUserPosition from "../../hook/read/useGetUserPosition";
import useGetUtilitiesPeer from "../../hook/read/useGetUtilitiesPeer";
import Empty from "./Empty";
import PoolOrderCard from "./PoolOrderCard";
import { formatUnits } from "ethers";

const PoolOrderHistory = () => {
  const { userPosition } = useGetUserPosition();
  const { data, isLoading } = useGetUtilitiesPeer();

  if (!userPosition) {
    return (
      <Empty
        text1={"Let's get things rolling—supply liquidity"}
        text2={"and take loans from the"}
        text3={"vProtocol Pools"}
        btn1={"Supply"}
        btn2={"Borrow"}
        link1={"/transact/supply"}
        link2={"/markets"}
      />
    );
  }

  const poolData: OrderCardProps[] = userPosition.flatMap((pos, index) => {
    const token = tokenData[index]; // Get corresponding token metadata
    const poolDeposits = pos.poolDeposits;
    const poolBorrows = pos.poolBorrows; 
    const borrowAPR = pos.borrowAPR;
    const supplyAPY = pos.supplyAPY;
    const usdPrice = data?.tokenPrices[index]

    const formattedDeposit = parseFloat(formatUnits(poolDeposits, token.decimal));
    const formattedBorrow = parseFloat(formatUnits(poolBorrows, token.decimal));

    const supplyEntry =
      formattedDeposit > 0
        ? {
            type: "supply",
            token: token.token,
            icon: token.icon || `/coins/vToken.svg`,
            amount: formattedDeposit.toFixed(2),
            amountUSD: `$${isLoading ? formattedDeposit.toFixed(2) : (usdPrice! * formattedDeposit).toFixed(3)}`, 
            stat1Value: (((Number(supplyAPY) / 100) * formattedDeposit)/12).toFixed(2),
            stat1ValueUSD: `$${(((Number(supplyAPY) / 100) * (usdPrice! * formattedDeposit))/12).toFixed(2)}`,
            stat2Value: `${(parseFloat(String(supplyAPY)) / 100).toFixed(2)}%`,
          }
        : null;

    const borrowEntry =
      formattedBorrow > 0
        ? {
            type: "borrow",
            token: token.token,
            icon: token.icon || `/coins/vToken.svg`,
            amount: formattedBorrow.toFixed(2),
            amountUSD: `$${isLoading ? formattedDeposit.toFixed(2) : (usdPrice! * formattedDeposit).toFixed(3)}`,  
            stat1Value: (((Number(borrowAPR) / 100) * formattedDeposit)/12).toFixed(2),
            stat1ValueUSD: `$${(((Number(borrowAPR) / 100) * (usdPrice! * formattedDeposit))/12).toFixed(2)}`,
            stat2Value: `${(parseFloat(String(borrowAPR)) / 100).toFixed(2)}%`,
          }
        : null;

    return [supplyEntry, borrowEntry].filter(Boolean) as OrderCardProps[];
  });

  return (
    <div className="mt-4 2xl:mt-1 max-w-[868px] m-auto w-full">
      <div className="flex justify-between">
        {poolData.length > 0 ? (
          <>
            {/* Supplies */}
            <div className="w-1/2 p-6">
              <h4 className="font-bold text-xl mb-4 font-kaleko pl-3">Supplies</h4>
              {poolData
                .filter((item) => item.type === "supply")
                .map((item, index) => (
                  <PoolOrderCard key={index} {...item} />
                ))}
            </div>

            {/* Borrows */}
            <div className="w-1/2 p-6">
              <h4 className="font-bold text-xl mb-4 font-kaleko pl-3">Borrows</h4>
              {poolData
                .filter((item) => item.type === "borrow")
                .map((item, index) => (
                  <PoolOrderCard key={index} {...item} />
                ))}
            </div>
          </>
        ) : (
          <Empty
            text1={"Let's get things rolling—supply liquidity"}
            text2={"and take loans from the"}
            text3={"vProtocol Pools"}
            btn1={"Supply"}
            btn2={"Borrow"}
            link1={"/transact/supply"}
            link2={"/markets"}
          />
        )}
      </div>
    </div>
  );
};

export default PoolOrderHistory;