export interface VariantProps {
  title: string;
  amount: string;
  buttonText: string;
  stats?: { label: string; value: string }[];
  healthFactor?: number | null;
  typeAssets?: string;
  bgColor: string;
  link: string;
}

export interface OrderCardProps {
  type?: "borrow" | "supply" | "lend";
  token: string;
  icon: string;
  amount: string;
  amountUSD: string;
  stat1Value?: string;
  stat1ValueUSD?: string;
  stat2Value?: string;
  expiry?: string;
  profitOrInterestValue?: string;
  profitOrInterestValueUSD?: string;
  duration?: string;
}

export interface PeerData {
  asset: string;
  icon: string;
  duration: string;
  interest: string;
  volume: string;
  volumeUSD: string;
  address: string;
  type: "lend" | "borrow";
}