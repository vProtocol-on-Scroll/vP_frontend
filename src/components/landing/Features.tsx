import FeaturesCard from "./FeaturesCard";

const Features = () => {
  return (
    <div id="features" className="w-[95%] lg:w-[81.02%] mx-auto max-w-[1400px] py-12 lg:mt-16 mb-12 -mt-24">
      <div className="flex flex-col items-center justify-center">
        <h3 className="font-kaleko font-bold text-[42px] lg:text-[55px] text-center">
          Features
        </h3>

        <div className="w-full mt-8 flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <FeaturesCard 
              bgColor="#01F5FF"
              title="Dual Lending Model"
              description="Choose between Peer-to-Peer Lending or Liquidity Pool lending for maximum flexibility."
              image1="/f1.svg"
              image1Width="160px"
              image1Position="bottom-0 left-0 w-[150px] lg:w-[160px]"
              image2="/f2.svg"
              image2Width="120px"
              image2Position="bottom-0 right-0"
            />
            <FeaturesCard 
              bgColor="#302F2F"
              title="Auto-Debt Rebalancing"
              description="Ensure your capital is always productive, with automatic reinvestment of repaid funds."
              image1="/f3.svg"
              image1Width="240px"
              image1Position="bottom-0 left-1/2 -translate-x-1/2 lg:-translate-x-0 lg:left-2 w-[180px] lg:w-[240px]"
              image2="/f4.svg"
              image2Width="100px"
              image2Position="bottom-0 right-0 w-[80px] lg:w-[100px]"
            />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <FeaturesCard 
              bgColor="#01D396"
              title="Yield Boost Mechanism"
              description="Optimized earnings by dynamically shifting funds between P2P and LP models."
              image1="/f10.svg"
              image1Width="280px"
              image1Position="bottom-0 left-1/2 -translate-x-1/2 w-[260px] lg:w-[280px]"
              image2="/f9.svg"
              image2Width="80px"
              image2Position="top-1/2 -translate-y-1/2 right-0 w-[80px]"
            />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <FeaturesCard 
              bgColor="#302F2F"
              title="Customizable Lending Pools"
              description="Optimized earnings by dynamically shifting funds between P2P and LP models."
              image1="/f5.svg"
              image1Width="80px"
              image1Position="bottom-2 left-2 w-[80px]"
              image2="/f6.svg"
              image2Width="100px"
              image2Position="bottom-0 right-0 w-[100px]"
            />
            <FeaturesCard 
              bgColor="#FE8C43"
              title="Secure & Permissionless"
              description="Built on Scroll, vProtocol ensures decentralized, non-custodial lending with transparent smart EIP2535 contracts."
              image1="/f7.svg"
              image1Width="240px"
              image1Position="bottom-0 left-1/2 -translate-x-1/2 w-[240px]"
              image2="/f8.png"
              image2Width="100px"
              image2Position="bottom-0 right-0 w-[80px] lg:w-[100px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;