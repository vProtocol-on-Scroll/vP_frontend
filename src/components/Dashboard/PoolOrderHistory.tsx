import { OrderCardProps } from "../../constants/types";
import Empty from "./Empty";
import PoolOrderCard from "./PoolOrderCard";

const poolData: OrderCardProps[] = [
  // {
  //   type: "supply",
  //   token: "USDT",
  //   icon: "/coins/tether.svg",
  //   amount: "0.00",
  //   amountUSD: "$0.00",
  //   stat1Value: "0.00",
  //   stat1ValueUSD: "$0.00",
  //   stat2Value: "6.48%",
  // },
  // {
  //   type: "borrow",
  //   token: "USDT",
  //   icon: "/coins/tether.svg",
  //   amount: "3.36M",
  //   amountUSD: "$13.67M",
  //   stat1Value: "3.36M",
  //   stat1ValueUSD: "$13.67M",
  //   stat2Value: "1.53%",
  // },
  // {
  //   type: "supply",
  //   token: "FIVE",
  //   icon: "/coins/vToken.svg",
  //   amount: "500.00",
  //   amountUSD: "$500.00",
  //   stat1Value: "2.00",
  //   stat1ValueUSD: "$2.00",
  //   stat2Value: "5.20%",
  // },
  // {
  //   type: "borrow",
  //   token: "FIVE",
  //   icon: "/coins/vToken.svg",
  //   amount: "1.25M",
  //   amountUSD: "$1.25M",
  //   stat1Value: "1.25M",
  //   stat1ValueUSD: "$2.50M",
  //   stat2Value: "2.75%",
  // },
  // {
  //   type: "supply",
  //   token: "USDT",
  //   icon: "/coins/tether.svg",
  //   amount: "500.00",
  //   amountUSD: "$500.00",
  //   stat1Value: "2.00",
  //   stat1ValueUSD: "$2.00",
  //   stat2Value: "5.20%",
  // },
  // {
  //   type: "borrow",
  //   token: "FIVE",
  //   icon: "/coins/vToken.svg",
  //   amount: "1.25M",
  //   amountUSD: "$1.25M",
  //   stat1Value: "1.25M",
  //   stat1ValueUSD: "$2.50M",
  //   stat2Value: "2.75%",
  // },
];

const PoolOrderHistory = () => {
  return (
    <div className="mt-12 max-w-[868px] m-auto w-full">
      <div className="flex justify-between">

        {poolData.length > 0 ?
        (
          <>
            {/* Supplies */}
            <div className="w-1/2 p-6">
              <h4 className="font-bold text-xl mb-4 font-kaleko pl-6">Supplies</h4>
              {poolData
                .filter((item) => item.type === "supply")
                .map((item, index) => (
                  <PoolOrderCard key={index} {...item} />
                ))}
            </div>

            {/* Borrows */}
            <div className="w-1/2 p-6">
              <h4 className="font-bold text-xl mb-4 font-kaleko pl-6">Borrows</h4>
              {poolData
                .filter((item) => item.type === "borrow")
                .map((item, index) => (
                  <PoolOrderCard key={index} {...item} />
                ))}
            </div>
          </>
        )
        :
        (
          <>
            <Empty text1={"Let's get things rolling—supply liquidity"} text2={"and take loans from the"} text3={"vProtocol Pools"}
                btn1={"Supply"}
                btn2={"Borrow"}
                link1={"/transact/supply"}
                link2={"/transact/borrow"} 
            />
          </>
        )}
       
      </div>
    </div>
  );
};

export default PoolOrderHistory;