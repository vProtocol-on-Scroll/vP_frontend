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
  asset?: string;
  icon: string;
  duration: string | number;
  interest: string;
  volume: string;
  volumeUSD: string;
  address: string;
  id: any;
  tokenAddress: any;
  tokenDecimal: number;
  type: "lend" | "borrow";
}


export interface LoanListing {
	listingId: number;
	author: string;
	tokenAddress: string;
	amount: string;
	min_amount: string;
	max_amount: string;
	returnDate: number;
	expirationDate: number;
	interest: number;
  status: string;
  tokenName: string,
  tokenIcon: any,
  tokenDecimal: number,
}