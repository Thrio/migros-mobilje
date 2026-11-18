import Effects from "@/components/Effects";
import { config } from "@/lib/config";
import {
  altText,
  aria,
  callLabel,
  dhoma,
  hero,
  heroCtas,
  kontakti,
  koleksionet,
  kuzhina,
  lokalet,
  mapUrl,
  nav,
  photoSet,
  site,
} from "@/lib/content";

const photos = config.photos.enabled;

// Social links as round icon buttons. The visible name is the aria-label.
function SocialLinks({ small, track }: { small?: boolean; track?: boolean }) {
  const cls = `mm-ico${small ? " mm-ico-sm" : ""}`;
  return (
    <>
      <a className={cls} href={site.facebook} target="_blank" rel="noopener" aria-label={kontakti.facebook} data-track={track ? "facebook" : undefined}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M14.5 21v-8h2.7l.4-3.2h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.2H8.6V13h2.7v8z" />
        </svg>
      </a>
      <a className={cls} href={site.instagram} target="_blank" rel="noopener" aria-label={kontakti.instagram} data-track={track ? "instagram" : undefined}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      </a>
    </>
  );
}

// LocalBusiness data: confirmed facts only (no address lines, hours, email or prices).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: site.name,
  telephone: site.phoneE164,
  sameAs: [site.facebook, site.instagram],
  areaServed: lokalet.towns.map((t) => t.town),
  department: lokalet.towns.map((t) => ({
    "@type": "FurnitureStore",
    name: `${site.name} ${t.town}`,
    telephone: site.phoneE164,
    address: { "@type": "PostalAddress", addressLocality: t.town, addressCountry: "XK" },
  })),
};

