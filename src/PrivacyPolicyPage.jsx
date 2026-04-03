import logo from './pipcoin-logo.svg'

function PrivacyPolicyPage() {
  return (
    <div className="export-wrapper">
      <header>
        <div className="container header-content">
          <div className="logo">
            <img src={logo} alt="Pipcoin Logo" />
          </div>
          <div className="header-actions">
            <a href="/" className="btn btn-primary header-cta">Back to Home</a>
          </div>
        </div>
      </header>

      <main>
        <section className="privacy-section">
          <div className="container">
            <div className="privacy-hero">
              <p className="privacy-eyebrow">Privacy Policy</p>
              <h1 className="privacy-page-title">How we use and process sensitive data</h1>
              <p className="section-subtitle privacy-subtitle">
                This page explains, in plain language, what happens to the information you share with us, why we ask for it, and how we protect it.
              </p>
              <div className="privacy-actions">
                <a href="/#assessment" className="btn btn-primary">Go to Assessment</a>
                <a href="/" className="btn btn-outline">Back to Home</a>
              </div>
            </div>

            <article className="privacy-article">
              <section className="privacy-copy-block">
                <h2 className="privacy-section-heading">What information we ask for</h2>
                <p>
                  When you start an assessment, we ask for the basic details we need to understand your situation and contact you about your case. That includes your name, email address, phone number, household details, and any information you choose to share about your health, disability, benefits, or other personal circumstances.
                </p>
                <p>
                  We only ask for information that helps us do the job properly. If you do not want to share certain details, you can choose not to, although in some cases that may limit the support we are able to give.
                </p>
              </section>

              <section className="privacy-copy-block">
                <h2 className="privacy-section-heading">Why we use sensitive data</h2>
                <p>
                  Sensitive information is used so we can review your eligibility, understand the areas where you need support, and help prepare your assessment or claim accurately. In practical terms, it allows us to give you advice that is relevant to your circumstances instead of offering generic guidance.
                </p>
                <p>
                  We only process this information when you have given consent, and we use it strictly for the purpose of handling your enquiry, managing your assessment, and providing the services you asked us for.
                </p>
              </section>

              <section className="privacy-copy-block">
                <h2 className="privacy-section-heading">How we keep it safe</h2>
                <p>
                  Your details are held securely in cloud-based systems that are protected with access controls and other security measures. Only authorised people who need to work on your case can access the information.
                </p>
                <p>
                  We take data security seriously and work to make sure your information is stored and handled in a way that is appropriate for sensitive personal data.
                </p>
              </section>

              <section className="privacy-copy-block">
                <h2 className="privacy-section-heading">Sharing information</h2>
                <p>
                  We do not share your details with any third parties. Your information stays within our secure systems and is used only by our team to support your assessment and any related service you have requested.
                </p>
                <p>
                  If we ever need to change the way we handle your information, we will update this policy so you can see exactly what is happening.
                </p>
              </section>

              <section className="privacy-copy-block">
                <h2 className="privacy-section-heading">How long we keep it</h2>
                <p>
                  We keep your information only for as long as we need it for the purpose it was collected. After that, we delete it or anonymise it where appropriate, subject to any legal or operational obligations we must follow.
                </p>
              </section>

              <section className="privacy-copy-block privacy-copy-block-end">
                <h2 className="privacy-section-heading">Your choices</h2>
                <p>
                  If you want to ask about the information we hold, correct something that is inaccurate, or understand more about how your data is being used, you can contact us through the assessment process. We will help as far as we reasonably can.
                </p>
              </section>
            </article>
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

export default PrivacyPolicyPage