import logo from '../pipcoin-logo.svg'

function MobileLayout() {
  return (
    <div className="export-wrapper mobile-layout">
      <header>
        <div className="container header-content">
          <div className="logo">
            <img src={logo} alt="Pipcoin Logo" />
          </div>
          <div className="header-actions">
            <div className="btn btn-primary" style={{ padding: '8px 12px', fontSize: '13px' }}>
              Start Assessment
            </div>
          </div>
        </div>
      </header>

      <main>
        <section style={{ textAlign: 'center', paddingTop: '56px', paddingBottom: '48px' }}>
          <div className="container">
            <div id="hero-logo-badge" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <img src={logo} alt="Pipcoin Logo" style={{ height: '36px', display: 'block', objectFit: 'contain' }} />
            </div>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 800,
                color: '#211f20',
                lineHeight: 1.2,
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}
            >
              Expert PIP Advocacy &amp; Claims Consultancy
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--muted-foreground)', marginBottom: '32px' }}>
              End-to-end support for your PIP application on a &apos;No Win, No Fee&apos; basis. Let our specialists guide you to the outcome you deserve.
            </p>
            <div className="btn btn-primary" style={{ fontSize: '16px', padding: '16px 24px', width: '100%' }}>
              Start Your Assessment
            </div>

            <div className="check-list">
              <div className="check-item">
                <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <iconify-icon icon="lucide:check-circle-2" style={{ fontSize: '20px', color: '#4ade80' }}></iconify-icon>
                </div>
                Free Initial Review
              </div>
              <div className="check-item">
                <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <iconify-icon icon="lucide:check-circle-2" style={{ fontSize: '20px', color: '#4ade80' }}></iconify-icon>
                </div>
                Dedicated Case Manager
              </div>
              <div className="check-item">
                <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <iconify-icon icon="lucide:check-circle-2" style={{ fontSize: '20px', color: '#4ade80' }}></iconify-icon>
                </div>
                Highest Success Rates
              </div>
            </div>
          </div>
        </section>

        <section className="mobile-soft-bg">
          <div className="container">
            <h2 className="section-title">Why Choose Pipcoin?</h2>
            <p className="section-subtitle">
              Our specialized methodology ensures the strongest possible foundation for your claim.
            </p>

            <div className="grid-3">
              <div className="card">
                <div className="card-icon">
                  <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <iconify-icon icon="lucide:files" style={{ fontSize: '24px', color: 'var(--primary)' }}></iconify-icon>
                  </div>
                </div>
                <h3 className="card-title">Full Evidence Building</h3>
                <p className="card-text">
                  Collecting and organizing crucial medical documentation to build a robust foundation for maximum success.
                </p>
              </div>
              <div className="card">
                <div className="card-icon">
                  <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <iconify-icon icon="lucide:clipboard-edit" style={{ fontSize: '24px', color: 'var(--primary)' }}></iconify-icon>
                  </div>
                </div>
                <h3 className="card-title">Expert Application Prep</h3>
                <p className="card-text">
                  Meticulously aligning your forms and statements with specific PIP scoring criteria used by assessors.
                </p>
              </div>
              <div className="card">
                <div className="card-icon">
                  <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <iconify-icon icon="lucide:gavel" style={{ fontSize: '24px', color: 'var(--primary)' }}></iconify-icon>
                  </div>
                </div>
                <h3 className="card-title">Tribunal Representation</h3>
                <p className="card-text">
                  Professional advocacy and steadfast support through the appeals process if your initial claim is rejected.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              A clear, guided path to securing your personal independence payment.
            </p>

            <div className="grid-4">
              <div>
                <div className="step-number">1</div>
                <h3 className="step-title">Free Eligibility Assessment</h3>
                <p className="card-text">
                  Complete our quick initial screening to determine the viability of your PIP claim.
                </p>
              </div>
              <div>
                <div className="step-number">2</div>
                <h3 className="step-title">Comprehensive Evidence Gathering</h3>
                <p className="card-text">
                  We handle the complex process of sourcing medical records and statements.
                </p>
              </div>
              <div>
                <div className="step-number">3</div>
                <h3 className="step-title">Application Submission</h3>
                <p className="card-text">
                  Our experts draft and submit your application tailored to DWP scoring criteria.
                </p>
              </div>
              <div>
                <div className="step-number">4</div>
                <h3 className="step-title">Award &amp; Support</h3>
                <p className="card-text">
                  Receive your decision. We stand by you for any mandatory reconsiderations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mobile-form-section">
          <div className="container">
            <div className="form-wrapper">
              <div className="progress-bar-container">
                <div className="progress-bar-fill"></div>
              </div>

              <div className="form-header">
                <span className="form-step-text">Step 1 of 3</span>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#211f20', marginBottom: '8px' }}>
                  Tell us about yourself
                </h2>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>
                  This helps us evaluate your eligibility quickly and accurately.
                </p>
              </div>

              <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">First Name</label>
                  <div className="form-control">e.g. John</div>
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <div className="form-control">e.g. Doe</div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="form-control">john.doe@example.com</div>
              </div>

              <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Marital Status</label>
                  <div className="form-control select-mock">
                    Select status
                    <div style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <iconify-icon icon="lucide:chevron-down" style={{ fontSize: '16px', color: 'var(--muted-foreground)' }}></iconify-icon>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Currently claiming benefits?</label>
                  <div className="form-control select-mock">
                    Yes / No
                    <div style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <iconify-icon icon="lucide:chevron-down" style={{ fontSize: '16px', color: 'var(--muted-foreground)' }}></iconify-icon>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Do you drive?</label>
                  <div className="form-control select-mock">
                    Select
                    <div style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <iconify-icon icon="lucide:chevron-down" style={{ fontSize: '16px', color: 'var(--muted-foreground)' }}></iconify-icon>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Years at current address</label>
                  <div className="form-control select-mock">
                    Select duration
                    <div style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <iconify-icon icon="lucide:chevron-down" style={{ fontSize: '16px', color: 'var(--muted-foreground)' }}></iconify-icon>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Primary Condition / Disabilities</label>
                <div className="form-control" style={{ height: '80px', color: 'var(--muted-foreground)' }}>
                  Briefly describe your main conditions...
                </div>
              </div>

              <div className="btn btn-primary mobile-next-button" style={{ width: '100%', padding: '16px', fontSize: '15px', marginTop: '8px' }}>
                Continue to Next Step
                <div style={{ width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '8px' }}>
                  <iconify-icon icon="lucide:arrow-right" style={{ fontSize: '18px', color: 'var(--primary-foreground)' }}></iconify-icon>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p className="footer-text">© 2025 UpSizer/Pipcoin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default MobileLayout
