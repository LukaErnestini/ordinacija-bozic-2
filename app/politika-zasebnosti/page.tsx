import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politika zasebnosti | Ordinacija Božič",
  description:
    "Politika zasebnosti specialistične zobozdravstvene ordinacije Božič. Kakšne podatke zbiramo, zakaj jih zbiramo in kako jih varujemo.",
  alternates: {
    canonical: "/politika-zasebnosti",
  },
};

// Last updated when the policy text was meaningfully changed.
// Update this when you change the policy wording.
const LAST_UPDATED = "8. junij 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-16">
      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl lg:text-5xl font-serif font-bold text-gray-800 mb-3">
            Politika zasebnosti
          </h1>
          <p className="text-sm text-gray-500">
            Zadnja posodobitev: {LAST_UPDATED}
          </p>
        </header>

        {/* Body — using prose for consistent typography */}
        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-800 prose-a:text-primary hover:prose-a:text-primary/80">
          <p>
            V Specialistični zobozdravstveni ordinaciji Božič (v nadaljevanju
            &quot;ordinacija&quot;, &quot;mi&quot;, &quot;nas&quot;) cenimo vašo
            zasebnost. V tej politiki je opisano, katere osebne podatke zbiramo
            preko spletne strani{" "}
            <Link href="/">ordinacijabozic.si</Link>, zakaj jih
            zbiramo, kako jih obdelujemo in kakšne pravice imate v zvezi z
            njimi. Politika je pripravljena v skladu z Uredbo (EU) 2016/679
            (Splošna uredba o varstvu podatkov, GDPR) in Zakonom o varstvu
            osebnih podatkov (ZVOP-2).
          </p>

          <h2>1. Upravljavec osebnih podatkov</h2>
          <p>
            Upravljavec osebnih podatkov je Specialistična zobozdravstvena
            ordinacija Božič:
          </p>
          <ul>
            <li>
              <strong>Naslov (sedež):</strong> Štorje 41A, 6210 Sežana,
              Slovenija
            </li>
            <li>
              <strong>Poslovna enota:</strong> Zatišje 5, 6320 Portorož,
              Slovenija
            </li>
            <li>
              <strong>E-pošta:</strong>{" "}
              <a href="mailto:szo.infos@gmail.com">szo.infos@gmail.com</a>
            </li>
            <li>
              <strong>Telefon (Štorje):</strong>{" "}
              <a href="tel:041823515">041 823 515</a>,{" "}
              <a href="tel:057686001">05 7686 001</a>
            </li>
            <li>
              <strong>Telefon (Portorož):</strong>{" "}
              <a href="tel:040771804">040 771 804</a>,{" "}
              <a href="tel:056744025">05 6744 025</a>
            </li>
          </ul>

          <h2>2. Katere osebne podatke zbiramo</h2>

          <h3>2.1 Podatki ob obisku spletne strani (analitika)</h3>
          <p>
            Če podate soglasje za uporabo analitičnih piškotkov, preko storitve
            Google Analytics 4 zbiramo anonimizirane podatke o vašem obisku:
          </p>
          <ul>
            <li>obiskane strani in čas, ki ga preživite na njih;</li>
            <li>vir prometa (npr. iskalnik, družbena omrežja, neposreden vnos);</li>
            <li>
              tehnične podatke (vrsta naprave, brskalnik, operacijski sistem,
              približna geografska lokacija na ravni mesta ali regije);
            </li>
            <li>
              skrajšan IP-naslov (Google IP anonimiziramo, preden je shranjen).
            </li>
          </ul>
          <p>
            Ti podatki ne omogočajo vaše neposredne identifikacije. Brez vašega
            soglasja teh piškotkov ne nastavimo in podatkov ne zbiramo.
          </p>

          <h3>2.2 Podatki preko kontaktnega obrazca</h3>
          <p>
            Ko nam pišete preko spletnega obrazca, zbiramo:
          </p>
          <ul>
            <li>vaše ime in priimek;</li>
            <li>kontaktni podatek (e-poštni naslov ali telefonsko številko);</li>
            <li>vsebino sporočila in izbrano lokacijo ordinacije;</li>
            <li>označene preset-teme vašega povpraševanja.</li>
          </ul>
          <p>
            Za zaščito pred zlorabami (npr. samodejnimi roboti) uporabljamo
            storitev Cloudflare Turnstile, ki občasno preveri, da je pošiljatelj
            človek. Pri tem Cloudflare lahko zbere omejene tehnične podatke o
            zahtevku (vrsta brskalnika, IP-naslov).
          </p>

          <h2>3. Pravna podlaga in nameni obdelave</h2>
          <ul>
            <li>
              <strong>Analitika (Google Analytics):</strong> pravna podlaga je
              vaše izrecno soglasje (čl. 6(1)(a) GDPR), ki ga lahko kadarkoli
              prekličete. Namen je razumevanje, kako obiskovalci uporabljajo
              spletno stran, da jo lahko izboljšamo.
            </li>
            <li>
              <strong>Kontaktni obrazec:</strong> pravna podlaga je izvedba
              ukrepov na vašo zahtevo pred sklenitvijo pogodbenega razmerja in
              naš zakoniti interes, da vam odgovorimo (čl. 6(1)(b) in (f) GDPR).
            </li>
            <li>
              <strong>Zaščita pred roboti (Turnstile):</strong> pravna podlaga
              je naš zakoniti interes, da preprečimo zlorabo obrazcev (čl. 6(1)(f)
              GDPR).
            </li>
          </ul>

          <h2>4. Piškotki in podobne tehnologije</h2>
          <p>
            Naša spletna stran uporablja piškotke v dveh kategorijah:
          </p>
          <ul>
            <li>
              <strong>Nujno potrebni piškotki:</strong> potrebni za delovanje
              spletne strani in shranjevanje vaših nastavitev (npr. odločitev o
              piškotkih, da se obvestilo ne pojavi znova). Teh ne morete
              zavrniti, saj brez njih spletna stran ne deluje pravilno.
            </li>
            <li>
              <strong>Analitični piškotki (Google Analytics):</strong>{" "}
              <code>_ga</code> in <code>_ga_*</code>. Nastavijo se le, če podate
              soglasje. Veljavnost: do 2 leti. Namen: razumevanje uporabe
              spletne strani.
            </li>
          </ul>
          <p>
            Svojo odločitev o analitičnih piškotkih lahko spremenite tako, da v
            brskalniku počistite shrambo (storage) za to spletno stran — ob
            naslednjem obisku se vam ponovno prikaže obvestilo.
          </p>

          <h2>5. Komu posredujemo podatke</h2>
          <p>
            Vaših podatkov ne prodajamo in jih ne posredujemo tretjim osebam za
            njihove marketinške namene. Za izvajanje storitev sodelujemo z
            naslednjimi obdelovalci:
          </p>
          <ul>
            <li>
              <strong>Google Ireland Limited / Google LLC</strong> — Google
              Analytics 4. Podatki se lahko prenesejo izven EU (v ZDA) na podlagi
              EU-US Data Privacy Framework. Več:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Googlova politika zasebnosti
              </a>
              .
            </li>
            <li>
              <strong>Resend, Inc.</strong> — storitev za pošiljanje e-pošte iz
              kontaktnega obrazca. Več:{" "}
              <a
                href="https://resend.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resend politika zasebnosti
              </a>
              .
            </li>
            <li>
              <strong>Cloudflare, Inc.</strong> — zaščita kontaktnega obrazca
              pred roboti (Turnstile). Več:{" "}
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cloudflare politika zasebnosti
              </a>
              .
            </li>
            <li>
              <strong>Vercel Inc. / TinaCMS</strong> — gostovanje spletne strani
              in upravljanje vsebin.
            </li>
          </ul>
          <p>
            Vsi obdelovalci so pogodbeno zavezani k spoštovanju GDPR in
            zaupnosti podatkov.
          </p>

          <h2>6. Kako dolgo hranimo podatke</h2>
          <ul>
            <li>
              <strong>Analitični podatki:</strong> v Google Analytics 4
              nastavljeni za samodejno izbrisanje po 14 mesecih.
            </li>
            <li>
              <strong>Sporočila iz kontaktnega obrazca:</strong> hranimo toliko
              časa, kot je potrebno za odgovor in obravnavo vaše poizvedbe,
              najdlje 2 leti od zadnje korespondence.
            </li>
            <li>
              <strong>Piškotki za shranjevanje odločitve o soglasju:</strong>{" "}
              dokler jih ročno ne odstranite ali počistite shrambe brskalnika.
            </li>
          </ul>

          <h2>7. Vaše pravice</h2>
          <p>
            V skladu z GDPR imate naslednje pravice glede svojih osebnih
            podatkov:
          </p>
          <ul>
            <li>
              <strong>Pravica do dostopa</strong> — izvedeti, katere podatke o
              vas hranimo;
            </li>
            <li>
              <strong>Pravica do popravka</strong> — zahtevati popravek
              netočnih ali nepopolnih podatkov;
            </li>
            <li>
              <strong>Pravica do izbrisa</strong> (&quot;pravica do
              pozabe&quot;) — zahtevati izbris svojih podatkov;
            </li>
            <li>
              <strong>Pravica do omejitve obdelave</strong>;
            </li>
            <li>
              <strong>Pravica do prenosljivosti</strong> podatkov;
            </li>
            <li>
              <strong>Pravica do ugovora</strong> obdelavi, ki temelji na
              zakonitem interesu;
            </li>
            <li>
              <strong>Pravica do preklica soglasja</strong> kadarkoli, ne da bi
              to vplivalo na zakonitost obdelave pred preklicem.
            </li>
          </ul>
          <p>
            Pravice lahko uveljavite tako, da nam pošljete sporočilo na{" "}
            <a href="mailto:szo.infos@gmail.com">szo.infos@gmail.com</a> ali nas
            kontaktirate preko podatkov v 1. točki te politike. Odgovorili vam
            bomo najkasneje v 30 dneh.
          </p>

          <h2>8. Varnost podatkov</h2>
          <p>
            Sprejeli smo ustrezne tehnične in organizacijske ukrepe za varstvo
            osebnih podatkov pred izgubo, zlorabo in nepooblaščenim dostopom.
            Spletna stran uporablja šifrirano povezavo (HTTPS). Dostop do
            podatkov je omejen na pooblaščeno osebje ordinacije.
          </p>

          <h2>9. Otroci</h2>
          <p>
            Spletna stran ni namenjena otrokom, mlajšim od 16 let. Zavestno ne
            zbiramo osebnih podatkov takih otrok. Če menite, da je otrok podal
            podatke brez ustreznega soglasja staršev oz. skrbnikov, nas, prosimo,
            kontaktirajte, da podatke izbrišemo.
          </p>

          <h2>10. Spremembe politike zasebnosti</h2>
          <p>
            Politiko zasebnosti lahko občasno posodobimo. O bistvenih spremembah
            vas bomo obvestili na vidnem mestu na spletni strani. Datum zadnje
            posodobitve je naveden na vrhu te strani.
          </p>

          <h2>11. Pritožba pri nadzornem organu</h2>
          <p>
            Če menite, da kršimo vaše pravice glede varstva osebnih podatkov,
            imate pravico vložiti pritožbo pri Informacijskem pooblaščencu
            Republike Slovenije:
          </p>
          <ul>
            <li>
              <strong>Naslov:</strong> Dunajska cesta 22, 1000 Ljubljana
            </li>
            <li>
              <strong>Telefon:</strong>{" "}
              <a href="tel:+38612309730">01 230 97 30</a>
            </li>
            <li>
              <strong>E-pošta:</strong>{" "}
              <a href="mailto:gp.ip@ip-rs.si">gp.ip@ip-rs.si</a>
            </li>
            <li>
              <strong>Spletna stran:</strong>{" "}
              <a
                href="https://www.ip-rs.si"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.ip-rs.si
              </a>
            </li>
          </ul>

          <h2>12. Kontakt</h2>
          <p>
            Za vprašanja glede te politike zasebnosti ali obdelave vaših
            osebnih podatkov nas kontaktirajte na{" "}
            <a href="mailto:szo.infos@gmail.com">szo.infos@gmail.com</a> ali
            preko{" "}
            <Link href="/kontaktiraj-nas">kontaktnega obrazca</Link>.
          </p>
        </div>
      </article>
    </div>
  );
}