export default function Page() {
  return (
    <div className={`mm${photos ? "" : " mm-flat"}`} id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <header className="mm-head">
        <div className="mm-headin">
          <a className="mm-mark" href="#top" aria-label={aria.brand}>
            <b>MIGROS</b>
            <i>mobilje</i>
          </a>
          <nav className="mm-nav" aria-label={aria.nav}>
            {nav.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <a className="mm-btn mm-red" href={site.phoneHref} data-track="call-header">
            {callLabel}
          </a>
          <details className="mm-menu" id="mm-menu">
            <summary aria-label={aria.menu}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M4 8h18M4 13h18M4 18h18" />
              </svg>
            </summary>
            <nav aria-label={aria.nav}>
              {nav.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </header>

      <main>
        <section className="mm-hero" id="mm-hero">
          <div className="mm-wrap mm-herogrid">
            <div className="mm-herocopy">
              <p className="mm-eyebrow mm-in" style={{ ["--d" as string]: "0ms" }}>
                {hero.eyebrow}
              </p>
              <h1 className="mm-hl mm-in" style={{ ["--d" as string]: "80ms" }}>
                {hero.heading}
              </h1>
              <p className="mm-sub mm-in" style={{ ["--d" as string]: "160ms" }}>
                {hero.sub}
              </p>
              <p className="mm-visit mm-in" style={{ ["--d" as string]: "220ms" }}>
                {hero.visit}
              </p>
              <div className="mm-cta mm-in" style={{ ["--d" as string]: "280ms" }}>
                <a className="mm-btn mm-red" href="#lokalet" data-track="cta-lokalet-hero">
                  {heroCtas.primary}
                </a>
                <a className="mm-btn mm-out" href={site.phoneHref} data-track="call-hero">
                  {heroCtas.secondary}
                </a>
              </div>
            </div>
            <div className="mm-herovisual mm-in" style={{ ["--d" as string]: "120ms" }}>
              <img
                className="mm-heroimg"
                {...photoSet(config.hero.image)}
                sizes="(max-width: 1023px) 92vw, 640px"
                width={1350}
                height={1005}
                alt={altText.hero}
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="mm-koleksionet" id="koleksionet">
          <div className="mm-wrap">
            <div className="mm-r">
              <h2 className="mm-h2">{koleksionet.heading}</h2>
              <p className="mm-intro">{koleksionet.intro}</p>
            </div>
            <div className="mm-tiles">
              {koleksionet.tiles.map((t, i) => (
                <a className="mm-tile mm-r" style={{ ["--i" as string]: i }} href="#kontakti" key={t.name} data-track="tile">
                  {photos ? (
                    <div className="mm-tileimg">
                      <img
                        className={t.warm ? "mm-warm" : undefined}
                        {...photoSet(t.image)}
                        sizes="(max-width: 1023px) 50vw, 320px"
                        width={800}
                        height={620}
                        alt={t.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : null}
                  <div className="mm-tiletext">
                    <h3>{t.name}</h3>
                    {t.note ? <p>{t.note}</p> : null}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mm-dhoma" id="dhoma-e-gjumit">
          <div className="mm-wrap">
            <h2 className="mm-h2 mm-r">{dhoma.heading}</h2>
            <div className="mm-cards">
              {dhoma.cards.map((c, i) => (
                <article className="mm-card mm-r" style={{ ["--i" as string]: i }} key={c.name}>
                  {photos ? (
                    <img {...photoSet(c.image)} sizes="(max-width: 1320px) 100vw, 1320px" width={1600} height={640} alt={c.alt} loading="lazy" decoding="async" />
                  ) : null}
                  <h3>{c.name}</h3>
                  <p>{c.line}</p>
                </article>
              ))}
            </div>
            <p className="mm-closing mm-r">{dhoma.closing}</p>
          </div>
        </section>

        <section className="mm-kuzhina" id="kuzhina-interiere">
          <div className={`mm-wrap mm-split${photos ? "" : " mm-split-one"}`}>
            <div className="mm-r">
              <h2 className="mm-h2">{kuzhina.heading}</h2>
              <p className="mm-lead">{kuzhina.lead}</p>
              <p className="mm-note">{kuzhina.note}</p>
              <a className="mm-btn mm-red" href="#lokalet" data-track="cta-lokalet-kuzhina">
                {kuzhina.cta}
              </a>
            </div>
            {photos ? (
              <div className="mm-splitimg mm-r" style={{ ["--i" as string]: 1 }}>
                <img {...photoSet(kuzhina.image)} sizes="(max-width: 1023px) 100vw, 760px" width={1500} height={1100} alt={kuzhina.alt} loading="lazy" decoding="async" />
              </div>
            ) : null}
          </div>
        </section>

        <section className="mm-lokalet" id="lokalet">
          <div className="mm-wrap">
            <h2 className="mm-h2 mm-r">{lokalet.heading}</h2>
            <div className="mm-towns">
              {lokalet.towns.map((t, i) => (
                <article className="mm-town mm-r" style={{ ["--i" as string]: i }} key={t.town}>
                  <span className="mm-line" />
                  <h3>{t.town}</h3>
                  <p>{t.road}</p>
                  <a className="mm-map" href={mapUrl(t.map)} target="_blank" rel="noopener" data-track={`map-${t.town.toLowerCase()}`}>
                    {lokalet.mapLabel}
                  </a>
                </article>
              ))}
            </div>
            <p className="mm-shared">
              <a href={site.phoneHref} data-track="call-lokalet">
                {lokalet.shared}
              </a>
            </p>
          </div>
        </section>

        <section className="mm-kontakti" id="kontakti">
          <div className="mm-wrap">
            <h2 className="mm-h2 mm-r">{kontakti.heading}</h2>
            <a className="mm-btn mm-red mm-phone mm-r" href={site.phoneHref} data-track="call-kontakti">
              {site.phoneDisplay}
            </a>
            <div className="mm-social">
              <SocialLinks track />
            </div>
            <p className="mm-follow">{site.followers}</p>
          </div>
        </section>
      </main>

      <footer className="mm-foot">
        <div className="mm-wrap mm-footin">
          <a className="mm-mark" href="#top" aria-label={aria.brand}>
            <b>MIGROS</b>
            <i>mobilje</i>
          </a>
          <p>{site.footer}</p>
          <div className="mm-footsoc">
            <SocialLinks small />
          </div>
        </div>
      </footer>

      <div className="mm-bar">
        <a className="mm-btn mm-out" href="#lokalet" data-track="bar-lokalet">
          Lokalet
        </a>
        <a className="mm-btn mm-red" href={site.phoneHref} data-track="call-bar">
          {callLabel}
        </a>
      </div>

      <Effects />
    </div>
  );
}
