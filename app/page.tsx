import Effects from "@/components/Effects";
import HeroCanvas from "@/components/HeroCanvas";
import { config } from "@/lib/config";
import {
  altText,
  aria,
  callLabel,
  dhoma,
  heroBeats,
  heroCtas,
  kontakti,
  koleksionet,
  kuzhina,
  lokalet,
  mapUrl,
  nav,
  photo,
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

      <div className="mm-loader" id="mm-loader" aria-hidden="true">
        <div className="mm-lwrap">
          <span className="mm-mark">
            <b>MIGROS</b>
            <i>mobilje</i>
          </span>
          <div className="mm-pbar">
            <div className="mm-pfill" id="mm-pfill" />
          </div>
          <div className="mm-pct" id="mm-pct">
            0%
          </div>
        </div>
      </div>

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
          <div className="mm-stage">
            <div className="mm-herocanvas" id="mm-herocanvas" role="img" aria-label={altText.hero}>
              <HeroCanvas />
            </div>
            <div className="mm-scrim" />
            <div className="mm-beats">
              {heroBeats.map((b, i) => {
                const Heading = i === 0 ? "h1" : "h2";
                return (
                  <div className="mm-beat" key={b.id}>
                    <Heading className="mm-hl">
                      <span>{b.heading}</span>
                    </Heading>
                    {b.sub ? <p className="mm-sub">{b.sub}</p> : null}
                    {i === heroBeats.length - 1 ? (
                      <div className="mm-cta">
                        <a className="mm-btn mm-red" href="#lokalet" data-track="cta-lokalet-hero">
                          {heroCtas.primary}
                        </a>
                        <a className="mm-btn mm-out" href={site.phoneHref} data-track="call-hero">
                          {heroCtas.secondary}
                        </a>
                      </div>
                    ) : null}
                  </div>
                );
              })}
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
                      <img className={t.warm ? "mm-warm" : undefined} src={photo(t.image)} alt={t.alt} loading="lazy" />
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
                  {photos ? <img src={photo(c.image)} alt={c.alt} loading="lazy" /> : null}
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
                <img src={photo(kuzhina.image)} alt={kuzhina.alt} loading="lazy" />
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
