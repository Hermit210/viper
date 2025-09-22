import { useAccount, useChainId, useReadContracts } from 'wagmi'

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

type TokenConfig = { address: `0x${string}`; symbol?: string }

const TOKENS_BY_CHAIN: Record<number, TokenConfig[]> = {
	1: [
		{ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', symbol: 'USDC' }, // USDC
		{ address: '0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2', symbol: 'WETH' }, // WETH
		{ address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', symbol: 'WBTC' }, // WBTC
	],
	137: [
		{ address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', symbol: 'USDC.e' },
		{ address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', symbol: 'WETH' },
	],
	8453: [
		{ address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', symbol: 'USDC' },
	],
	42161: [
		{ address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', symbol: 'USDC' },
	],
	10: [
		{ address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', symbol: 'USDC.e' },
	],
}

function formatAmount(raw: bigint | undefined, decimals: number | undefined, precision = 6) {
	if (raw === undefined || decimals === undefined) return '—'
	const divided = Number(raw) / 10 ** decimals
	if (!Number.isFinite(divided)) return '—'
	return divided.toLocaleString(undefined, { maximumFractionDigits: precision })
}

function OnchainBalances() {
	const { address, isConnected } = useAccount()
	const chainId = useChainId()

	if (!isConnected || !address) return null

	const tokens = TOKENS_BY_CHAIN[chainId] || []
	if (tokens.length === 0) {
		return (
			<div className="panel" style={{ padding: 12 }}>
				<div className="subtle">No token list configured for this chain (ID {chainId}).</div>
			</div>
		)
	}

	const contracts = tokens.flatMap((t) => [
		{ address: t.address, abi: erc20Abi, functionName: 'symbol' as const },
		{ address: t.address, abi: erc20Abi, functionName: 'decimals' as const },
		{ address: t.address, abi: erc20Abi, functionName: 'balanceOf' as const, args: [address] as const },
	])

	const { data, isFetching } = useReadContracts({
		contracts,
		allowFailure: true,
	})

	const rows = tokens.map((t, i) => {
		const symIdx = i * 3
		const decIdx = i * 3 + 1
		const balIdx = i * 3 + 2
		const sym = data?.[symIdx]?.result as string | undefined
		const dec = data?.[decIdx]?.result as number | undefined
		const bal = data?.[balIdx]?.result as bigint | undefined
		return { address: t.address, symbol: sym || t.symbol || '—', decimals: dec, balance: bal }
	})

	return (
		<div className="panel" style={{ padding: 12 }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<div style={{ fontWeight: 600 }}>On-chain Balances</div>
				{isFetching && <div className="subtle" style={{ fontSize: 12 }}>Loading…</div>}
			</div>
			<div className="table-wrap" style={{ marginTop: 8 }}>
				<table className="table">
					<thead>
						<tr>
							<th>Token</th>
							<th>Address</th>
							<th>Balance</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((r) => (
							<tr key={r.address}>
								<td>{r.symbol}</td>
								<td>{r.address.slice(0, 6)}…{r.address.slice(-4)}</td>
								<td>{formatAmount(r.balance, r.decimals)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default OnchainBalances