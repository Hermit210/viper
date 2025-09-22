import { useTreasuryStore } from '../store/treasuryStore'

function Scenario() {
	const { scenario, scenarioResult, runScenario, assets } = useTreasuryStore()
	const total = assets.reduce((s, a) => s + a.valueUSD, 0)

	return (
		<div style={{ color: 'white' }}>
			<h2 className="brand" style={{ marginTop: 0 }}>Scenario Simulator</h2>
			<div className="grid-2">
				<div className="panel" style={{ padding: 12 }}>
					<div style={{ fontWeight: 600, marginBottom: 8 }}>Inputs</div>
					<label>
						<span className="subtle" style={{ display: 'block', fontSize: 12 }}>Asset Drop (%)</span>
						<input type="number" value={scenario.assetDropPct} onChange={(e) => useTreasuryStore.setState({ scenario: { ...scenario, assetDropPct: Number(e.target.value) } })} />
					</label>
					<label>
						<span className="subtle" style={{ display: 'block', fontSize: 12 }}>Expense Rise (%)</span>
						<input type="number" value={scenario.expenseRisePct} onChange={(e) => useTreasuryStore.setState({ scenario: { ...scenario, expenseRisePct: Number(e.target.value) } })} />
					</label>
					<button className="btn btn-primary" onClick={runScenario} style={{ marginTop: 8 }}>Run</button>
				</div>
				<div className="panel" style={{ padding: 12 }}>
					<div style={{ fontWeight: 600, marginBottom: 8 }}>Results</div>
					<div className="subtle" style={{ fontSize: 12 }}>Current AUM: ${total.toLocaleString()}</div>
					<div style={{ marginTop: 8 }}>
						<div>Projected AUM: {scenarioResult ? `$${Math.round(scenarioResult.projectedAUM).toLocaleString()}` : '—'}</div>
						<ul>
							{scenarioResult?.notes.map((n, i) => (
								<li key={i} className="subtle" style={{ fontSize: 14 }}>{n}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Scenario