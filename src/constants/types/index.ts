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