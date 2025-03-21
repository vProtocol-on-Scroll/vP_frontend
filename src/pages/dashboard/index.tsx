import { useState } from "react";
import PeerOrderHistory from "../../components/Dashboard/PeerOrderHistory";
import PoolOrderHistory from "../../components/Dashboard/PoolOrderHistory";
// import Variant from "../../components/Dashboard/Variant";

import VariantCarousel from "../../components/Dashboard/VariantCarousel.tsx";


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"vPool" | "vPeer">("vPool");

  return (
    // max-w-[1024px]
    <div className="max-w-[1300px] w-full m-auto p-6">
      {/* <h3 className="text-left text-[35px] font-kaleko font-extrabold">
        Positions <span className="text-[25px]">{">"} {activeTab}</span>
      </h3> */}

      <div className="mt-12 lg:mt-16 flex items-center gap-3 max-w-[1300px] m-auto">
        <VariantCarousel />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mt-4 max-w-[868px] m-auto">
        <button
          onClick={() => setActiveTab("vPool")}
          className={`px-8 py-2 text-[13px] font-medium cursor-pointer rounded-3xl transition duration-300 ${
            activeTab === "vPool" ? "bg-[#01D396] noise-3 text-[#000]" : "bg-[#fff] text-[#0D0D0D]"
          }`}
        >
          vPool
        </button>
        <button
          onClick={() => setActiveTab("vPeer")}
          className={`px-8 py-2 text-[13px] font-medium cursor-pointer rounded-3xl transition duration-300 ${
            activeTab === "vPeer" ? "bg-[#01D396] noise-3 text-[#000]" : "bg-[#fff] text-[#0D0D0D]"
          }`}
        >
          vPeer
        </button>
      </div>

      {/* Conditional History Display */}
      {activeTab === "vPool" ? <PoolOrderHistory /> : <PeerOrderHistory />}
    </div>
  );
};

export default Dashboard;