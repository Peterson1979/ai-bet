export default function BannerAds() {
  return (
    <div
      style={{
        marginTop: 60,
        display: "grid",
        gap: 18,
      }}
    >
      {/* BANNER 1 */}
      <div
        dangerouslySetInnerHTML={{
          __html: `
            IDE JÖN AZ ELSŐ HTML BANNER KÓDJA
          `,
        }}
      />

      {/* BANNER 2 */}
      <div
        dangerouslySetInnerHTML={{
          __html: `
            IDE JÖN A MÁSODIK HTML BANNER KÓDJA
          `,
        }}
      />

      {/* BANNER 3 */}
      <div
        dangerouslySetInnerHTML={{
          __html: `
            IDE JÖN A HARMADIK HTML BANNER KÓDJA
          `,
        }}
      />
    </div>
  );
}