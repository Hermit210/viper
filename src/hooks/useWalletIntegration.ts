import { useAccount, useChainId, useReadContracts, useBalance } from 'wagmi'
import { useEffect } from 'react'
import { useTreasuryStore } from '../store/treasuryStore'

const erc20Abi = [
	{
		name: 'balanceOf',
		type: 'function',
		stateMutability: 'view',
		inputs: [{ name: 'owner', type: 'address' }],
		outputs: [{ type: 'uint256' }],
	},
	{
		name: 'decimals',
		type: 'function',
		stateMutability: 'view',
		inputs: [],
		outputs: [{ type: 'uint8' }],
	},
	{
		name: 'symbol',
		type: 'function',
		stateMutability: 'view',
		inputs: [],
		outputs: [{ type: 'string' }],
	},
] as const

type TokenConfig = { 
	address: `0x${string}`; 
	symbol: string;
	coingeckoId?: string;
}

const TOKENS_BY_CHAIN: Record<number, TokenConfig[]> = {
	1: [
		{ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', symbol: 'USDC', coingeckoId: 'usd-coin' },
		{ address: '0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2', symbol: 'WETH', coingeckoId: 'ethereum' },
		{ address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', symbol: 'WBTC', coingeckoId: 'bitcoin' },
	],
	137: [
		{ address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', symbol: 'USDC', coingeckoId: 'usd-coin' },
		{ address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', symbol: 'WETH', coingeckoId: 'ethereum' },
	],
	8453: [
		{ address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', symbol: 'USDC', coingeckoId: 'usd-coin' },
	],
	42161: [
		{ address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', symbol: 'USDC', coingeckoId: 'usd-coin' },
	],
	10: [
		{ address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', symbol: 'USDC', coingeckoId: 'usd-coin' },
	],
}

// Mock prices for demo - in production, you'd fetch from CoinGecko or similar
const MOCK_PRICES: Record<string, number> = {
	'usd-coin': 1.00,
	'ethereum': 3200,
	'bitcoin': 67000,
}

// Get price for native tokens by chain
const getNativeTokenPrice = (chainId: number): number => {
	switch (chainId) {
		case 1: return MOCK_PRICES.ethereum // Ethereum mainnet
		case 137: return 0.8 // Polygon MATIC
		case 8453: return MOCK_PRICES.ethereum // Base (uses ETH)
		case 42161: return MOCK_PRICES.ethereum // Arbitrum (uses ETH)
		case 10: return MOCK_PRICES.ethereum // Optimism (uses ETH)
		default: return MOCK_PRICES.ethereum
	}
}

export function useWalletIntegration() {
	const { address, isConnected } = useAccount()
	const chainId = useChainId()
	const { data: nativeBalance } = useBalance({ address, chainId, query: { enabled: Boolean(address) } })
	const { updateWalletAssets, setWalletConnected } = useTreasuryStore()

	const tokens = TOKENS_BY_CHAIN[chainId] || []
	
	const contracts = tokens.flatMap((t) => [
		{ address: t.address, abi: erc20Abi, functionName: 'symbol' as const },
		{ address: t.address, abi: erc20Abi, functionName: 'decimals' as const },
		{ address: t.address, abi: erc20Abi, functionName: 'balanceOf' as const, args: [address] as const },
	])

	const { data: tokenData, isFetching } = useReadContracts({
		contracts,
		allowFailure: true,
		query: { enabled: Boolean(address) && tokens.length > 0 }
	})

	useEffect(() => {
		setWalletConnected(isConnected, address, chainId)
	}, [isConnected, address, chainId, setWalletConnected])

	useEffect(() => {
		if (!isConnected || !address || !tokenData) return

		const walletAssets = []

		// Add native token (ETH, MATIC, etc.)
		if (nativeBalance) {
			const nativeValue = parseFloat(nativeBalance.formatted)
			const nativePrice = getNativeTokenPrice(chainId)
			
			if (nativeValue > 0.0001) { // Only include if balance > 0.0001
				walletAssets.push({
					symbol: nativeBalance.symbol,
					balance: nativeValue,
					valueUSD: nativeValue * nativePrice,
					currentPct: 0, // Will be calculated later
					isNative: true
				})
			}
		}

		// Add ERC20 tokens
		tokens.forEach((token, i) => {
			const symIdx = i * 3
			const decIdx = i * 3 + 1
			const balIdx = i * 3 + 2
			
			const symbol = tokenData[symIdx]?.result as string | undefined
			const decimals = tokenData[decIdx]?.result as number | undefined
			const balance = tokenData[balIdx]?.result as bigint | undefined

			if (balance && decimals && balance > 0n) {
				const tokenBalance = Number(balance) / (10 ** decimals)
				const price = MOCK_PRICES[token.coingeckoId || 'usd-coin'] || 1
				const valueUSD = tokenBalance * price

				if (valueUSD > 0.01) { // Only include tokens worth more than $0.01
					walletAssets.push({
						symbol: symbol || token.symbol,
						balance: tokenBalance,
						valueUSD,
						currentPct: 0, // Will be calculated later
						isNative: false
					})
				}
			}
		})

		// Calculate percentages
		const totalValue = walletAssets.reduce((sum, asset) => sum + asset.valueUSD, 0)
		if (totalValue > 0) {
			walletAssets.forEach(asset => {
				asset.currentPct = (asset.valueUSD / totalValue) * 100
			})
		}

		updateWalletAssets(walletAssets)
	}, [isConnected, address, tokenData, nativeBalance, chainId, tokens, updateWalletAssets])

	return {
		isConnected,
		address,
		chainId,
		nativeBalance,
		isFetching
	}
}