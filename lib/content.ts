// All copy and contact data. Albanian, standard, formal "ju".
// Anything the research could not confirm stays out of this file.

export const site = {
  name: "Migros Mobilje",
  title: "Migros Mobilje | Mobilje, kuzhina dhe interier në Prishtinë, Ferizaj, Gjilan dhe Viti",
  description:
    "Garnitura, dhoma gjumi, kuzhina, tavolina dhe mobilje zyre. Katër lokale: Prishtinë, Ferizaj, Gjilan dhe Viti. Telefon: 049 998 999.",
  phoneDisplay: "049 998 999",
  phoneHref: "tel:+38349998999",
  phoneE164: "+38349998999",
  facebook: "https://www.facebook.com/migrosmobilje/",
  instagram: "https://www.instagram.com/migros.mobilje/",
  followers: "58 mijë ndjekës në Facebook dhe 17 mijë në Instagram.",
  footer: "© 2026 Migros Mobilje · Prishtinë · Ferizaj · Gjilan · Viti",
} as const;

export const nav = [
  { label: "Koleksionet", href: "#koleksionet" },
  { label: "Lokalet", href: "#lokalet" },
  { label: "Kontakti", href: "#kontakti" },
] as const;

export const callLabel = "Na telefononi";

// Photos live in /public/media/photos (stock, see credits below).
export const photo = (file: string) => `/media/photos/${file}`;

export const altText = {
  hero: "Shtof i butë në ngjyrë krem, pamje nga afër",
} as const;

export const heroBeats = [
  {
    id: "beat-1",
    heading: "Rehatia për familjen tuaj fillon tek ne.",
    sub: "Mobilje, kuzhina, interier dhe zyre. Katër lokale në Prishtinë, Ferizaj, Gjilan dhe Viti.",
  },
  {
    id: "beat-2",
    heading: "Komoditet që flet për stilin tuaj.",
    sub: "Garnitura FLY ka detaje druri natyral dhe shtof.",
  },
  {
    id: "beat-3",
    heading: "Nga koncepti deri te realizimi.",
    sub: "Dhoma gjumi, kuzhina dhe interiere të plota. Na kontaktoni për çmime dhe porosi.",
  },
  {
    id: "beat-4",
    heading: "Sepse luksi ndërtohet në detaje.",
    sub: "Dhomat ZIRVE, Mabel dhe MILAS.",
  },
  {
    id: "beat-5",
    heading: "Ejani në një nga katër lokalet tona.",
    sub: null,
  },
] as const;

export const heroCtas = {
  primary: "Gjeni lokalin më afër",
  secondary: "Na telefononi: 049 998 999",
} as const;

export const koleksionet = {
  heading: "Çfarë gjeni tek ne",
  intro: "Mobilje për çdo dhomë të shtëpisë dhe për zyrën.",
  tiles: [
    {
      name: "Garnitura",
      note: "FLY, Sirius dhe Petra Set.",
      image: "tile-garnitura.jpg",
      alt: "Shtof i butë me palosje, pamje nga afër",
      warm: true,
    },
    {
      name: "Karrika",
      note: null,
      image: "tile-karrika.jpg",
      alt: "Karrige të larta druri në dritë të ngrohtë",
      warm: false,
    },
    {
      name: "Tavolina e ushqimit",
      note: null,
      image: "tile-tavolina-e-ushqimit.jpg",
      alt: "Tavolinë ushqimi prej druri, pamje nga afër",
      warm: false,
    },
    {
      name: "Komoda dhe konsolë",
      note: null,
      image: "tile-komoda-dhe-konsole.jpg",
      alt: "Komodë druri në një dhomë të ndritshme",
      warm: false,
    },
    {
      name: "Tavolina e mesit",
      note: null,
      image: "tile-tavolina-e-mesit.jpg",
      alt: "Tavolinë mesi prej druri para një divani",
      warm: false,
    },
    {
      name: "Dhoma e gjumit",
      note: "ZIRVE, Mabel dhe MILAS.",
      image: "tile-dhoma-e-gjumit.jpg",
      alt: "Jastëkë në dritë të butë, pamje nga afër",
      warm: true,
    },
    {
      name: "Kuzhina",
      note: "Na kontaktoni për çmime dhe porosi.",
      image: "tile-kuzhina.jpg",
      alt: "Kuzhinë me kabinete druri dhe mermer",
      warm: false,
    },
    {
      name: "Zyra",
      note: "Na kontaktoni për çmime dhe porosi.",
      image: "tile-zyra.jpg",
      alt: "Tavolinë pune prej druri me karrige",
      warm: false,
    },
  ],
} as const;

export const dhoma = {
  heading: "Tri dhoma gjumi nga koleksioni ynë",
  cards: [
    {
      name: "ZIRVE",
      line: "Më shumë se një dhomë gjumi.",
      image: "card-zirve.jpg",
      alt: "Dru i errët me tekstura të ngrohta, pamje nga afër",
    },
    {
      name: "Mabel",
      line: "Ngjyra të buta, forma të forta.",
      image: "card-mabel.jpg",
      alt: "Tekstile të palosura në ngjyra të buta",
    },
    {
      name: "MILAS",
      line: "Dhomë gjumi me krevat, gardërobë dhe tualet me pasqyrë.",
      image: "card-milas.jpg",
      alt: "Dru me tekstura të ngrohta, pamje nga afër",
    },
  ],
  closing: "Për çmime dhe porosi, na telefononi ose ejani në lokal.",
} as const;

