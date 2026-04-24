import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "terms of service — viberater",
  description: "the rules that govern your use of VibeRater.",
};

const st = {
  section: { marginBottom: 48 } as React.CSSProperties,
  h2: { fontSize: 32, fontWeight: 600, marginBottom: 12, color: "var(--fg-0)", paddingBottom: 8, borderBottom: "1px solid var(--fg-4)" } as React.CSSProperties,
  h3: { fontSize: 24, fontWeight: 600, marginTop: 24, marginBottom: 8, color: "var(--fg-1)" } as React.CSSProperties,
  h4: { fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 8, color: "var(--fg-0)" } as React.CSSProperties,
  p: { marginBottom: 12, color: "var(--fg-1)", lineHeight: 1.65 } as React.CSSProperties,
  ul: { marginLeft: 32, marginBottom: 12 } as React.CSSProperties,
  li: { marginBottom: 8, color: "var(--fg-1)", lineHeight: 1.65 } as React.CSSProperties,
  lime: { color: "var(--lime)" } as React.CSSProperties,
  limeSemi: { color: "var(--lime)", fontWeight: 600 } as React.CSSProperties,
  versionInfo: { background: "var(--bg-elev-1)", padding: "12px 16px", borderRadius: 8, marginBottom: 24, fontSize: 13, color: "var(--fg-2)", border: "1px solid var(--fg-4)" } as React.CSSProperties,
  toc: { background: "var(--bg-elev-1)", borderLeft: "3px solid var(--lime)", padding: 16, marginBottom: 24, borderRadius: 8 } as React.CSSProperties,
  tocH2: { fontSize: 24, fontWeight: 600, color: "var(--fg-0)", marginBottom: 12 } as React.CSSProperties,
  warningBox: { background: "var(--bg-elev-1)", borderLeft: "3px solid var(--coral)", padding: 16, borderRadius: 8, margin: "16px 0" } as React.CSSProperties,
  warningH4: { color: "var(--coral)", fontSize: 20, fontWeight: 600, marginBottom: 8 } as React.CSSProperties,
  contactBox: { background: "var(--bg-elev-2)", color: "var(--fg-0)", padding: 32, borderRadius: 20, marginTop: 24, textAlign: "center" as const, border: "1px solid var(--fg-4)" } as React.CSSProperties,
  contactH3: { color: "var(--lime)", fontSize: 24, fontWeight: 600, marginBottom: 8 } as React.CSSProperties,
  table: { width: "100%", borderCollapse: "collapse" as const, margin: "16px 0", fontSize: 13 } as React.CSSProperties,
  th: { background: "var(--bg-elev-2)", color: "var(--lime)", padding: 12, textAlign: "left" as const, fontWeight: 600, borderBottom: "1px solid var(--fg-4)" } as React.CSSProperties,
  td: { padding: 12, borderBottom: "1px solid var(--fg-5)", color: "var(--fg-1)" } as React.CSSProperties,
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: 56, background: "var(--bg)", minHeight: "100vh" }}>
        {/* Page hero */}
        <div style={{ background: "var(--bg-elev-1)", borderBottom: "1px solid var(--fg-4)", padding: "48px 24px", textAlign: "center" }}>
          <h1 style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--lime)", marginBottom: 8, fontFamily: "var(--font-display)" }}>
            terms of service
          </h1>
          <p style={{ fontSize: 17, color: "var(--fg-2)" }}>
            the rules that govern your use of VibeRater.
          </p>
        </div>

        <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
          {/* Version info */}
          <div style={st.versionInfo}>
            <strong style={st.limeSemi}>Version 1.0, April 24, 2026</strong><br />
            Last updated: April 24, 2026 | First version released at launch
          </div>

          {/* Warning */}
          <div style={st.warningBox}>
            <h4 style={st.warningH4}>Important Notice</h4>
            <p style={{ ...st.p, marginBottom: 0 }}>
              By using VibeRater, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you must not use VibeRater. Please read both documents carefully before using our app.
            </p>
          </div>

          {/* Table of contents */}
          <div style={st.toc}>
            <h2 style={st.tocH2}>contents</h2>
            <ol style={{ paddingLeft: 24, marginBottom: 0, columns: 2, columnGap: 32 } as React.CSSProperties}>
              {[
                ["#introduction", "Introduction"],
                ["#account", "Creating Your Account"],
                ["#acceptable-use", "Acceptable Use Policy"],
                ["#content", "Your Content (Vibe Ratings)"],
                ["#intellectual-property", "Our Intellectual Property"],
                ["#public-platform", "Public Platform & Data Use"],
                ["#termination", "Suspension & Termination"],
                ["#disclaimers", "Disclaimers & Liability"],
                ["#dispute-resolution", "Dispute Resolution"],
                ["#changes", "Changes to These Terms"],
                ["#contact", "Contact Us"],
              ].map(([href, label]) => (
                <li key={href} style={{ marginBottom: 8, breakInside: "avoid" } as React.CSSProperties}>
                  <a href={href} style={{ color: "var(--lime)", textDecoration: "none" }}>{label}</a>
                </li>
              ))}
            </ol>
          </div>

          {/* Section 1 */}
          <section id="introduction" style={st.section}>
            <h2 style={st.h2}><span style={st.lime}>1.</span> Introduction</h2>
            <p style={st.p}>Welcome to VibeRater. These Terms of Service are a binding contract between you and VibeRater Inc. By using VibeRater, you agree to be bound by these Terms.</p>

            <h3 style={st.h3}>What is VibeRater?</h3>
            <p style={st.p}>VibeRater is a mobile app that allows you to rate and discover the vibe (atmosphere, energy, feeling) of third spaces like cafes, bars, and coworking spaces. You rate venues using descriptive vibe tags and crowd level descriptions. Our platform is open to everyone, built on transparency, and designed to help people find spaces that match the vibe they&apos;re looking for.</p>

            <h3 style={st.h3}>Related Documents</h3>
            <p style={st.p}>These Terms include and reference our Privacy Policy and Community Guidelines, which are incorporated by reference.</p>
          </section>

          {/* Section 2 */}
          <section id="account" style={st.section}>
            <h2 style={st.h2}><span style={st.lime}>2.</span> Creating Your Account</h2>

            <h3 style={st.h3}>Age Requirement</h3>
            <p style={st.p}>VibeRater is recommended for users 18 years and older. While we do not require age verification, we strongly recommend that only adults use VibeRater. By creating an account, you represent that you are 18 years or older, or that you have obtained parental consent to use VibeRater.</p>

            <h3 style={st.h3}>Account Creation</h3>
            <p style={st.p}>You can sign up using Google, Apple, email, or Facebook. You may only create one account per person.</p>

            <h3 style={st.h3}>Your Username</h3>
            <p style={st.p}>Your username must not contain anything harmful, hateful, discriminatory, defamatory, or illegal, and must not impersonate another person.</p>

            <h3 style={st.h3}>Your Responsibilities</h3>
            <p style={st.p}>You are solely responsible for keeping your password confidential, notifying us of unauthorized access, maintaining accurate account information, and all activity on your account.</p>
          </section>

          {/* Section 3 */}
          <section id="acceptable-use" style={st.section}>
            <h2 style={st.h2}><span style={st.lime}>3.</span> Acceptable Use Policy</h2>
            <p style={st.p}>When using VibeRater, you agree not to:</p>

            <h3 style={st.h3}>Prohibited Behavior</h3>
            <ul style={st.ul}>
              {[
                "Submit fake ratings that don't reflect your genuine experience",
                "Manipulate the system or artificially inflate/deflate ratings",
                "Engage in harassment, bullying, or abuse",
                "Use bots or automation for fake ratings",
                "Attempt to hack or compromise VibeRater",
                "Submit spam or marketing content",
                "Copy or scrape VibeRater content",
                "Train AI models on our data without permission",
              ].map((item) => (
                <li key={item} style={st.li}>{item}</li>
              ))}
            </ul>

            <h3 style={st.h3}>Enforcement</h3>
            <p style={st.p}>If we detect violations, we may remove your rating, suspend your account, or permanently terminate it.</p>
          </section>

          {/* Section 4 */}
          <section id="content" style={st.section}>
            <h2 style={st.h2}><span style={st.lime}>4.</span> Your Content (Vibe Ratings)</h2>

            <h3 style={st.h3}>You Own Your Ratings</h3>
            <p style={st.p}>You own all vibe ratings and other content you submit. By submitting content, you grant VibeRater a worldwide license to use, reproduce, distribute, and display your content.</p>

            <h3 style={st.h3}>Permanence of Public Content</h3>
            <p style={st.p}><strong style={st.limeSemi}>Important:</strong> Because VibeRater is an open platform, vibe ratings are public by default and may be indexed by search engines, accessed by AI systems, and used by third parties. Even after you delete your account, your ratings may remain visible.</p>
          </section>

          {/* Section 5 */}
          <section id="intellectual-property" style={st.section}>
            <h2 style={st.h2}><span style={st.lime}>5.</span> Our Intellectual Property</h2>
            <p style={st.p}>VibeRater and all content on our platform (except Your Content) are owned by VibeRater Inc. You agree not to copy, reverse engineer, or use our intellectual property without permission.</p>
          </section>

          {/* Section 6 */}
          <section id="public-platform" style={st.section}>
            <h2 style={st.h2}><span style={st.lime}>6.</span> Public Platform & Data Use</h2>
            <p style={st.p}>VibeRater is an open platform where vibe ratings are shared with search engines, AI systems, analytics platforms, and venue partners (aggregated data only). You can opt out of AI indexing by emailing <strong style={st.limeSemi}>privacy@getviberater.co</strong>.</p>
          </section>

          {/* Section 7 */}
          <section id="termination" style={st.section}>
            <h2 style={st.h2}><span style={st.lime}>7.</span> Suspension & Termination</h2>

            <h3 style={st.h3}>VibeRater&apos;s Right to Terminate</h3>
            <p style={st.p}>We may suspend or terminate your account if you violate these Terms, submit fake ratings, engage in abusive behavior, attempt to manipulate the system, or violate applicable laws.</p>

            <h3 style={st.h3}>Your Right to Delete Your Account</h3>
            <p style={st.p}>You can delete your account at any time. Your profile information is deleted within 30 days, but your vibe ratings may remain visible as part of the open platform.</p>
          </section>

          {/* Section 8 */}
          <section id="disclaimers" style={st.section}>
            <h2 style={st.h2}><span style={st.lime}>8.</span> Disclaimers & Liability</h2>

            <h3 style={st.h3}>No Warranty</h3>
            <p style={st.p}>VibeRater is provided &quot;AS IS&quot; without warranties of accuracy, reliability, or fitness for any particular purpose.</p>

            <h3 style={st.h3}>Limitations on Liability</h3>
            <p style={st.p}>To the extent permitted by law, we are not liable for indirect, incidental, or consequential damages, and our total liability is limited to $100 USD.</p>

            <h3 style={st.h3}>Indemnification</h3>
            <p style={st.p}>You agree to indemnify VibeRater from claims arising from your use of the app, violation of these Terms, or infringement of third-party rights.</p>
          </section>

          {/* Section 9 */}
          <section id="dispute-resolution" style={st.section}>
            <h2 style={st.h2}><span style={st.lime}>9.</span> Dispute Resolution</h2>

            <h3 style={st.h3}>Informal Resolution</h3>
            <p style={st.p}>If you have a dispute, contact our support team first at <strong style={st.limeSemi}>support@getviberater.co</strong>.</p>

            <h3 style={st.h3}>Governing Law</h3>
            <p style={st.p}>These Terms are governed by the laws of the State of New York, USA.</p>

            <h3 style={st.h3}>Jurisdiction</h3>
            <p style={st.p}>You agree that any legal action must be brought exclusively in New York courts.</p>
          </section>

          {/* Section 10 */}
          <section id="changes" style={st.section}>
            <h2 style={st.h2}><span style={st.lime}>10.</span> Changes to These Terms</h2>
            <p style={st.p}>We may change these Terms at any time. Your continued use of VibeRater indicates your acceptance of updated Terms.</p>
          </section>

          {/* Section 11 */}
          <section id="contact" style={st.section}>
            <h2 style={st.h2}><span style={st.lime}>11.</span> Contact Us</h2>
            <div style={st.contactBox}>
              <h3 style={st.contactH3}>VibeRater Support</h3>
              <p style={st.p}>Email: <a href="mailto:support@getviberater.co" style={{ color: "var(--lime)", textDecoration: "none" }}>support@getviberater.co</a></p>
              <p style={st.p}>Legal: <a href="mailto:legal@getviberater.co" style={{ color: "var(--lime)", textDecoration: "none" }}>legal@getviberater.co</a></p>
              <p style={st.p}>Website: <a href="https://getviberater.co" style={{ color: "var(--lime)", textDecoration: "none" }}>getviberater.co</a></p>
              <p style={{ ...st.p, marginTop: 16, fontSize: 13, marginBottom: 0 }}>We typically respond within 5 business days</p>
            </div>
          </section>

          {/* Version history */}
          <section style={st.section}>
            <h2 style={st.h2}>Version History</h2>
            <p style={st.p}>This is the first version of VibeRater&apos;s Terms of Service, released upon initial platform launch.</p>
            <table style={st.table}>
              <thead>
                <tr>
                  <th scope="col" style={st.th}>Version</th>
                  <th scope="col" style={st.th}>Date</th>
                  <th scope="col" style={st.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={st.td}><strong style={st.limeSemi}>1.0</strong></td>
                  <td style={st.td}>April 24, 2026</td>
                  <td style={st.td}>Initial release (first version)</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Closing */}
          <section>
            <p style={{ textAlign: "center", marginTop: 48, color: "var(--fg-2)" }}>
              <strong style={st.limeSemi}>know the vibe before you come inside.</strong><br />
              respect the community that makes VibeRater possible.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
