import { PeerData } from "../../constants/types";
import useServiceRequest from "../../hook/write/useServiceRequest";
import useRequestLoanFromListing from "../../hook/write/useRequestLoanFromListing";
import { formatMoney } from "../../constants/utils/formatMoney";

const PeerTable = ({ peerData }: { peerData: PeerData[] }) => {
  

  const serviceRequest = useServiceRequest();
  const requestLoan = useRequestLoanFromListing();

  

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-4">
        <thead className="text-[#fffffff] font-medium text-[13px]">
          <tr>
            <th className="text-[#fffffff] text-start py-2">Asset</th>
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
                <p>{formatMoney(peer.volume)}</p>
                <p className="text-[#0D0D0D80] font-medium text-[13px] leading-none">
                  ${formatMoney(peer.volumeUSD)}
                </p>
              </td>
              <td className="text-center p-4">
                {peer.type === "lend" && (
                  <div 
                    className="bg-[#01D396] rounded-lg py-2 px-4 cursor-pointer"
                    onClick={() => requestLoan(Number(peer.id), String(peer.volume), peer.tokenDecimal)}
                  >
                    Request
                  </div>
                )}
              
                {peer.type === "borrow" && (
                  <div 
                    className="bg-[#A66CFF] rounded-lg py-2 px-4 cursor-pointer"
                    onClick={() => serviceRequest(String(peer.volume), Number(peer.id), peer.tokenAddress)}
                  >
                    Service
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

export default PeerTable;