export const kuzhina = {
  heading: "Kuzhina dhe interiere të plota",
  lead: "Nga koncepti deri te realizimi.",
  note: "Na kontaktoni për çmime dhe porosi.",
  cta: "Gjeni lokalin më afër",
  image: "kuzhina-interiere.jpg",
  alt: "Kuzhinë me kabinete druri dhe tavolinë ushqimi",
} as const;

export const lokalet = {
  heading: "Katër lokalet tona",
  mapLabel: "Hapeni në hartë",
  shared: "Telefon: 049 998 999",
  towns: [
    { town: "Prishtinë", road: "Rrethi QMI-së", map: "Migros Mobilje Prishtinë" },
    { town: "Ferizaj", road: "Magjistrale", map: "Migros Mobilje Ferizaj" },
    { town: "Gjilan", road: "Qarkore", map: "Migros Mobilje Gjilan" },
    { town: "Viti", road: "Magjistrale", map: "Migros Mobilje Viti" },
  ],
} as const;

export const kontakti = {
  heading: "Na kontaktoni për çmime dhe porosi",
  facebook: "Facebook",
  instagram: "Instagram",
} as const;

export const aria = {
  nav: "Lundrimi",
  menu: "Menyja",
  brand: "Migros Mobilje",
} as const;

// Stock photo credits, as recorded in the project's photo-credits.md (5 Nov 2026).
// All from Unsplash (not Unsplash+). None is a Migros Mobilje product or showroom.
// The licence was read from the image host, not each photo page: confirm on the pages before launch.
export const credits = [
  { where: "Hero (graded darker and warmer)", file: "hero.jpg", photographer: "Kateryna Hliznitsova", url: "https://unsplash.com/photos/a-close-up-of-a-bed-with-a-white-sheet-2NDtPNiLcD0" },
  { where: "Tile: Garnitura (slight warm tint)", file: "tile-garnitura.jpg", photographer: "Jacinta Christos", url: "https://unsplash.com/photos/white-textile-in-close-up-photography-BDJy8J3R4GY" },
  { where: "Tile: Karrika", file: "tile-karrika.jpg", photographer: "Raygar He", url: "https://unsplash.com/photos/brown-wooden-chair-beside-white-wall-iyOEfpWjky0" },
  { where: "Tile: Tavolina e ushqimit", file: "tile-tavolina-e-ushqimit.jpg", photographer: "Costa Live", url: "https://unsplash.com/photos/wooden-dining-table-and-chairs-with-grey-upholstery-T_CYjDSfvkY" },
  { where: "Tile: Komoda dhe konsolë", file: "tile-komoda-dhe-konsole.jpg", photographer: "Imani Bahati", url: "https://unsplash.com/photos/modern-wooden-sideboard-with-decorative-items-and-lamp-UrQeWGobTnI" },
  { where: "Tile: Tavolina e mesit", file: "tile-tavolina-e-mesit.jpg", photographer: "Lui Peng", url: "https://unsplash.com/photos/brown-wooden-table-beside-white-couch-8NxTrV6i4WQ" },
  { where: "Tile: Dhoma e gjumit (slight warm tint)", file: "tile-dhoma-e-gjumit.jpg", photographer: "Stockholm Paris Studio", url: "https://unsplash.com/photos/a-close-up-of-pillows-on-a-bed-lLIiI9PMm8g" },
  { where: "Tile: Kuzhina", file: "tile-kuzhina.jpg", photographer: "Franco Debartolo", url: "https://unsplash.com/photos/modern-kitchen-with-wood-cabinets-and-marble-backsplash-PkV2k48-N6E" },
  { where: "Tile: Zyra", file: "tile-zyra.jpg", photographer: "Denys Striyeshyn", url: "https://unsplash.com/photos/brown-wooden-table-and-chairs-wJ7yGwz2-00" },
  { where: "Card: ZIRVE", file: "card-zirve.jpg", photographer: "Joshua Bartell", url: "https://unsplash.com/photos/brown-wooden-board-6vvIBTvL90A" },
  { where: "Card: Mabel", file: "card-mabel.jpg", photographer: "Svitlana", url: "https://unsplash.com/photos/white-textile-on-brown-wooden-table-HbiRi1Owk9k" },
  { where: "Card: MILAS", file: "card-milas.jpg", photographer: "Nathan Dumlao", url: "https://unsplash.com/photos/dark-brown-wooden-surface-texture-J2gEgTPM_OA" },
  { where: "Kuzhina dhe interiere section", file: "kuzhina-interiere.jpg", photographer: "Clay Banks", url: "https://unsplash.com/photos/modern-kitchen-with-wood-cabinets-cIKLvLXkN6Y" },
] as const;

export function mapUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
