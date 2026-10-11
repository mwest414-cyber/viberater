import type { Metadata } from "next";
import { shareMeta } from "@/lib/shareMeta";
import Footer from "@/components/Footer";
import { Bullets, Card, Closing, ContactCard, Em, H3, Label, LegalPage, Notice, P, Section, Table } from "@/components/legal/Legal";

const description =
  "the terms for using viberater: your account, acceptable use, the vibes you post, and how disputes are handled.";

export const metadata: Metadata = {
  title: "terms of service",
  description,
  alternates: { canonical: "/terms" },
  ...shareMeta({ title: "terms of service · viberater", description, path: "/terms" }),
};

// Layout from Figma "🧪 Legal pages" (approved by Mark 2026-10-10). The terms text is unchanged; headings are lowercase to match the site.

const TOC = [
  { id: "introduction", label: "introduction" },
  { id: "account", label: "creating your account" },
  { id: "acceptable-use", label: "acceptable use policy" },
  { id: "content", label: "your content (vibes)" },
  { id: "intellectual-property", label: "our intellectual property" },
  { id: "public-platform", label: "public platform & data use" },
  { id: "termination", label: "suspension & termination" },
  { id: "disclaimers", label: "disclaimers & liability" },
  { id: "dispute-resolution", label: "dispute resolution" },
  { id: "changes", label: "changes to these terms" },
  { id: "contact", label: "contact us" },
];

const email = <Em>hello@getviberater.co</Em>;

export default function TermsPage() {
  return (
    <>
      <LegalPage
        title="terms of service"
        subtitle="the rules that govern your use of VibeRater."
        chips={["version 1.0 · april 24, 2026", "updated october 3, 2026", "first released at launch"]}
        toc={TOC}
      >
        <Notice label="important notice">
          <P>By using VibeRater, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you must not use VibeRater. Please read both documents carefully before using our app.</P>
        </Notice>

        <Section id="introduction" num="01" title="introduction">
          <P>Welcome to VibeRater. These Terms of Service are a binding contract between you and VibeRater. By using VibeRater, you agree to be bound by these Terms.</P>
          <H3>what is viberater?</H3>
          <P>VibeRater is a mobile app that allows you to share and discover the vibe (atmosphere, energy, feeling) of third spaces like cafes, bars, and coworking spaces. You drop a vibe at a venue using descriptive vibe tags and crowd level descriptions. Our platform is open to everyone, built on transparency, and designed to help people find spaces that match the vibe they&apos;re looking for.</P>
          <H3>related documents</H3>
          <P>These Terms include and reference our Privacy Policy and Community Guidelines, which are incorporated by reference.</P>
        </Section>

        <Section id="account" num="02" title="creating your account">
          <H3>age requirement</H3>
          <P>You must be at least 17 years old to use VibeRater. We ask for your date of birth when you create an account, and we do not allow anyone under 17 to use VibeRater. By creating an account, you represent that you are 17 years or older.</P>
          <H3>account creation</H3>
          <P>You can sign up using Apple, Google, or your email and a password. You may only create one account per person.</P>
          <H3>your display name</H3>
          <P>Your display name must not contain anything harmful, hateful, discriminatory, defamatory, or illegal, and must not impersonate another person.</P>
          <H3>your responsibilities</H3>
          <P>You are solely responsible for keeping your password confidential, notifying us of unauthorized access, maintaining accurate account information, and all activity on your account.</P>
        </Section>

        <Section id="acceptable-use" num="03" title="acceptable use policy">
          <P>When using VibeRater, you agree not to:</P>
          <Card gap={12}>
            <Label color="var(--lime)">prohibited behavior</Label>
            <Bullets
              items={[
                "Drop fake vibes that don't reflect your genuine experience",
                "Manipulate the system or artificially inflate/deflate a venue's vibe",
                "Engage in harassment, bullying, or abuse",
                "Use bots or automation to drop fake vibes",
                "Attempt to hack or compromise VibeRater",
                "Submit spam or marketing content",
                "Copy or scrape VibeRater content",
                "Train AI models on our data without permission",
              ]}
            />
          </Card>
          <H3>enforcement</H3>
          <P>If we detect violations, we may remove your vibes, suspend your account, or permanently terminate it.</P>
        </Section>

        <Section id="content" num="04" title="your content (vibes)">
          <H3>you own your vibes</H3>
          <P>You own all vibes and other content you submit. By submitting content, you grant VibeRater a worldwide license to use, reproduce, distribute, and display your content.</P>
          <H3>public content and copies outside viberater</H3>
          <P><Em>Important:</Em> Because VibeRater is an open platform, vibes are public by default and may be indexed by search engines, accessed by AI systems, and used by third parties. If you delete your account, we delete your vibes from VibeRater within 30 days. Copies already picked up by search engines, AI systems, or third parties may remain, and we can&apos;t control those.</P>
        </Section>

        <Section id="intellectual-property" num="05" title="our intellectual property">
          <P>VibeRater and all content on our platform (except Your Content) are owned by VibeRater. You agree not to copy, reverse engineer, or use our intellectual property without permission.</P>
        </Section>

        <Section id="public-platform" num="06" title="public platform & data use">
          <P>VibeRater is an open platform where vibes are shared with search engines, AI systems, analytics platforms, and venue partners (aggregated data only). You can opt out of AI indexing by emailing {email}.</P>
        </Section>

        <Section id="termination" num="07" title="suspension & termination">
          <H3>viberater&apos;s right to terminate</H3>
          <P>We may suspend or terminate your account if you violate these Terms, drop fake vibes, engage in abusive behavior, attempt to manipulate the system, or violate applicable laws.</P>
          <H3>your right to delete your account</H3>
          <P>You can delete your account at any time. Your profile information, vibes, waves, and saved places are permanently deleted within 30 days. Copies already picked up by search engines, AI systems, or third parties may remain.</P>
        </Section>

        <Section id="disclaimers" num="08" title="disclaimers & liability">
          <H3>no warranty</H3>
          <P>VibeRater is provided &quot;AS IS&quot; without warranties of accuracy, reliability, or fitness for any particular purpose.</P>
          <H3>limitations on liability</H3>
          <P>To the extent permitted by law, we are not liable for indirect, incidental, or consequential damages, and our total liability is limited to $100 USD.</P>
          <H3>indemnification</H3>
          <P>You agree to indemnify VibeRater from claims arising from your use of the app, violation of these Terms, or infringement of third-party rights.</P>
        </Section>

        <Section id="dispute-resolution" num="09" title="dispute resolution">
          <H3>informal resolution</H3>
          <P>If you have a dispute, contact our support team first at {email}.</P>
          <H3>governing law</H3>
          <P>These Terms are governed by the laws of the State of New York, USA.</P>
          <H3>jurisdiction</H3>
          <P>You agree that any legal action must be brought exclusively in New York courts.</P>
        </Section>

        <Section id="changes" num="10" title="changes to these terms">
          <P>We may change these Terms at any time. Your continued use of VibeRater indicates your acceptance of updated Terms.</P>
        </Section>

        <Section id="contact" num="11" title="contact us">
          <ContactCard title="viberater support" />
        </Section>

        <Section title="version history">
          <P>This is the first version of VibeRater&apos;s Terms of Service, released upon initial platform launch.</P>
          <Table head={["version", "date", "status"]} widths={[96, 170]} rows={[[<Em key="v">1.0</Em>, "April 24, 2026", "Initial release (first version)"]]} />
        </Section>

        <Closing line="respect the community that makes VibeRater possible." />
      </LegalPage>
      <Footer />
    </>
  );
}
