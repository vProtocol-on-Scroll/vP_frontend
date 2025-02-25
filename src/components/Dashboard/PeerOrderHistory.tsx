import { OrderCardProps } from "../../constants/types";
import Empty from "./Empty";
import PeerOrderCard from "./PeerOrderCard";

const peerData: OrderCardProps[] = [
  // {
  //   type: "lend",
  //   token: "USDT",
  //   icon: "/coins/tether.svg",
  //   amount: "0.00",
  //   amountUSD: "$0.00",
  //   expiry: "3D 5H 30M",
  //   profitOrInterestValue: "3.45",
  //   profitOrInterestValueUSD:"0.00",
  //   duration: "31D",
  // },
  // {
  //   type: "borrow",
  //   token: "USDT",
  //   icon: "/coins/tether.svg",
  //   amount: "3.36M",
  //   amountUSD: "$13.67M",
  //   expiry: "3D 5H 30M",
  //   profitOrInterestValue: "3.45",
  //   profitOrInterestValueUSD: "0.00",
  //   duration: "31D",
  // },
  // {
  //   type: "lend",
  //   token: "FIVE",
  //   icon: "/coins/vToken.svg",
  //   amount: "500.00",
  //   amountUSD: "$500.00",
  //   expiry: "3D 5H 30M",
  //   profitOrInterestValue: "3.45",
  //   profitOrInterestValueUSD: "0.00",
  //   duration: "31D",
  // },
  // {
  //   type: "borrow",
  //   token: "FIVE",
  //   icon: "/coins/vToken.svg",
  //   amount: "1.25M",
  //   amountUSD: "$1.25M",
  //   expiry: "3D 5H 30M",
  //   profitOrInterestValue: "3.45",
  //   profitOrInterestValueUSD: "0.00",
  //   duration: "31D",
  // },
  // {
  //   type: "lend",
  //   token: "USDT",
  //   icon: "/coins/tether.svg",
  //   amount: "500.00",
  //   amountUSD: "$500.00",
  //   expiry: "3D 5H 30M",
  //   profitOrInterestValue: "3.45",
  //   profitOrInterestValueUSD: "0.00",
  //   duration: "31D",
  // },
  // {
  //   type: "borrow",
  //   token: "FIVE",
  //   icon: "/coins/vToken.svg",
  //   amount: "1.25M",
  //   amountUSD: "$1.25M",
  //   expiry: "3D 5H 30M",
  //   profitOrInterestValue: "3.45",
  //   profitOrInterestValueUSD: "0.00",
  //   duration: "31D",
  // },
];

const PeerOrderHistory = () => {
  return (
    <div className="mt-12 max-w-[868px] m-auto w-full">
      <div className="flex justify-between">
       {peerData.length > 0 ?
        (
          <>
            {/* Supplies */}
            <div className="w-1/2 p-6">
              <h4 className="font-bold text-xl mb-4 font-kaleko pl-6">Lend Orders</h4>
              {peerData
                .filter((item) => item.type === "lend")
                .map((item, index) => (
                  <PeerOrderCard key={index} {...item} />
                ))}
            </div>

            {/* Borrows */}
            <div className="w-1/2 p-6">
              <h4 className="font-bold text-xl mb-4 font-kaleko pl-6">Borrow Orders</h4>
              {peerData
                .filter((item) => item.type === "borrow")
                .map((item, index) => (
                  <PeerOrderCard key={index} {...item} />
                ))}
            </div>
          </>
        )
        :
        (
          <>
            <Empty text1={"Let's get things rolling—create your"} text2={"first order now and start your"} text3={"lending adventure!"}
                btn1={"Create Borrow Order"}
                btn2={"Create Lend Order"}
                link1={"/create-order/borrow"}
                link2={"/create-order/lend"} 
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PeerOrderHistory;