import { useTreasuryStore } from '../store/treasuryStore'

function Agents() {
	const { agentConfig, setAgentConfig, agentSuggestions, refreshSuggestions, policyConfig, setPolicyConfig, policyLog, runPolicy, exportConfig, importConfig } = useTreasuryStore()

	function handleExport() {
		const json = exportConfig()
		const blob = new Blob([json], { type: 'application/json' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'viper_treasury_config.json'
		a.click()
		URL.revokeObjectURL(url)
	}

	function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0]
		if (!file) return
		const reader = new FileReader()
		reader.onload = () => {
			if (typeof reader.result === 'string') importConfig(reader.result)
		}
		reader.readAsText(file)
		e.currentTarget.value = ''
	}

	return (
		<div style={{ color: 'white' }}>
			<h2 className="brand" style={{ marginTop: 0 }}>Intelligent Agents</h2>
			<div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
				<button className="btn" onClick={handleExport}>Export Config</button>
				<label className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
					<span>Import Config</span>
					<input type="file" accept="application/json" onChange={handleImport} style={{ display: 'none' }} />
				</label>
			</div>

			<div className="grid-2">
				<div className="panel" style={{ padding: 12 }}>
					<div style={{ fontWeight: 600, marginBottom: 8 }}>Agent Configuration</div>
					<label>
						<span className="subtle" style={{ display: 'block', fontSize: 12 }}>Risk Tolerance</span>
						<input type="range" min={1} max={10} value={agentConfig.riskTolerance} onChange={(e) => setAgentConfig({ ...agentConfig, riskTolerance: Number(e.target.value) })} />
					</label>
					<label style={{ display: 'block', marginTop: 8 }}>
						<input type="checkbox" checked={agentConfig.enableStableReserve} onChange={(e) => setAgentConfig({ ...agentConfig, enableStableReserve: e.target.checked })} /> Maintain 20% stable reserve
					</label>
					<label style={{ display: 'block', marginTop: 8 }}>
						<input type="checkbox" checked={agentConfig.enableMomentum} onChange={(e) => setAgentConfig({ ...agentConfig, enableMomentum: e.target.checked })} /> Momentum overlay
					</label>
				</div>

				<div className="panel" style={{ padding: 12 }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div style={{ fontWeight: 600 }}>Policy Constraints</div>
					</div>
					<div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
						<label>
							<span className="subtle" style={{ display: 'block', fontSize: 12 }}>Min Stable Reserve (%)</span>
							<input type="number" value={policyConfig.minStableReservePct} onChange={(e) => setPolicyConfig({ ...policyConfig, minStableReservePct: Number(e.target.value) })} />
						</label>
						<label>
							<span className="subtle" style={{ display: 'block', fontSize: 12 }}>Max Single Asset (%)</span>
							<input type="number" value={policyConfig.maxSingleAssetPct} onChange={(e) => setPolicyConfig({ ...policyConfig, maxSingleAssetPct: Number(e.target.value) })} />
						</label>
						<button className="btn btn-primary" onClick={runPolicy}>Run Policy</button>
					</div>
				</div>
			</div>

			<div className="grid-2" style={{ marginTop: 12 }}>
				<div className="panel" style={{ padding: 12 }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div style={{ fontWeight: 600 }}>Agent Suggestions</div>
						<button className="btn btn-primary" onClick={refreshSuggestions}>Refresh</button>
					</div>
					<ul>
						{agentSuggestions.map((s, idx) => (
							<li key={idx} style={{ margin: '6px 0', fontSize: 14 }}>
								{s}
							</li>
						))}
					</ul>
				</div>

				<div className="panel" style={{ padding: 12 }}>
					<div style={{ fontWeight: 600, marginBottom: 8 }}>Decision Log</div>
					<ul>
						{policyLog.map((d) => (
							<li key={d.id} style={{ margin: '10px 0' }}>
								<div style={{ fontWeight: 600 }}>{new Date(d.date).toLocaleString()} — {d.summary}</div>
								<ul>
									{d.actions.map((a, i) => (
										<li key={i} className="subtle" style={{ fontSize: 14 }}>
											{a.type}{a.asset ? ` ${a.asset}` : ''}{a.deltaPct !== undefined ? ` ${a.deltaPct > 0 ? '+' : ''}${a.deltaPct}%` : ''}: {a.reason}
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Agents