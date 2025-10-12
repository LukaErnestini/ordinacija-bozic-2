import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BackToTopButton from "@/components/BackToTopButton";
import client from "@/tina/__generated__/client";
import NoticeAlert from "@/components/notice/notice-alert";
import { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const globalQuery = await client.queries.global({
    relativePath: "global.json",
  });
  const { global } = globalQuery.data;
  
  return {
    title: global.siteTitle,
    description: global.siteDescription,
    metadataBase: new URL('https://www.ordinacijabozic.si'),
    alternates: {
      canonical: '/',
    },
    icons: {
      icon: global.logo,
      shortcut: global.logo,
      apple: global.logo,
    },
    openGraph: {
      title: global.siteTitle,
      description: global.siteDescription,
      images: [
        {
          url: global.logo,
          width: 1200,
          height: 630,
          alt: global.pageTitle,
        },
      ],
      locale: 'sl_SI',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: global.siteTitle,
      description: global.siteDescription,
      images: [global.logo],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [
    locationsResponse,
    noticesResponse,
    serviceCategoriesResponse,
    globalQuery,
  ] = await Promise.all([
    client.queries.locationConnection(),
    client.queries.noticeConnection(),
    client.queries.serviceCategoryConnection(),
    client.queries.global({ relativePath: "global.json" }),
  ]);

  // Transform service categories data into navigation structure
  const serviceItems =
    serviceCategoriesResponse.data?.serviceCategoryConnection.edges?.map(
      (edge) => ({
        name: edge?.node?.title || "",
        href: `/${edge?.node?._sys.filename}`,
      }),
    ) || [];

  const navigationItems = [
    {
      name: "Kdo smo",
      href: "/predstavitev",
    },
    {
      name: "Kako vam pomagamo",
      subItems: serviceItems,
    },
    {
      name: "Ordinacija Štorje",
      href: "/ordinacija-storje",
    },
    {
      name: "Ordinacija Portorož",
      href: "/ordinacija-portoroz",
    },
    {
      name: "Pomembna obvestila",
      href: "/obvestila",
    },
  ];

  const locations =
    locationsResponse.data.locationConnection.edges
      ?.map((edge) => {
        const node = edge?.node;
        return {
          officeHours: node?.officeHours || null,
          phone: node?.phone?.filter((p): p is string => p !== null) || [],
          googleMapsEmbedSrc: node?.googleMapsEmbedSrc || "",
          name: node?.label || "",
          email: node?.mail || "",
          address: node?.address || "",
        };
      })
      .sort((a, b) => {
        // Put Štorje first
        if (a.name.includes("Štorje")) return -1;
        if (b.name.includes("Štorje")) return 1;
        return 0;
      }) || [];

  // Helper function to parse address string into structured format
  const parseAddress = (addressText: string | { children?: Array<{ children?: Array<{ text?: string }> }> }) => {
    // Address is rich-text, extract plain text
    const plainText = typeof addressText === 'string'
      ? addressText
      : addressText?.children?.[0]?.children?.[0]?.text || '';

    const lines = plainText.split(/\\|[\n\r]+/).map((line: string) => line.trim()).filter((line: string) => line);
    if (lines.length < 2) return null;

    const streetAddress = lines[0].replace(/,$/, ''); // Remove trailing comma if present
    const cityLine = lines[1];
    const match = cityLine.match(/^(\d{4})\s+(.+)$/);

    if (!match) return null;

    return {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: match[2],
      postalCode: match[1],
      addressCountry: "SI"
    };
  };

  // Build schema data from locations
  const allPhones = locations.flatMap(loc => loc.phone).map(phone => {
    // Normalize phone numbers to E.164 format
    const cleaned = phone.replace(/\s/g, '');
    if (cleaned.startsWith('0')) {
      return `+386 ${cleaned.substring(1)}`;
    }
    return phone;
  });

  const schemaAddresses = locations
    .map(loc => parseAddress(loc.address))
    .filter((addr): addr is NonNullable<typeof addr> => addr !== null);

  const schemaEmail = locations[0]?.email || "szo.infos@gmail.com";

  return (
    <>
      <html
        data-theme="mytheme"
        lang="en"
        className={`${montserrat.variable} ${playfairDisplay.variable} antialiased scroll-smooth scroll-pt-48`}
      >
        <head>
          <script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async
            defer
          ></script>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "DentalClinic",
                "name": globalQuery.data.global.pageTitle,
                "description": globalQuery.data.global.siteDescription,
                "url": "https://www.ordinacijabozic.si",
                "logo": globalQuery.data.global.logo,
                "image": globalQuery.data.global.logo,
                "telephone": allPhones,
                "email": schemaEmail,
                "address": schemaAddresses,
                "sameAs": [
                  "https://www.ordinacijabozic.si/ordinacija-storje",
                  "https://www.ordinacijabozic.si/ordinacija-portoroz"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Zobozdravstvene storitve",
                  "itemListElement": serviceCategoriesResponse.data?.serviceCategoryConnection.edges?.map(
                    (edge) => ({
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "MedicalProcedure",
                        "name": edge?.node?.title || ""
                      }
                    })
                  ) || []
                }
              })
            }}
          />
        </head>
        <body className={`font-montserrat min-h-dvh flex flex-col min-w-80 ${globalQuery.data.global.backgroundEffect ? 'with-background' : ''}`}>
          <Navbar items={navigationItems} globalQuery={globalQuery}></Navbar>
          <NoticeAlert {...noticesResponse} />
          <div className="mt-nav-mobile lg:mt-nav grow">{children}</div>
          <Footer locations={locations} />
          <BackToTopButton />
        </body>
      </html>
    </>
  );
}
