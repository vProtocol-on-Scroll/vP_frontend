import { PeerData } from "../../constants/types";

const PeerTable = ({ peerData }: { peerData: PeerData[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-4">
        <thead className="text-[#0D0D0D] font-medium text-[13px]">
          <tr>
            <th className="text-[#0D0D0D80] text-start py-2">Asset</th>
            <th className="text-center py-2"></th>
            <th className="text-center py-2">Duration</th>
            <th className="text-center py-2">Interest</th>
            <th className="text-center py-2">Volume</th>
            <th className="text-center py-2"></th>
          </tr>
        </thead>
        <tbody className="text-[#0D0D0D] text-lg font-extrabold">
          {peerData.map((peer, index) => (
            <tr key={index} className="bg-white shadow-lg rounded-2xl">
              <td className="flex gap-2 items-center p-4">
                <img src={peer.icon} width={40} height={40} alt={peer.asset} />
                <span className="text-base">{peer.asset}</span>
              </td>
              <td className="text-center p-4">{peer.address}</td>
              <td className="text-center p-4">{peer.duration}</td>
              <td className="text-center p-4">{peer.interest}</td>
              <td className="text-center p-4">
                <p>{peer.volume}</p>
                <p className="text-[#0D0D0D80] font-medium text-[13px] leading-none">
                  {peer.volumeUSD}
                </p>
              </td>
              <td className="text-center p-4">
                <div className="bg-[#01D396] rounded-lg py-2 px-4">{peer.type == "lend" ? "Lend" :  "Borrow" }</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeerTable;