import { Link } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'

function Home() {
	return (
		<div className="home-container">
			{/* Hero Section */}
			<section className="hero-section">
				<div className="hero-content">

					<h1 className="hero-title">
						viper
					</h1>
					<p className="hero-subtitle">
						advanced ai-powered dao management for midnight blockchain
					</p>
					<p className="hero-description">
						intelligent agents, automated portfolio optimization, and comprehensive risk management 
						powered by machine learning algorithms designed for the next generation of dao governance.
					</p>
					<div className="hero-actions">
						<Link to="/dashboard" className="btn btn-primary btn-large">
							launch app
						</Link>
						<ConnectButton label="connect wallet" />
					</div>
				</div>
				<div className="hero-visual">
					<div className="floating-card">
						<div className="card-header">
							<span className="status-dot"></span>
							<span className="card-title">ai agent status</span>
						</div>
						<div className="card-content">
							<div className="metric">
								<span className="metric-label">confidence</span>
								<span className="metric-value">94%</span>
							</div>
							<div className="metric">
								<span className="metric-label">portfolio health</span>
								<span className="metric-value">excellent</span>
							</div>
							<div className="metric">
								<span className="metric-label">risk level</span>
								<span className="metric-value">optimal</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="features-section">
				<div className="section-header">
					<h2 className="section-title">advanced ai capabilities</h2>
					<p className="section-subtitle">
						cutting-edge technology for intelligent treasury management
					</p>
				</div>
				<div className="features-grid">
					<div className="feature-card">
						<div className="feature-icon">🧠</div>
						<h3 className="feature-title">ml portfolio optimization</h3>
						<p className="feature-description">
							machine learning algorithms continuously optimize your portfolio allocation 
							based on market conditions and risk parameters.
						</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">📊</div>
						<h3 className="feature-title">market intelligence</h3>
						<p className="feature-description">
							real-time sentiment analysis, momentum signals, and correlation 
							matrices provide comprehensive market insights.
						</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">⚡</div>
						<h3 className="feature-title">automated execution</h3>
						<p className="feature-description">
							smart rebalancing with threshold-based triggers and 
							ai-powered execution strategies for optimal performance.
						</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">🛡️</div>
						<h3 className="feature-title">risk management</h3>
						<p className="feature-description">
							comprehensive risk metrics including var, stress testing, 
							and anomaly detection with real-time alerts.
						</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">🏛️</div>
						<h3 className="feature-title">dao governance</h3>
						<p className="feature-description">
							integrated governance system with proposal creation, 
							voting mechanisms, and policy enforcement.
						</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">🔮</div>
						<h3 className="feature-title">predictive analytics</h3>
						<p className="feature-description">
							advanced forecasting models with confidence intervals 
							and scenario analysis for strategic planning.
						</p>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="stats-section">
				<div className="stats-grid">
					<div className="stat-item">
						<div className="stat-number">$500M+</div>
						<div className="stat-label">assets under management</div>
					</div>
					<div className="stat-item">
						<div className="stat-number">94%</div>
						<div className="stat-label">ai accuracy rate</div>
					</div>
					<div className="stat-item">
						<div className="stat-number">24/7</div>
						<div className="stat-label">autonomous monitoring</div>
					</div>
					<div className="stat-item">
						<div className="stat-number">15+</div>
						<div className="stat-label">risk metrics tracked</div>
					</div>
				</div>
			</section>

			{/* Technology Section */}
			<section className="tech-section">
				<div className="section-header">
					<h2 className="section-title">built for midnight blockchain</h2>
					<p className="section-subtitle">
						next-generation privacy and scalability for dao management
					</p>
				</div>
				<div className="tech-features">
					<div className="tech-item">
						<div className="tech-icon">🔒</div>
						<div className="tech-content">
							<h4 className="tech-title">privacy-first design</h4>
							<p className="tech-description">
								leverages midnight's privacy features for confidential dao operations
							</p>
						</div>
					</div>
					<div className="tech-item">
						<div className="tech-icon">⚡</div>
						<div className="tech-content">
							<h4 className="tech-title">high performance</h4>
							<p className="tech-description">
								optimized for midnight's high-throughput blockchain infrastructure
							</p>
						</div>
					</div>
					<div className="tech-item">
						<div className="tech-icon">🔗</div>
						<div className="tech-content">
							<h4 className="tech-title">seamless integration</h4>
							<p className="tech-description">
								native integration with midnight's smart contract ecosystem
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="cta-section">
				<div className="cta-content">
					<h2 className="cta-title">ready to optimize your dao?</h2>
					<p className="cta-description">
						join the future of intelligent dao management with ai-powered automation
					</p>
					<div className="cta-actions">
						<Link to="/dashboard" className="btn btn-primary btn-large">
							start managing
						</Link>
						<Link to="/ai-analytics" className="btn btn-secondary">
							view analytics
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Home