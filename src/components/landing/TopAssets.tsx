import { coins } from "../../constants/config/dummyCoins";
import { AssetsCard } from "./AssetsCard";

const TopAssets = () => {
  return (
    <div className="2xl:mt-20 lg:my-16 my-14 w-[95%] lg:w-[81.02%] mx-auto max-w-[1400px]">
      <div className="flex flex-col items-center justify-center">
        <h3 className="font-kaleko font-bold text-[35px] lg:text-[40px]">Top Assets</h3>

        {/* Scrolling container */}
        <div className="mt-6 lg:mt-8 w-full 2xl:w-[1400px] overflow-hidden">
        <div className="flex gap-6 overflow-x-auto no-scrollbar max-w-full 2xl:justify-between">
            {coins.map((coin: any, index: any) => (
            <div key={index} className="shrink-0 w-[calc((1200px-3*24px)/4)] 2xl:w-[calc((100%-3*24px)/4)]">
                <AssetsCard coin={coin} />
            </div>
            ))}
        </div>
</div>
      </div>
    </div>
  );
};

export default TopAssets;