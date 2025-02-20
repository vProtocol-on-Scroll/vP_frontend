export type Coin = {
  name: string;
  symbol: string;
  icon: string;
  supplied: {
    value: string;
    amount: string;
    apy: string;
  };
  borrowed: {
    value: string;
    amount: string;
    apr: string;
  };
};

export interface CardsProps {
  coin: Coin;
}

export interface VariantProps {
  title: string;
  amount: string;
  buttonText: string;
  stats?: { label: string; value: string }[];
  healthFactor?: number | null;
  bgColor: string;
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
