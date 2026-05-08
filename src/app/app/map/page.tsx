import TabBar, { TAB_BAR_HEIGHT } from "@/components/TabBar";

export default function MapPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
        paddingBottom: TAB_BAR_HEIGHT,
      }}
    >
      <main id="main-content" style={{ flex: 1, padding: "24px 24px 0" }}>
        <p style={{ color: "var(--fg-3)", fontFamily: "var(--font-mono)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          map
        </p>
      </main>

      <TabBar active="map" />
    </div>
  );
}
