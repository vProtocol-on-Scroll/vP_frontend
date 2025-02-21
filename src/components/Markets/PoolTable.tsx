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
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-4">
        <thead className="text-[#0D0D0D] font-medium text-[13px]">
          <tr>
            <th className="text-[#0D0D0D80] w-[30%] text-start py-2">Asset</th>
            <th className="text-center py-2">Supply APY</th>
            <th className="text-center py-2">Borrow APR</th>
            <th className="text-center py-2">Total Supply</th>
            <th className="text-center py-2">Total Borrow</th>
          </tr>
        </thead>
        <tbody className="text-[#0D0D0D] text-lg font-extrabold">
          {poolData.map((pool, index) => (
            <tr key={index} className="bg-white shadow-lg rounded-2xl">
              <td className="flex gap-2 items-center py-4 px-6">
                <img src={pool.icon} width={40} height={40} alt={pool.asset} />
                <span className="text-base">{pool.asset}</span>
              </td>
              <td className="text-center py-4 px-6">{pool.supplyApy}</td>
              <td className="text-center py-4 px-6">{pool.borrowApr}</td>
              <td className="text-center py-4 px-6">
                <p>{pool.totalSupply}</p>
                <p className="text-[#0D0D0D80] font-medium text-[13px] leading-none">
                  {pool.totalSupplyUSD}
                </p>
              </td>
              <td className="text-center py-4 px-6">
                <p>{pool.totalBorrow}</p>
                <p className="text-[#0D0D0D80] font-medium text-[13px] leading-none">
                  {pool.totalBorrowUSD}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PoolTable;