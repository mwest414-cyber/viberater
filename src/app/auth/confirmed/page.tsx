import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "email confirmed | viberater",
  description: "your email is confirmed. open viberater and sign in.",
  robots: { index: false, follow: false },
};

// Where the confirm link in the sign up email lands (Supabase Site URL). Supabase appends either a session or an
// error to the address after the #. This page never uses the session. The inline script below runs before anything
// else on the page: it notes whether the address carried an error, then wipes everything after the # so the
// session never sits in the address bar, the history or analytics.
const readAndClear = `
(function () {
  var hash = window.location.hash || "";
  var failed = hash.indexOf("error") !== -1;
  var root = document.getElementById("confirm-root");
  if (root) root.setAttribute("data-state", failed ? "problem" : "ok");
  if (hash) window.history.replaceState(null, "", window.location.pathname);
})();
`;

const st = {
  card: { maxWidth: 480, margin: "0 auto", padding: "96px 24px 64px", textAlign: "center" } as React.CSSProperties,
  h1: { fontSize: 40, fontWeight: 700, letterSpacing: "-0.01em", fontFamily: "var(--font-display)", marginBottom: 16 } as React.CSSProperties,
  p: { fontSize: 17, lineHeight: 1.6, color: "var(--fg-2)", marginBottom: 12 } as React.CSSProperties,
};

export default function EmailConfirmedPage() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: 56, background: "var(--bg)", minHeight: "100vh" }}>
        <div id="confirm-root" data-state="ok" style={st.card}>
          <style>{`
            #confirm-root[data-state="ok"] .when-problem { display: none; }
            #confirm-root[data-state="problem"] .when-ok { display: none; }
          `}</style>

          <div className="when-ok">
            <h1 style={{ ...st.h1, color: "var(--lime)" }}>you&apos;re in.</h1>
            <p style={st.p}>your email is confirmed.</p>
            <p style={st.p}>open viberater on your phone and sign in.</p>
          </div>

          <div className="when-problem">
            <h1 style={{ ...st.h1, color: "var(--fg-0)" }}>that link didn&apos;t work.</h1>
            <p style={st.p}>it may have expired, or been used already. if you already confirmed, just open viberater and sign in.</p>
            <p style={st.p}>
              still stuck? write to{" "}
              <a href="mailto:hello@getviberater.co" style={{ color: "var(--lime)" }}>
                hello@getviberater.co
              </a>
              .
            </p>
          </div>

          <script dangerouslySetInnerHTML={{ __html: readAndClear }} />
        </div>
      </main>
      <Footer />
    </>
  );
}
