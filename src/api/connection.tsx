import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { envVars } from '../constants/config/envVars';


export const SUPPORTED_CHAIN_ID = 534351;


const projectId = envVars.projectID


const scroll = {
    chainId: SUPPORTED_CHAIN_ID,
    name: 'Scroll',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.scrollscan.com/',
    rpcUrl: `${projectId}`
}



const metadata = {
    name: 'vProtocol',
    description: 'vProtocol, The Future of DeFi Lending Combines peer-to-peer and Liquidity Pool lending to maximize capital efficiency.',
    url: 'https://app.vprotocol.xyz/',
    icons: ['https://www.vprotocol.xyz/logo.svg']
}

const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: false, // true by default
    rpcUrl: '...', // used for the Coinbase SDK
    defaultChainId: 1 // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
    ethersConfig,
    chains: [scroll],
    projectId: `${projectId}`,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true // Optional - false as default
})
export function Web3Modal({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}