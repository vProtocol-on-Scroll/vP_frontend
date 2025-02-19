import { Coin } from "../types";

export const coins :Coin[] = [
  {
    name: "ETHER",
    symbol: "ETH",
    icon: "/icons/eth.svg",
    supplied: { value: "12.34M", amount: "3.44k", apy: "6.007%" },
    borrowed: { value: "860.87", amount: "240.56", apr: "0.106%" },
  },
  {
    name: "USD Circle",
    symbol: "USDC",
    icon: "/icons/eth.svg",
    supplied: { value: "3.95M", amount: "2.21k", apy: "14.07%" },
    borrowed: { value: "1.12M", amount: "560.45", apr: "6.532%" },
  },
  {
    name: "Chainlink",
    symbol: "Link",
    icon: "/icons/eth.svg",
    supplied: { value: "3.12M", amount: "1.01k", apy: "3.201%" },
    borrowed: { value: "1.45M", amount: "350.78", apr: "1.005%" },
  },
  {
    name: "Tether USD",
    symbol: "USDT",
    icon: "/icons/eth.svg",
    supplied: { value: "7.89M", amount: "4.34k", apy: "6.450%" },
    borrowed: { value: "3.12M", amount: "1.12k", apr: "2.003%" },
  },
];