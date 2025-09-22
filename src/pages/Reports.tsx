import Papa from 'papaparse'
import { useTreasuryStore } from '../store/treasuryStore'

function Reports() {
	const { transactions } = useTreasuryStore()

	function exportCsv() {
		const csv = Papa.unparse(transactions)
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', 'treasury_report.csv')
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<div style={{ color: 'white' }}>
			<h2 className="brand" style={{ marginTop: 0 }}>Reports</h2>
			<div className="panel" style={{ padding: 12 }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div style={{ fontWeight: 600 }}>Transaction History</div>
					<button className="btn btn-primary" onClick={exportCsv}>Export CSV</button>
				</div>
				<div className="table-wrap" style={{ marginTop: 8 }}>
					<table className="table">
						<thead>
							<tr>
								<th>Date</th>
								<th>Type</th>
								<th>Asset</th>
								<th>Amount</th>
								<th>Value ($)</th>
							</tr>
						</thead>
						<tbody>
							{transactions.map((t) => (
								<tr key={t.id}>
									<td>{new Date(t.date).toLocaleString()}</td>
									<td>{t.type}</td>
									<td>{t.asset}</td>
									<td>{t.amount}</td>
									<td>{t.valueUSD}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default Reports