import { getDefaultConfig, darkTheme } from '@rainbow-me/rainbowkit'
import { http } from 'viem'
import { mainnet, polygon, arbitrum, base, optimism } from 'wagmi/chains'

export const walletConfig = getDefaultConfig({
	appName: 'Viper Treasury',
	projectId: import.meta.env.VITE_WC_PROJECT_ID || 'WALLETCONNECT_PROJECT_ID',
	chains: [mainnet, polygon, base, arbitrum, optimism],
	transports: {
		[mainnet.id]: http(),
		[polygon.id]: http(),
		[base.id]: http(),
		[arbitrum.id]: http(),
		[optimism.id]: http(),
	},
})

export const walletTheme = darkTheme({
	accentColor: '#60a5fa',
	accentColorForeground: 'white',
	borderRadius: 'medium',
})