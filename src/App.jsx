import { useMemo, useState } from 'react'
import logo from './pipcoin-logo.svg'
import { trackField, updateLastField } from './hubspotTracking'
import { submitContactToHubSpot } from './hubspotContactsAPI'
import PrivacyPolicyPage from './PrivacyPolicyPage'

const SENSITIVE_FIELDS = new Set([
  'hasDisability',
  'disabilities',
  'hasKidsDisability',
  'kidsDisabilities',
  'domesticViolenceVictim',
])

const initialFormData = {
  consentSensitiveData: false,
  firstName: '',
  lastName: '',
  emailAddress: '',
  maritalStatus: '',
  mobileNumber: '',
  benefitClaiming: '',
  benefitType: '',
  hasDisability: '',
  hasKidsDisability: '',
  housingBenefit: '',
  dependentsCount: '',
  disabilities: '',
  kidsDisabilities: '',
  domesticViolenceVictim: '',
  currentAddressDuration: '',
  validDrivingLicence: '',
}

function App() {
  const isPrivacyPolicyPage = window.location.pathname.replace(/\/$/, '') === '/privacy-policy'
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const progressPercent = useMemo(() => (step / 3) * 100, [step])

  const shouldTrackField = (fieldName) => {
    if (!SENSITIVE_FIELDS.has(fieldName)) {
      return true
    }

    return formData.consentSensitiveData
  }

  const emitTracking = (fieldName, value) => {
    if (!shouldTrackField(fieldName)) {
      return
    }

    trackField(fieldName, value)
    updateLastField(fieldName)
  }

  const handleTextChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
  }

  const handleTextBlur = (fieldName, value) => {
    emitTracking(fieldName, value)
  }

  const handleSelectChange = (fieldName, value) => {
    setFormData((prev) => {
      const nextState = { ...prev, [fieldName]: value }

      if (fieldName === 'hasDisability' && value === 'no') {
        nextState.disabilities = ''
      }

      if (fieldName === 'hasKidsDisability' && value === 'no') {
        nextState.kidsDisabilities = ''
      }

      if (fieldName === 'benefitClaiming' && value === 'no') {
        nextState.benefitType = ''
      }

      return nextState
    })

    emitTracking(fieldName, value)
  }

  const handleConsentChange = (checked) => {
    setFormData((prev) => ({ ...prev, consentSensitiveData: checked }))
    emitTracking('consentSensitiveData', checked)
  }

  if (isPrivacyPolicyPage) {
    return <PrivacyPolicyPage />
  }

  const hasValue = (value) => String(value ?? '').trim().length > 0

  const getStepValidationErrors = (targetStep) => {
    const errors = []

    if (targetStep === 1) {
      if (!formData.consentSensitiveData) errors.push('Consent to process sensitive data as per our Privacy Policy')
      if (!hasValue(formData.firstName)) errors.push('First Name')
      if (!hasValue(formData.lastName)) errors.push('Last Name')
      if (!hasValue(formData.emailAddress)) errors.push('Email')
      if (!hasValue(formData.mobileNumber)) errors.push('Phone Number')
      if (!hasValue(formData.maritalStatus)) errors.push('Marital Status')
      if (!hasValue(formData.benefitClaiming)) errors.push('Benefit claiming')
      if (formData.benefitClaiming === 'yes' && !hasValue(formData.benefitType)) {
        errors.push('Which benefit do you claim')
      }
    }

    if (targetStep === 2) {
      if (!hasValue(formData.validDrivingLicence)) errors.push('Driving licence')
      if (!hasValue(formData.housingBenefit)) errors.push('Housing benefit')
      if (!hasValue(formData.dependentsCount)) errors.push('Number of dependents')
      if (!hasValue(formData.currentAddressDuration)) errors.push('Current address duration')
    }

    if (targetStep === 3) {
      if (!hasValue(formData.hasDisability)) errors.push('Disabilities (Yes/No)')
      if (!hasValue(formData.hasKidsDisability)) errors.push("Kid's Disabilities (Yes/No)")
      if (!hasValue(formData.domesticViolenceVictim)) errors.push('Domestic violence victim')

      if (formData.hasDisability === 'yes' && !hasValue(formData.disabilities)) {
        errors.push('Disabilities details')
      }

      if (formData.hasKidsDisability === 'yes' && !hasValue(formData.kidsDisabilities)) {
        errors.push("Kid's Disabilities details")
      }
    }

    return errors
  }

  const validateStep = (targetStep) => {
    const errors = getStepValidationErrors(targetStep)

    if (errors.length === 0) {
      setSubmitError('')
      return true
    }

    setSubmitError(`Please complete: ${errors.join(', ')}`)
    return false
  }

  const validateAllSteps = () => {
    const errors = [
      ...getStepValidationErrors(1),
      ...getStepValidationErrors(2),
      ...getStepValidationErrors(3),
    ]

    if (errors.length === 0) {
      setSubmitError('')
      return true
    }

    setSubmitError(`Please complete: ${errors.join(', ')}`)
    return false
  }

  const nextStep = () => {
    if (!validateStep(step)) {
      return
    }

    setStep((prev) => Math.min(prev + 1, 3))
  }

  const previousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSubmitError('')
    setIsSubmitting(true)

    try {
      if (!validateAllSteps()) {
        return
      }

      await submitContactToHubSpot(formData)
      setIsSuccess(true)
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitError(error?.message || 'We could not submit your form right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id="top" className="export-wrapper">
      <header>
        <div className="container header-content">
          <div className="logo">
            <img src={logo} alt="Pipcoin Logo" />
          </div>
          <div className="header-actions">
            <a href="#assessment" className="btn btn-primary header-cta">Start Your Assessment</a>
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
              <div className="step-card">
                <div className="step-number">1</div>
                <h3 className="step-title">Free Eligibility Assessment</h3>
                <p className="card-text">Complete our quick initial screening to determine the viability of your PIP claim.</p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h3 className="step-title">Comprehensive Evidence Gathering</h3>
                <p className="card-text">We handle the complex process of sourcing medical records and statements.</p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h3 className="step-title">Application Submission</h3>
                <p className="card-text">Our experts draft and submit your application tailored to DWP scoring criteria.</p>
              </div>
              <div className="step-card">
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

                  {submitError && <p className="error-text">{submitError}</p>}

                  {step === 1 && (
                    <>
                      <div className="form-group consent-group">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={formData.consentSensitiveData}
                            onChange={(event) => handleConsentChange(event.target.checked)}
                          />
                          <span>Consent to process sensitive data as per our</span>
                          <a href="/privacy-policy" className="privacy-policy-link">Privacy Policy</a>
                        </label>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="firstName">First Name</label>
                          <input
                            id="firstName"
                            className="form-control"
                            type="text"
                            value={formData.firstName}
                            onChange={(event) => handleTextChange('firstName', event.target.value)}
                            onBlur={(event) => handleTextBlur('firstName', event.target.value)}
                            placeholder="e.g. John"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="lastName">Last Name</label>
                          <input
                            id="lastName"
                            className="form-control"
                            type="text"
                            value={formData.lastName}
                            onChange={(event) => handleTextChange('lastName', event.target.value)}
                            onBlur={(event) => handleTextBlur('lastName', event.target.value)}
                            placeholder="e.g. Doe"
                          />
                        </div>
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
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
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
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                      </div>

                      {formData.benefitClaiming === 'yes' && (
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
                      )}
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="validDrivingLicence">Do you have a valid driving licence</label>
                          <select
                            id="validDrivingLicence"
                            className="form-control"
                            value={formData.validDrivingLicence}
                            onChange={(event) => handleSelectChange('validDrivingLicence', event.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="expired">Expired</option>
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
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
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
                            <option value="less_than_1_year">Less than 1 year</option>
                            <option value="p_13_years">1-3 years</option>
                            <option value="p_35_years">3-5 years</option>
                            <option value="p_5_years">5+ years</option>
                          </select>
                        </div>
                      </div>

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
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="form-group">
                        <label className="form-label" htmlFor="hasDisability">Do you have a disability?</label>
                        <select
                          id="hasDisability"
                          className="form-control"
                          value={formData.hasDisability}
                          onChange={(event) => handleSelectChange('hasDisability', event.target.value)}
                        >
                          <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                      </div>

                      {formData.hasDisability === 'yes' && (
                        <div className="form-group">
                          <label className="form-label" htmlFor="disabilities">Please explain your disability</label>
                          <textarea
                            id="disabilities"
                            className="form-control form-textarea"
                            value={formData.disabilities}
                            onChange={(event) => handleTextChange('disabilities', event.target.value)}
                            onBlur={(event) => handleTextBlur('disabilities', event.target.value)}
                            placeholder="Briefly describe your main conditions..."
                          ></textarea>
                        </div>
                      )}

                      <div className="form-group">
                        <label className="form-label" htmlFor="hasKidsDisability">Do your kids have a disability?</label>
                        <select
                          id="hasKidsDisability"
                          className="form-control"
                          value={formData.hasKidsDisability}
                          onChange={(event) => handleSelectChange('hasKidsDisability', event.target.value)}
                        >
                          <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                      </div>

                      {formData.hasKidsDisability === 'yes' && (
                        <div className="form-group">
                          <label className="form-label" htmlFor="kidsDisabilities">Please explain your kids' disabilities</label>
                          <textarea
                            id="kidsDisabilities"
                            className="form-control form-textarea"
                            value={formData.kidsDisabilities}
                            onChange={(event) => handleTextChange('kidsDisabilities', event.target.value)}
                            onBlur={(event) => handleTextBlur('kidsDisabilities', event.target.value)}
                            placeholder="If applicable, include a short summary..."
                          ></textarea>
                        </div>
                      )}

                      <div className="form-group">
                        <label className="form-label" htmlFor="domesticViolenceVictim">Have you been a victim of domestic violence</label>
                        <select
                          id="domesticViolenceVictim"
                          className="form-control"
                          value={formData.domesticViolenceVictim}
                          onChange={(event) => handleSelectChange('domesticViolenceVictim', event.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                          <option value="prefer_not_to_say">Prefer not to say</option>
                        </select>
                      </div>
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

export default App
