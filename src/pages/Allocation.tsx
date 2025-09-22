import { useTreasuryStore } from '../store/treasuryStore'

function Allocation() {
	const { assets, targetAllocation, simulateRebalance, lastRebalance, policyLog } = useTreasuryStore()
	const lastDecision = policyLog[0]

	return (
		<div style={{ color: 'white' }}>
			<h2 className="brand" style={{ marginTop: 0 }}>Portfolio Allocation</h2>
			<div className="grid-2">
				<div className="panel" style={{ padding: 12 }}>
					<div style={{ fontWeight: 600, marginBottom: 8 }}>Current vs Target</div>
					<div className="table-wrap">
						<table className="table">
							<thead>
								<tr>
									<th>Asset</th>
									<th>Value ($)</th>
									<th>Current %</th>
									<th>Target %</th>
								</tr>
							</thead>
							<tbody>
								{assets.map((a) => (
									<tr key={a.symbol}>
										<td>{a.symbol}</td>
										<td>{a.valueUSD.toLocaleString()}</td>
										<td>{a.currentPct.toFixed(2)}%</td>
										<td>{targetAllocation[a.symbol]}%</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div className="panel" style={{ padding: 12 }}>
					<div style={{ fontWeight: 600, marginBottom: 8 }}>Automation</div>
					<button className="btn btn-primary" onClick={simulateRebalance}>Simulate Rebalance</button>
					{lastRebalance && (
						<div className="subtle" style={{ marginTop: 8, fontSize: 12 }}>
							Last simulated: {new Date(lastRebalance).toLocaleString()}
						</div>
					)}
					<div style={{ marginTop: 12 }}>
						<div style={{ fontWeight: 600, marginBottom: 6 }}>Policy Execution Preview</div>
						{lastDecision ? (
							<ul>
								{lastDecision.actions.map((a, i) => (
									<li key={i} className="subtle" style={{ fontSize: 14 }}>
										{a.type}{a.asset ? ` ${a.asset}` : ''}{a.deltaPct !== undefined ? ` ${a.deltaPct > 0 ? '+' : ''}${a.deltaPct}%` : ''}: {a.reason}
									</li>
								))}
							</ul>
						) : (
							<div className="subtle">No recent policy decisions.</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Allocation