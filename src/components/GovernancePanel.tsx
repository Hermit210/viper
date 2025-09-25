import { useState } from 'react'
import { useTreasuryStore, type GovernanceProposal } from '../store/treasuryStore'

function GovernancePanel() {
	const { governanceProposals, createGovernanceProposal, voteOnProposal, agentConfig } = useTreasuryStore()
	const [showCreateForm, setShowCreateForm] = useState(false)
	const [newProposal, setNewProposal] = useState({
		title: '',
		description: '',
		type: 'REBALANCE' as const,
		proposedChanges: {},
		votingPower: 100,
		deadline: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days from now
	})

	if (!agentConfig.enableGovernanceMode) {
		return (
			<div className="panel" style={{ padding: 12 }}>
				<div style={{ fontWeight: 600, marginBottom: 8 }}>DAO Governance</div>
				<div className="subtle" style={{ fontSize: 14 }}>
					Enable Governance Mode in Agent Configuration to access DAO features.
				</div>
			</div>
		)
	}

	const handleCreateProposal = () => {
		if (newProposal.title.trim() && newProposal.description.trim()) {
			createGovernanceProposal(newProposal)
			setNewProposal({
				title: '',
				description: '',
				type: 'REBALANCE',
				proposedChanges: {},
				votingPower: 100,
				deadline: Date.now() + 7 * 24 * 60 * 60 * 1000
			})
			setShowCreateForm(false)
		}
	}

	const handleVote = (proposalId: string, vote: 'for' | 'against' | 'abstain') => {
		voteOnProposal(proposalId, vote, 10) // Simulate 10 voting power
	}

	const getProposalStatus = (proposal: GovernanceProposal) => {
		const totalVotes = proposal.votes.for + proposal.votes.against + proposal.votes.abstain
		const forPercentage = totalVotes > 0 ? (proposal.votes.for / totalVotes) * 100 : 0
		
		if (Date.now() > proposal.deadline) {
			return forPercentage > 50 ? 'PASSED' : 'REJECTED'
		}
		return proposal.status
	}

	return (
		<div className="panel" style={{ padding: 12 }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
				<div style={{ fontWeight: 600 }}>DAO Governance</div>
				<button 
					className="btn btn-primary" 
					onClick={() => setShowCreateForm(!showCreateForm)}
				>
					{showCreateForm ? 'Cancel' : 'New Proposal'}
				</button>
			</div>

			{showCreateForm && (
				<div style={{ 
					marginBottom: 16, 
					padding: 12, 
					background: 'rgba(96,165,250,0.1)', 
					borderRadius: 6,
					border: '1px solid rgba(96,165,250,0.2)'
				}}>
					<div style={{ fontWeight: 600, marginBottom: 8 }}>Create New Proposal</div>
					<div style={{ display: 'grid', gap: 8 }}>
						<input
							type="text"
							placeholder="Proposal Title"
							value={newProposal.title}
							onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
							style={{ padding: 8, borderRadius: 4, border: '1px solid #374151', background: '#1f2937', color: 'white' }}
						/>
						<textarea
							placeholder="Proposal Description"
							value={newProposal.description}
							onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
							rows={3}
							style={{ padding: 8, borderRadius: 4, border: '1px solid #374151', background: '#1f2937', color: 'white', resize: 'vertical' }}
						/>
						<select
							value={newProposal.type}
							onChange={(e) => setNewProposal({ ...newProposal, type: e.target.value as any })}
							style={{ padding: 8, borderRadius: 4, border: '1px solid #374151', background: '#1f2937', color: 'white' }}
						>
							<option value="REBALANCE">Portfolio Rebalance</option>
							<option value="POLICY_CHANGE">Policy Change</option>
							<option value="EMERGENCY_ACTION">Emergency Action</option>
						</select>
						<div style={{ display: 'flex', gap: 8 }}>
							<button className="btn btn-primary" onClick={handleCreateProposal}>
								Create Proposal
							</button>
							<button className="btn" onClick={() => setShowCreateForm(false)}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			<div style={{ maxHeight: 400, overflowY: 'auto' }}>
				{governanceProposals.length === 0 ? (
					<div className="subtle" style={{ fontSize: 14, textAlign: 'center', padding: 20 }}>
						No active proposals. Create one to get started with DAO governance.
					</div>
				) : (
					governanceProposals.map((proposal) => {
						const status = getProposalStatus(proposal)
						const totalVotes = proposal.votes.for + proposal.votes.against + proposal.votes.abstain
						const forPercentage = totalVotes > 0 ? (proposal.votes.for / totalVotes) * 100 : 0
						const isActive = status === 'ACTIVE' && Date.now() < proposal.deadline

						return (
							<div key={proposal.id} style={{ 
								marginBottom: 12, 
								padding: 12, 
								background: 'rgba(96,165,250,0.05)', 
								borderRadius: 6,
								border: `1px solid ${status === 'PASSED' ? '#22d3ee' : status === 'REJECTED' ? '#ef4444' : '#60a5fa'}40`
							}}>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
									<div style={{ fontWeight: 600, fontSize: 14 }}>{proposal.title}</div>
									<div style={{ 
										fontSize: 11, 
										padding: '2px 6px', 
										borderRadius: 3,
										background: status === 'PASSED' ? '#22d3ee20' : 
												   status === 'REJECTED' ? '#ef444420' : '#60a5fa20',
										color: status === 'PASSED' ? '#22d3ee' : 
											   status === 'REJECTED' ? '#ef4444' : '#60a5fa'
									}}>
										{status}
									</div>
								</div>
								
								<div className="subtle" style={{ fontSize: 12, marginBottom: 8 }}>
									{proposal.description}
								</div>
								
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
									<div className="subtle" style={{ fontSize: 11 }}>
										Type: {proposal.type.replace('_', ' ')}
									</div>
									<div className="subtle" style={{ fontSize: 11 }}>
										Deadline: {new Date(proposal.deadline).toLocaleDateString()}
									</div>
								</div>

								<div style={{ marginBottom: 8 }}>
									<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
										<span>For: {proposal.votes.for}</span>
										<span>Against: {proposal.votes.against}</span>
										<span>Abstain: {proposal.votes.abstain}</span>
									</div>
									<div style={{ 
										width: '100%', 
										height: 4, 
										background: '#374151', 
										borderRadius: 2,
										overflow: 'hidden'
									}}>
										<div style={{ 
											width: `${forPercentage}%`, 
											height: '100%', 
											background: forPercentage > 50 ? '#22d3ee' : '#60a5fa',
											transition: 'width 0.3s ease'
										}} />
									</div>
									<div className="subtle" style={{ fontSize: 10, textAlign: 'center', marginTop: 2 }}>
										{forPercentage.toFixed(1)}% in favor
									</div>
								</div>

								{isActive && (
									<div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
										<button 
											className="btn" 
											style={{ fontSize: 11, padding: '4px 8px', background: '#22d3ee20', color: '#22d3ee' }}
											onClick={() => handleVote(proposal.id, 'for')}
										>
											Vote For
										</button>
										<button 
											className="btn" 
											style={{ fontSize: 11, padding: '4px 8px', background: '#ef444420', color: '#ef4444' }}
											onClick={() => handleVote(proposal.id, 'against')}
										>
											Vote Against
										</button>
										<button 
											className="btn" 
											style={{ fontSize: 11, padding: '4px 8px' }}
											onClick={() => handleVote(proposal.id, 'abstain')}
										>
											Abstain
										</button>
									</div>
								)}
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}

export default GovernancePanel