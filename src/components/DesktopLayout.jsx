function DesktopLayout({
  logo,
  isSuccess,
  handleSubmit,
  progressPercent,
  step,
  formData,
  handleConsentChange,
  handleTextChange,
  handleTextBlur,
  handleSelectChange,
  submitError,
  previousStep,
  nextStep,
  isSubmitting,
}) {
  return (
    <div className="export-wrapper">
      <header>
        <div className="container header-content">
          <div className="logo">
            <img src={logo} alt="Pipcoin Logo" />
          </div>
          <div className="header-actions">
            <a href="#assessment" className="btn btn-primary">Start Your Assessment</a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="container hero-container">
            <div id="hero-logo-badge" className="hero-logo-badge">
              <img src={logo} alt="Pipcoin Logo" className="hero-logo" />
            </div>
            <h1 className="hero-title">Expert PIP Advocacy &amp; Claims Consultancy</h1>
            <p className="hero-subtitle">
              End-to-end support for your PIP application on a 'No Win, No Fee' basis. Let our specialists guide you to the outcome you deserve.
            </p>
            <a href="#assessment" className="btn btn-primary btn-hero">Start Your Assessment</a>

            <div className="check-list">
              <div className="check-item">
                <div className="icon-wrap">
                  <iconify-icon icon="lucide:check-circle-2" style={{ fontSize: '20px', color: '#4ade80' }}></iconify-icon>
                </div>
                Free Initial Review
              </div>
              <div className="check-item">
                <div className="icon-wrap">
                  <iconify-icon icon="lucide:check-circle-2" style={{ fontSize: '20px', color: '#4ade80' }}></iconify-icon>
                </div>
                Dedicated Case Manager
              </div>
              <div className="check-item">
                <div className="icon-wrap">
                  <iconify-icon icon="lucide:check-circle-2" style={{ fontSize: '20px', color: '#4ade80' }}></iconify-icon>
                </div>
                Highest Success Rates
              </div>
            </div>
          </div>
        </section>

        <section className="section-soft-bg">
          <div className="container">
            <h2 className="section-title">Why Choose Pipcoin?</h2>
            <p className="section-subtitle">
              Our specialized methodology ensures the strongest possible foundation for your claim.
            </p>

            <div className="grid-3">
              <div className="card">
                <div className="card-icon">
                  <div className="icon-wrap icon-wrap-lg">
                    <iconify-icon icon="lucide:files" style={{ fontSize: '28px', color: 'var(--primary)' }}></iconify-icon>
                  </div>
                </div>
                <h3 className="card-title">Full Evidence Building</h3>
                <p className="card-text">Collecting and organizing crucial medical documentation to build a robust foundation for maximum success.</p>
              </div>
              <div className="card">
                <div className="card-icon">
                  <div className="icon-wrap icon-wrap-lg">
                    <iconify-icon icon="lucide:clipboard-edit" style={{ fontSize: '28px', color: 'var(--primary)' }}></iconify-icon>
                  </div>
                </div>
                <h3 className="card-title">Expert Application Prep</h3>
                <p className="card-text">Meticulously aligning your forms and statements with specific PIP scoring criteria used by assessors.</p>
              </div>
              <div className="card">
                <div className="card-icon">
                  <div className="icon-wrap icon-wrap-lg">
                    <iconify-icon icon="lucide:gavel" style={{ fontSize: '28px', color: 'var(--primary)' }}></iconify-icon>
                  </div>
                </div>
                <h3 className="card-title">Tribunal Representation</h3>
                <p className="card-text">Professional advocacy and steadfast support through the appeals process if your initial claim is rejected.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">A clear, guided path to securing your personal independence payment.</p>

            <div className="grid-4">
              <div>
                <div className="step-number">1</div>
                <h3 className="step-title">Free Eligibility Assessment</h3>
                <p className="card-text">Complete our quick initial screening to determine the viability of your PIP claim.</p>
              </div>
              <div>
                <div className="step-number">2</div>
                <h3 className="step-title">Comprehensive Evidence Gathering</h3>
                <p className="card-text">We handle the complex process of sourcing medical records and statements.</p>
              </div>
              <div>
                <div className="step-number">3</div>
                <h3 className="step-title">Application Submission</h3>
                <p className="card-text">Our experts draft and submit your application tailored to DWP scoring criteria.</p>
              </div>
              <div>
                <div className="step-number">4</div>
                <h3 className="step-title">Award &amp; Support</h3>
                <p className="card-text">Receive your decision. We stand by you for any mandatory reconsiderations.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="assessment" className="form-section">
          <div className="container">
            <div className="form-wrapper">
              {isSuccess ? (
                <div className="success-state">
                  <h2 className="success-title">Thank you. Your assessment details were submitted.</h2>
                  <p className="card-text">A Pipcoin specialist will review your information and contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                  </div>

                  <div className="form-header">
                    <span className="form-step-text">Step {step} of 3</span>
                    <h2 className="form-title">{step === 1 ? 'Tell us about yourself' : step === 2 ? 'Your household and driving details' : 'Final assessment details'}</h2>
                    <p className="form-subtitle">This helps us evaluate your eligibility quickly and accurately.</p>
                  </div>

                  <div className="form-group consent-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.consentSensitiveData}
                        onChange={(event) => handleConsentChange(event.target.checked)}
                      />
                      Consent to process sensitive data
                    </label>
                  </div>

                  {step === 1 && (
                    <>
                      <div className="form-group">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input
                          id="name"
                          className="form-control"
                          type="text"
                          value={formData.name}
                          onChange={(event) => handleTextChange('name', event.target.value)}
                          onBlur={(event) => handleTextBlur('name', event.target.value)}
                          placeholder="e.g. John Doe"
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="emailAddress">Email Address</label>
                          <input
                            id="emailAddress"
                            className="form-control"
                            type="email"
                            value={formData.emailAddress}
                            onChange={(event) => handleTextChange('emailAddress', event.target.value)}
                            onBlur={(event) => handleTextBlur('emailAddress', event.target.value)}
                            placeholder="john.doe@example.com"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="mobileNumber">Mobile Number</label>
                          <input
                            id="mobileNumber"
                            className="form-control"
                            type="tel"
                            value={formData.mobileNumber}
                            onChange={(event) => handleTextChange('mobileNumber', event.target.value)}
                            onBlur={(event) => handleTextBlur('mobileNumber', event.target.value)}
                            placeholder="e.g. 07123 456789"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="maritalStatus">Marital Status</label>
                          <select
                            id="maritalStatus"
                            className="form-control"
                            value={formData.maritalStatus}
                            onChange={(event) => handleSelectChange('maritalStatus', event.target.value)}
                          >
                            <option value="">Select status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="benefitClaiming">Benefit Claiming</label>
                          <select
                            id="benefitClaiming"
                            className="form-control"
                            value={formData.benefitClaiming}
                            onChange={(event) => handleSelectChange('benefitClaiming', event.target.value)}
                          >
                            <option value="">Yes / No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="benefitType">Which benefit do you claim</label>
                        <input
                          id="benefitType"
                          className="form-control"
                          type="text"
                          value={formData.benefitType}
                          onChange={(event) => handleTextChange('benefitType', event.target.value)}
                          onBlur={(event) => handleTextBlur('benefitType', event.target.value)}
                          placeholder="e.g. PIP, Universal Credit"
                        />
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="doYouDrive">Do you drive</label>
                          <select
                            id="doYouDrive"
                            className="form-control"
                            value={formData.doYouDrive}
                            onChange={(event) => handleSelectChange('doYouDrive', event.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="validDrivingLicence">Do you have a valid driving licence</label>
                          <select
                            id="validDrivingLicence"
                            className="form-control"
                            value={formData.validDrivingLicence}
                            onChange={(event) => handleSelectChange('validDrivingLicence', event.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="housingBenefit">Are you in receipt of housing benefit</label>
                          <select
                            id="housingBenefit"
                            className="form-control"
                            value={formData.housingBenefit}
                            onChange={(event) => handleSelectChange('housingBenefit', event.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="currentAddressDuration">How long have you been at your current address</label>
                          <select
                            id="currentAddressDuration"
                            className="form-control"
                            value={formData.currentAddressDuration}
                            onChange={(event) => handleSelectChange('currentAddressDuration', event.target.value)}
                          >
                            <option value="">Select duration</option>
                            <option value="Less than 1 year">Less than 1 year</option>
                            <option value="1-3 years">1-3 years</option>
                            <option value="3-5 years">3-5 years</option>
                            <option value="5+ years">5+ years</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="dependentsCount">How many dependents do you have</label>
                          <input
                            id="dependentsCount"
                            className="form-control"
                            type="number"
                            min="0"
                            value={formData.dependentsCount}
                            onChange={(event) => handleTextChange('dependentsCount', event.target.value)}
                            onBlur={(event) => handleTextBlur('dependentsCount', event.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="kidsAge">Age of kids</label>
                          <input
                            id="kidsAge"
                            className="form-control"
                            type="text"
                            value={formData.kidsAge}
                            onChange={(event) => handleTextChange('kidsAge', event.target.value)}
                            onBlur={(event) => handleTextBlur('kidsAge', event.target.value)}
                            placeholder="e.g. 7, 10"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="form-group">
                        <label className="form-label" htmlFor="disabilities">What are your disabilities</label>
                        <textarea
                          id="disabilities"
                          className="form-control form-textarea"
                          value={formData.disabilities}
                          onChange={(event) => handleTextChange('disabilities', event.target.value)}
                          onBlur={(event) => handleTextBlur('disabilities', event.target.value)}
                          placeholder="Briefly describe your main conditions..."
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="kidsDisabilities">What are your kids' disabilities</label>
                        <textarea
                          id="kidsDisabilities"
                          className="form-control form-textarea"
                          value={formData.kidsDisabilities}
                          onChange={(event) => handleTextChange('kidsDisabilities', event.target.value)}
                          onBlur={(event) => handleTextBlur('kidsDisabilities', event.target.value)}
                          placeholder="If applicable, include a short summary..."
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="domesticViolenceVictim">Have you been a victim of domestic violence</label>
                        <select
                          id="domesticViolenceVictim"
                          className="form-control"
                          value={formData.domesticViolenceVictim}
                          onChange={(event) => handleSelectChange('domesticViolenceVictim', event.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>

                      {submitError && <p className="error-text">{submitError}</p>}
                    </>
                  )}

                  <div className="form-actions">
                    {step > 1 && (
                      <button type="button" className="btn btn-outline" onClick={previousStep}>
                        Back
                      </button>
                    )}

                    {step < 3 ? (
                      <button type="button" className="btn btn-primary btn-next" onClick={nextStep}>
                        Continue to Next Step
                        <div className="icon-wrap icon-arrow">
                          <iconify-icon icon="lucide:arrow-right" style={{ fontSize: '18px', color: 'var(--primary-foreground)' }}></iconify-icon>
                        </div>
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary btn-next" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p className="footer-text">© 2026 UpSizer/Pipcoin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default DesktopLayout
