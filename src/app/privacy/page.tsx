import type { Metadata } from "next";
import { shareMeta } from "@/lib/shareMeta";
import Footer from "@/components/Footer";
import { Bullets, Card, Closing, ContactCard, Em, Group, H3, LegalPage, Notice, P, Section, Table } from "@/components/legal/Legal";

const description =
  "what viberater collects, what is public and private, how your data is used and shared, and your choices, including deleting your account.";

export const metadata: Metadata = {
  title: "privacy policy",
  description,
  alternates: { canonical: "/privacy" },
  ...shareMeta({ title: "privacy policy · viberater", description, path: "/privacy" }),
};

// Layout from Figma "🧪 Legal pages" (approved by Mark 2026-10-10). The policy text is unchanged; headings are lowercase to match the site.

const TOC = [
  { id: "introduction", label: "introduction" },
  { id: "open-platform", label: "viberater is an open platform" },
  { id: "data-collection", label: "what data we collect" },
  { id: "public-private", label: "public vs. private data" },
  { id: "how-we-use", label: "how we use your data" },
  { id: "data-sharing", label: "how we share your data" },
  { id: "ai-systems", label: "ai & search engine access" },
  { id: "data-security", label: "data security" },
  { id: "user-rights", label: "your rights & choices" },
  { id: "retention", label: "data retention" },
  { id: "gdpr", label: "notice for european users" },
  { id: "age", label: "age requirement" },
  { id: "contact", label: "contact us" },
];

const email = <Em>hello@getviberater.co</Em>;

