import { PeerData } from "../../constants/types";
import useServiceRequest from "../../hook/write/useServiceRequest";
import useRequestLoanFromListing from "../../hook/write/useRequestLoanFromListing";
import { useState, useEffect } from "react";

const PeerTable = ({ peerData }: { peerData: PeerData[] }) => {
  const [selectedVolume, setSelectedVolume] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedDecimal, setSelectedDecimal] = useState(18);
  const [action, setAction] = useState<"borrow" | "service" | null>(null);

  const serviceRequest = useServiceRequest(selectedVolume, Number(selectedId), selectedAddress);
  const requestLoan = useRequestLoanFromListing(Number(selectedId), selectedVolume, selectedDecimal);

  const handleService = (volume: string, id: number, address: string) => {
    setSelectedVolume(volume);
    setSelectedId(id);
    setSelectedAddress(address);
    setAction("service");
  };

  const handleBorrow = (id: number, volume: string, decimal: number) => {
    setSelectedId(id);
    setSelectedVolume(volume);
    setSelectedDecimal(decimal);
    setAction("borrow");
  };

  // ✅ Call service request after state updates
  useEffect(() => {
    if (selectedId !== null && action === "service") {
      serviceRequest();
      setAction(null); // Reset action after calling
    }
  }, [selectedId, selectedVolume, selectedAddress, action, serviceRequest]);

  // ✅ Call request loan after state updates
  useEffect(() => {
    if (selectedId !== null && action === "borrow") {
      requestLoan();
      setAction(null); // Reset action after calling
    }
  }, [selectedId, selectedVolume, selectedDecimal, action, requestLoan]);

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
                {peer.type === "lend" && (
                  <div 
                    className="bg-[#01D396] rounded-lg py-2 px-4 cursor-pointer"
                    onClick={() => handleBorrow(peer.id, peer.volume, peer.tokenDecimal)}
                  >
                    Borrow
                  </div>
                )}
              
                {peer.type === "borrow" && (
                  <div 
                    className="bg-[#A66CFF] rounded-lg py-2 px-4 cursor-pointer"
                    onClick={() => handleService(peer.volume, peer.id, peer.tokenAddress)}
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