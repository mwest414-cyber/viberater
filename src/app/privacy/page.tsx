import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "privacy policy — viberater",
  description: "know how we protect your vibe data.",
};

const st = {
  section: { marginBottom: 48 } as React.CSSProperties,
  h2: { fontSize: 32, fontWeight: 600, marginBottom: 12, color: "var(--fg-0)", paddingBottom: 8, borderBottom: "1px solid var(--fg-4)" } as React.CSSProperties,
  h3: { fontSize: 24, fontWeight: 600, marginTop: 24, marginBottom: 8, color: "var(--fg-1)" } as React.CSSProperties,
  h4lime: { fontSize: 20, fontWeight: 600, marginTop: 12, marginBottom: 8, color: "var(--lime)" } as React.CSSProperties,
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
  dataSection: { background: "var(--bg-elev-1)", padding: 16, borderRadius: 12, marginBottom: 16, border: "1px solid var(--fg-4)" } as React.CSSProperties,
  dataType: { marginBottom: 16 } as React.CSSProperties,
  contactBox: { background: "var(--bg-elev-2)", color: "var(--fg-0)", padding: 32, borderRadius: 20, marginTop: 24, textAlign: "center" as const, border: "1px solid var(--fg-4)" } as React.CSSProperties,
  contactH3: { color: "var(--lime)", fontSize: 24, fontWeight: 600, marginBottom: 8 } as React.CSSProperties,
  table: { width: "100%", borderCollapse: "collapse" as const, margin: "16px 0", fontSize: 13 } as React.CSSProperties,
  th: { background: "var(--bg-elev-2)", color: "var(--lime)", padding: 12, textAlign: "left" as const, fontWeight: 600, borderBottom: "1px solid var(--fg-4)" } as React.CSSProperties,
  td: { padding: 12, borderBottom: "1px solid var(--fg-5)", color: "var(--fg-1)" } as React.CSSProperties,
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: 56, background: "var(--bg)", minHeight: "100vh" }}>
        {/* Page hero */}
        <div style={{ background: "var(--bg-elev-1)", borderBottom: "1px solid var(--fg-4)", padding: "48px 24px", textAlign: "center" }}>
          <h1 style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--lime)", marginBottom: 8, fontFamily: "var(--font-display)" }}>
            privacy policy
          </h1>
          <p style={{ fontSize: 17, color: "var(--fg-2)" }}>
            know how we protect your vibe data.
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
              By using VibeRater, you agree to be bound by this Privacy Policy. If you do not agree, you must not use VibeRater. Please read this document carefully before using our app.
            </p>
          </div>

          {/* Table of contents */}
          <div style={st.toc}>
            <h2 style={st.tocH2}>contents</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, columns: 2, columnGap: 32 } as React.CSSProperties}>
              {[
                ["#introduction", "1. Introduction"],
                ["#open-platform", "2. VibeRater is an Open Platform"],
                ["#data-collection", "3. What Data We Collect"],
                ["#public-private", "4. Public vs. Private Data"],
                ["#how-we-use", "5. How We Use Your Data"],
                ["#data-sharing", "6. How We Share Your Data"],
                ["#ai-systems", "7. AI & Search Engine Access"],
                ["#data-security", "8. Data Security"],
                ["#user-rights", "9. Your Rights & Choices"],
                ["#retention", "10. Data Retention"],
                ["#gdpr", "11. Notice for European Users"],
                ["#age", "12. Age Recommendation"],
                ["#contact", "13. Contact Us"],
              ].map(([href, label]) => (
                <li key={href} style={{ marginBottom: 8, breakInside: "avoid" } as React.CSSProperties}>
                  <a href={href} style={{ color: "var(--lime)", textDecoration: "none" }}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 1 */}
          <section id="introduction" style={st.section}>
            <h2 style={st.h2}>1. Introduction</h2>
            <p style={st.p}>Welcome to VibeRater. This Privacy Policy explains what information we collect, how we use it, who we share it with, and what choices you have. By using VibeRater, you agree to the terms of this policy.</p>
            <p style={st.p}>If you have questions, contact us at <strong style={st.limeSemi}>privacy@getviberater.co</strong>.</p>
          </section>

          {/* Section 2 */}
          <section id="open-platform" style={st.section}>
            <h2 style={st.h2}>2. VibeRater is an Open Platform</h2>
            <p style={st.p}><strong style={st.limeSemi}>Important: VibeRater is designed as an open platform.</strong> When you rate a venue&apos;s vibe, that rating and your profile become publicly visible to anyone who visits VibeRater, including search engines and AI systems.</p>

            <div style={st.warningBox}>
              <h4 style={st.warningH4}>What This Means</h4>
              <ul style={st.ul}>
                <li style={st.li}>Your vibe ratings are <strong style={st.limeSemi}>public by default</strong> and visible to everyone</li>
                <li style={st.li}>Your ratings may appear in Google Search, other search engines, and AI systems like ChatGPT and Gemini</li>
                <li style={st.li}>Third parties may incorporate your vibe ratings into their own products and services</li>
                <li style={st.li}>Even if you delete your account, your ratings may remain visible on VibeRater</li>
              </ul>
            </div>

            <p style={st.p}>We believe transparency about venue vibes serves the public good. Your ratings help people discover spaces with atmospheres that match what they&apos;re looking for. This open approach is core to how VibeRater works.</p>
          </section>

          {/* Section 3 */}
          <section id="data-collection" style={st.section}>
            <h2 style={st.h2}>3. What Data We Collect</h2>

            <h3 style={st.h3}>3.1 Public Data (Visible to Everyone)</h3>
            <p style={st.p}>This information is displayed publicly on VibeRater and may be indexed by search engines and AI systems:</p>
            <div style={st.dataSection}>
              <div style={st.dataType}>
                <h4 style={st.h4lime}>Your Profile</h4>
                <ul style={st.ul}>
                  <li style={st.li}>Username (required)</li>
                  <li style={st.li}>Profile photo (optional)</li>
                  <li style={st.li}>Bio or description (optional)</li>
                </ul>
              </div>
              <div style={st.dataType}>
                <h4 style={st.h4lime}>Your Vibe Ratings</h4>
                <ul style={st.ul}>
                  <li style={st.li}>Venue name and location you rated</li>
                  <li style={st.li}>Vibe descriptors you selected (multi-select tags, e.g., &quot;energetic,&quot; &quot;chill,&quot; &quot;creative&quot;)</li>
                  <li style={st.li}>Crowd level description (e.g., &quot;quiet,&quot; &quot;moderate,&quot; &quot;packed&quot;)</li>
                  <li style={st.li}>Photos or videos (if you submit them)</li>
                  <li style={st.li}>Date you submitted the rating</li>
                </ul>
              </div>
            </div>

            <h3 style={st.h3}>3.2 Private Data (Not Shown Publicly)</h3>
            <p style={st.p}>This information is kept private and not visible to the public:</p>
            <div style={st.dataSection}>
              <div style={st.dataType}>
                <h4 style={st.h4lime}>Account Information</h4>
                <ul style={st.ul}>
                  <li style={st.li}>Email address (required for account recovery)</li>
                  <li style={st.li}>Password (encrypted)</li>
                  <li style={st.li}>Phone number (optional, for account security)</li>
                </ul>
              </div>
              <div style={st.dataType}>
                <h4 style={st.h4lime}>Location Data</h4>
                <ul style={st.ul}>
                  <li style={st.li}>Your precise GPS location (when you grant permission)</li>
                  <li style={st.li}>Venues you&apos;ve visited (even if you don&apos;t rate them)</li>
                  <li style={st.li}>Your search history on the app</li>
                </ul>
              </div>
              <div style={st.dataType}>
                <h4 style={st.h4lime}>Device Information</h4>
                <ul style={st.ul}>
                  <li style={st.li}>Device type and operating system</li>
                  <li style={st.li}>Device ID and advertising ID</li>
                  <li style={st.li}>Browser type and version</li>
                  <li style={st.li}>IP address</li>
                  <li style={st.li}>Screen resolution and device settings</li>
                </ul>
              </div>
              <div style={{ ...st.dataType, marginBottom: 0 }}>
                <h4 style={st.h4lime}>Usage Data</h4>
                <ul style={st.ul}>
                  <li style={st.li}>How you interact with the app (taps, swipes, time spent)</li>
                  <li style={st.li}>Features you use most</li>
                  <li style={st.li}>App crashes and errors</li>
                  <li style={st.li}>Pages or screens you view</li>
                </ul>
              </div>
            </div>

            <h3 style={st.h3}>3.3 Data from Third Parties</h3>
            <p style={st.p}>We may receive data about you from social media platforms (if you link your accounts), Google Maps (venue information and locations), and analytics providers (anonymized usage patterns).</p>
          </section>

          {/* Section 4 */}
          <section id="public-private" style={st.section}>
            <h2 style={st.h2}>4. Public vs. Private Data</h2>
            <p style={st.p}>Understanding the difference is important:</p>
            <table style={st.table}>
              <thead>
                <tr>
                  <th scope="col" style={st.th}>Public Data</th>
                  <th scope="col" style={st.th}>Private Data</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Visible on VibeRater to everyone", "Not shown on VibeRater publicly"],
                  ["Indexed by Google and other search engines", "Not indexed by search engines"],
                  ["May be accessed by AI systems", "Not shared with AI systems"],
                  ["Example: Your vibe ratings", "Example: Your email, password, location"],
                ].map(([pub, priv]) => (
                  <tr key={pub}>
                    <td style={st.td}>{pub}</td>
                    <td style={st.td}>{priv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Section 5 */}
          <section id="how-we-use" style={st.section}>
            <h2 style={st.h2}>5. How We Use Your Data</h2>
            <p style={st.p}>We use your data to provide VibeRater, personalize your experience, communicate with you, improve our services, and comply with legal obligations. This includes showing you relevant venues, storing your vibe ratings, recommending new places based on your preferences, and analyzing how the app is used to fix bugs and add features.</p>
          </section>

          {/* Section 6 */}
          <section id="data-sharing" style={st.section}>
            <h2 style={st.h2}>6. How We Share Your Data</h2>
            <p style={st.p}>Your public vibe ratings are shared with search engines, AI systems, analytics platforms, and venue partners (aggregated data only). We have Data Processing Agreements with all service providers. We do NOT sell your personal data, share your email or password, or use your data for interest-based advertising.</p>
          </section>

          {/* Section 7 */}
          <section id="ai-systems" style={st.section}>
            <h2 style={st.h2}>7. AI & Search Engine Access</h2>
            <p style={st.p}>Because VibeRater is an open platform, your public vibe ratings may be accessed by search engines and AI systems like ChatGPT, Gemini, and Claude for training and responses. You can opt out by emailing <strong style={st.limeSemi}>privacy@getviberater.co</strong>.</p>
          </section>

          {/* Section 8 */}
          <section id="data-security" style={st.section}>
            <h2 style={st.h2}>8. Data Security</h2>
            <p style={st.p}>We protect your data with HTTPS/TLS encryption, encrypted storage, access controls, and regular security audits. No system is 100% secure, but we implement industry-standard protections. If you suspect unauthorized access, contact us immediately.</p>
          </section>

          {/* Section 9 */}
          <section id="user-rights" style={st.section}>
            <h2 style={st.h2}>9. Your Rights & Choices</h2>
            <p style={st.p}>You can access, correct, delete, or port your data. You can control location permissions, opt out of marketing, and limit personalized ads. Email <strong style={st.limeSemi}>privacy@getviberater.co</strong> to exercise these rights, and we&apos;ll respond within 30 days.</p>
          </section>

          {/* Section 10 */}
          <section id="retention" style={st.section}>
            <h2 style={st.h2}>10. Data Retention</h2>
            <p style={st.p}>We retain account data while your account is active (deleted within 30 days), vibe ratings indefinitely (part of the open platform), location data for 90 days, device/usage data for 12 months, and support records for 2 years.</p>
          </section>

          {/* Section 11 */}
          <section id="gdpr" style={st.section}>
            <h2 style={st.h2}>11. Notice for European Users</h2>
            <p style={st.p}>If you&apos;re in the EEA or UK, GDPR applies. We&apos;re the data controller. We process data based on contract, legitimate interests, consent, or legal obligation. You have rights to access, correct, delete, port, restrict, object, and withdraw consent. Email <strong style={st.limeSemi}>privacy@getviberater.co</strong> or lodge a complaint with your local data protection authority.</p>
          </section>

          {/* Section 12 */}
          <section id="age" style={st.section}>
            <h2 style={st.h2}>12. Age Recommendation</h2>
            <p style={st.p}>VibeRater is designed for and recommended for users 18 years and older. While we do not require age verification to create an account, we strongly recommend that only adults use VibeRater.</p>
            <p style={st.p}>If you are under 18, we ask that you do not create an account or use VibeRater. If you are a parent or guardian and discover that your child has created a VibeRater account, please contact us at <strong style={st.limeSemi}>privacy@getviberater.co</strong> and we will help remove the account.</p>
            <p style={st.p}>For users under 13, we do not knowingly collect personal data. If you believe we have collected data from a child under 13, please contact us immediately.</p>
          </section>

          {/* Section 13 */}
          <section id="contact" style={st.section}>
            <h2 style={st.h2}>13. Contact Us</h2>
            <div style={st.contactBox}>
              <h3 style={st.contactH3}>Privacy Team</h3>
              <p style={st.p}>Email: <a href="mailto:privacy@getviberater.co" style={{ color: "var(--lime)", textDecoration: "none" }}>privacy@getviberater.co</a></p>
              <p style={st.p}>Website: <a href="https://getviberater.co" style={{ color: "var(--lime)", textDecoration: "none" }}>getviberater.co</a></p>
              <p style={{ ...st.p, marginTop: 16, fontSize: 13, marginBottom: 0 }}>We typically respond within 5 business days</p>
            </div>
          </section>

          {/* Version history */}
          <section style={st.section}>
            <h2 style={st.h2}>Version History</h2>
            <p style={st.p}>This is the first version of VibeRater&apos;s Privacy Policy, released upon initial platform launch.</p>
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
              and know how we protect your vibe data.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