export default function PrivacyPage() {
  return (
    <>
      <LegalPage
        title="privacy policy"
        subtitle="know how we protect your vibe data."
        chips={["version 1.1", "updated october 4, 2026", "first released april 24, 2026"]}
        toc={TOC}
      >
        <Notice label="important notice">
          <P>By using VibeRater, you agree to be bound by this Privacy Policy. If you do not agree, you must not use VibeRater. Please read this document carefully before using our app.</P>
        </Notice>

        <Section id="introduction" num="01" title="introduction">
          <P>Welcome to VibeRater. This Privacy Policy explains what information we collect, how we use it, who we share it with, and what choices you have. By using VibeRater, you agree to the terms of this policy.</P>
          <P>If you have questions, contact us at {email}.</P>
        </Section>

        <Section id="open-platform" num="02" title="viberater is an open platform">
          <P><Em>Important: VibeRater is designed as an open platform.</Em> When you drop a vibe at a venue, that vibe and your profile become publicly visible to anyone who visits VibeRater, including search engines and AI systems.</P>
          <Notice label="what this means">
            <Bullets
              items={[
                <>Your vibes are <Em>public by default</Em> and visible to everyone</>,
                "Your vibes may appear in Google Search, other search engines, and AI systems like ChatGPT and Gemini",
                "Third parties may incorporate your vibes into their own products and services",
                "If you delete your account, we delete your vibes from VibeRater within 30 days. Copies already picked up by search engines, AI systems, or third parties may remain, and we can't control those",
              ]}
            />
          </Notice>
          <P>We believe transparency about venue vibes serves the public good. Your vibes help people discover spaces with atmospheres that match what they&apos;re looking for. This open approach is core to how VibeRater works.</P>
        </Section>

        <Section id="data-collection" num="03" title="what data we collect">
          <H3>3.1 public data (visible to everyone)</H3>
          <P>This information is displayed publicly on VibeRater and may be indexed by search engines and AI systems:</P>
          <Card>
            <Group
              label="your profile"
              items={["Display name (required)", "Profile photo (optional). It is stored at a public web address, so anyone who has the link can see it"]}
            />
            <Group
              label="your vibes"
              items={[
                "Venue where you dropped a vibe",
                "Energy level you picked (chill, lively, buzzing, packed, or electric)",
                'Vibe tags you selected (e.g., "cozy," "dancy," "date night")',
                'Crowd level description (e.g., "quiet," "moderate," "packed")',
                "Date and time you dropped the vibe",
              ]}
            />
          </Card>

          <H3>3.2 private data (not shown publicly)</H3>
          <P>This information is kept private and not visible to the public:</P>
          <Card>
            <Group
              label="account information"
              items={[
                "Email address (required for account recovery)",
                "Password (encrypted)",
                "Phone number (optional)",
                "Date of birth (required, used only to confirm you are old enough to use VibeRater)",
                "Sign-in details from Apple or Google (if you sign in with them)",
                "Places you save (visible only to you)",
              ]}
            />
            <Group
              label="location data"
              items={["Your precise GPS location (when you grant permission)", "Venues you've visited (even if you don't drop a vibe)", "Your search history on the app"]}
            />
            <Group
              label="device information"
              items={["Device type and operating system", "Device ID and advertising ID", "Browser type and version", "IP address", "Screen resolution and device settings"]}
            />
            <Group
              label="usage data"
              items={["How you interact with the app (taps, swipes, time spent)", "Features you use most", "App crashes and errors", "Pages or screens you view"]}
            />
          </Card>

          <H3>3.3 data from third parties</H3>
          <P>We may receive data about you from Apple or Google (if you sign in with them) and from analytics providers (anonymized usage patterns). Venue information comes from the Overture Maps Foundation and OpenStreetMap, and the map you see is provided by Mapbox.</P>
        </Section>

        <Section id="public-private" num="04" title="public vs. private data">
          <P>Understanding the difference is important:</P>
          <Table
            head={["public data", "private data"]}
            rows={[
              ["Visible on VibeRater to everyone", "Not shown on VibeRater publicly"],
              ["Indexed by Google and other search engines", "Not indexed by search engines"],
              ["May be accessed by AI systems", "Not shared with AI systems"],
              ["Example: Your vibes", "Example: Your email, password, location"],
            ]}
          />
        </Section>

        <Section id="how-we-use" num="05" title="how we use your data">
          <P>We use your data to provide VibeRater, personalize your experience, communicate with you, improve our services, and comply with legal obligations. This includes showing you relevant venues, storing your vibes, recommending new places based on your preferences, and analyzing how the app is used to fix bugs and add features.</P>
        </Section>

        <Section id="data-sharing" num="06" title="how we share your data">
          <P>Your public vibes are shared with search engines, AI systems, analytics platforms, and venue partners (aggregated data only). We have Data Processing Agreements with all service providers. We use Supabase to store accounts, profiles, vibes and profile photos and to handle sign-in, Resend to send account emails such as the message that confirms your email address, Mapbox to display maps, and Vercel to host our website. We do NOT sell your personal data, share your email or password, or use your data for interest-based advertising.</P>
        </Section>

        <Section id="ai-systems" num="07" title="ai & search engine access">
          <P>Because VibeRater is an open platform, your public vibes may be accessed by search engines and AI systems like ChatGPT, Gemini, and Claude for training and responses. You can opt out by emailing {email}.</P>
        </Section>

        <Section id="data-security" num="08" title="data security">
          <P>We protect your data with HTTPS/TLS encryption, encrypted storage, access controls, and regular security audits. No system is 100% secure, but we implement industry-standard protections. If you suspect unauthorized access, contact us immediately.</P>
        </Section>

        <Section id="user-rights" num="09" title="your rights & choices">
          <P>You can change your display name and profile photo in the app (Settings), and you can delete your account in the app (Settings, then delete account). When you delete your account, we erase your profile, profile photo, vibes, waves, saved places and blocks, and we complete full deletion within 30 days. You can also access or port your data. You can control location permissions, opt out of marketing, and limit personalized ads. Email {email} to exercise these rights, and we&apos;ll respond within 30 days.</P>
        </Section>

        <Section id="retention" num="10" title="data retention">
          <P>We retain account data while your account is active (deleted within 30 days of you deleting your account), profile photos until you replace them or delete your account, saved places until you remove them or delete your account, vibes until you delete them or delete your account (within 30 days), location data for 90 days, device/usage data for 12 months, and support records for 2 years.</P>
        </Section>

        <Section id="gdpr" num="11" title="notice for european users">
          <P>If you&apos;re in the EEA or UK, GDPR applies. We&apos;re the data controller. We process data based on contract, legitimate interests, consent, or legal obligation. You have rights to access, correct, delete, port, restrict, object, and withdraw consent. Email {email} or lodge a complaint with your local data protection authority.</P>
        </Section>

        <Section id="age" num="12" title="age requirement">
          <P>You must be at least 17 years old to use VibeRater. We ask for your date of birth when you create an account, and anyone under 17 cannot continue.</P>
          <P>If you are a parent or guardian and discover that your child under 17 has created a VibeRater account, please contact us at {email} and we will help remove the account.</P>
          <P>We do not knowingly collect personal data from anyone under 17. If you believe we have collected data from someone under 17, please contact us immediately.</P>
        </Section>

        <Section id="contact" num="13" title="contact us">
          <ContactCard title="privacy team" />
        </Section>

        <Section title="version history">
          <P>Changes to this Privacy Policy are listed below.</P>
          <Table
            head={["version", "date", "status"]}
            widths={[96, 170]}
            rows={[
              [<Em key="v">1.1</Em>, "October 4, 2026", "Updated for profile photos, deleting your account in the app, saved places, and the services we use (Overture and OpenStreetMap for venue data, Mapbox, Supabase, Resend, Vercel)"],
              [<Em key="v">1.0</Em>, "April 24, 2026", "Initial release (first version)"],
            ]}
          />
        </Section>

        <Closing line="and know how we protect your vibe data." />
      </LegalPage>
      <Footer />
    </>
  );
}
