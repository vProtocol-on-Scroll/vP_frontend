// import { useNavigate } from "react-router-dom";
// import { formatMoney } from "../../constants/utils/formatMoney";
//
// interface PoolData {
//   asset: string;
//   icon: string;
//   supplyApy: string;
//   borrowApr: string;
//   totalSupply: string;
//   totalSupplyUSD: string;
//   totalBorrow: string;
//   totalBorrowUSD: string;
// }
//
// const PoolTable = ({ poolData }: { poolData: PoolData[] }) => {
//   const navigate = useNavigate()
//
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full border-separate border-spacing-y-4">
//         <thead className="text-[#ffffff] font-medium text-[13px]">
//           <tr>
//             <th className="text-[#ffffff] w-[30%] text-start py-2">Asset</th>
//             <th className="text-center py-2">Supply APY</th>
//             <th className="text-center py-2">Borrow APR</th>
//             <th className="text-center py-2">Total Supply</th>
//             <th className="text-center py-2">Total Borrow</th>
//           </tr>
//         </thead>
//         <tbody className="text-[#0D0D0D] text-lg font-extrabold">
//           {poolData.map((pool, index) => (
//             <tr key={index} className="bg-white shadow-lg rounded-2xl cursor-pointer noise-3"
//               onClick={() =>
//                 navigate("/transact/borrow", {
//                   state: {
//                     _amount: pool.totalSupply,
//                     borrowApr: pool.borrowApr,
//                     tokenName: pool.asset,
//                   },
//                 })}
//             >
//               <td className="flex gap-2 items-center py-4 px-6">
//                 <img src={pool.icon} width={40} height={40} alt={pool.asset} />
//                 <span className="text-base">{pool.asset}</span>
//               </td>
//               <td className="text-center py-4 px-6">{pool.supplyApy}</td>
//               <td className="text-center py-4 px-6">{pool.borrowApr}</td>
//               <td className="text-center py-4 px-6">
//                 <p>{formatMoney(pool.totalSupply)}</p>
//                 <p className="text-[#0D0D0D80] font-medium text-[13px] leading-none">
//                   ${formatMoney(pool.totalSupplyUSD)}
//                 </p>
//               </td>
//               <td className="text-center py-4 px-6">
//                 <p>{formatMoney(pool.totalBorrow)}</p>
//                 <p className="text-[#0D0D0D80] font-medium text-[13px] leading-none">
//                   ${formatMoney(pool.totalBorrowUSD)}
//                 </p>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
//
// export default PoolTable;

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { formatMoney } from "../../constants/utils/formatMoney";

interface PoolData {
  asset: string;
  icon: string;
  supplyApy: string;
  borrowApr: string;
  totalSupply: string;
  totalSupplyUSD: string;
  totalBorrow: string;
  totalBorrowUSD: string;
}

const PoolTable = ({ poolData }: { poolData: PoolData[] }) => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null); // Keep track of the open dropdown

  const handleDropdownSelect = (option: string, pool: PoolData) => {
    setOpenDropdown(null); // Close the dropdown after selecting
    if (option === "Supply") {
      navigate("/transact/supply", {
        state: {
          amount: pool.totalSupply,
          supplyApy: pool.supplyApy,
          tokenName: pool.asset,
        },
      });
    } else if (option === "Borrow") {
      navigate("/transact/borrow", {
        state: {
          amount: pool.totalBorrow,
          borrowApr: pool.borrowApr,
          tokenName: pool.asset,
        },
      });
    }
  };

  return (
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-4">
          <thead className="text-[#ffffff] font-medium text-[13px]">
          <tr>
            <th className="text-[#ffffff] w-[30%] text-start py-2">Asset</th>
            <th className="text-center py-2">Supply APY</th>
            <th className="text-center py-2">Borrow APR</th>
            <th className="text-center py-2">Total Supply</th>
            <th className="text-center py-2">Total Borrow</th>
            <th className="text-center py-2">Actions</th>
          </tr>
          </thead>
          <tbody className="text-[#0D0D0D] text-lg font-extrabold">
          {poolData.map((pool, index) => (
              <tr
                  key={index}
                  className="bg-white shadow-lg rounded-2xl noise-3"
              >
                <td className="flex gap-2 items-center py-4 px-6">
                  <img src={pool.icon} width={40} height={40} alt={pool.asset} />
                  <span className="text-base">{pool.asset}</span>
                </td>
                <td className="text-center py-4 px-6">{pool.supplyApy}</td>
                <td className="text-center py-4 px-6">{pool.borrowApr}</td>
                <td className="text-center py-4 px-6">
                  <p>{formatMoney(pool.totalSupply)}</p>
                  <p className="text-[#0D0D0D80] font-medium text-[13px] leading-none">
                    ${formatMoney(pool.totalSupplyUSD)}
                  </p>
                </td>
                <td className="text-center py-4 px-6">
                  <p>{formatMoney(pool.totalBorrow)}</p>
                  <p className="text-[#0D0D0D80] font-medium text-[13px] leading-none">
                    ${formatMoney(pool.totalBorrowUSD)}
                  </p>
                </td>
                <td className="text-center py-4 px-6 relative">
                  <button
                      className="bg-gray-200 px-4 py-2 text-black rounded-lg hover:bg-gray-300"
                      onClick={() =>
                          setOpenDropdown(openDropdown === index ? null : index)
                      }
                  >
                    Actions
                  </button>
                  {openDropdown === index && (
                      <div className="absolute z-10 mt-2 w-40 bg-white rounded-md shadow-md left-0">
                        <ul className="py-1">
                          <li
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => handleDropdownSelect("Supply", pool)}
                          >
                            Supply
                          </li>
                          <li
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => handleDropdownSelect("Borrow", pool)}
                          >
                            Borrow
                          </li>
                        </ul>
                      </div>
                  )}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default PoolTable;