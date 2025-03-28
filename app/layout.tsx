import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import client from "@/tina/__generated__/client";
import NoticeAlert from "@/components/notice/notice-alert";
import { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap"
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap"
});

export async function generateMetadata(): Promise<Metadata> {
  const globalQuery = await client.queries.global({ relativePath: "global.json" });
  return {
    title: globalQuery.data.global.siteTitle,
    description: globalQuery.data.global.siteDescription
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locationsResponse, noticesResponse, serviceCategoriesResponse, globalQuery] = await Promise.all([
    client.queries.locationConnection(),
    client.queries.noticeConnection(),
    client.queries.serviceCategoryConnection(),
    client.queries.global({ relativePath: "global.json" })
  ]);

  // Transform service categories data into navigation structure
  const serviceItems =
    serviceCategoriesResponse.data?.serviceCategoryConnection.edges?.map((edge) => ({
      name: edge?.node?.title || "",
      href: `/${edge?.node?._sys.filename}`
    })) || [];

  const navigationItems = [
    {
      name: "Predstavitev",
      href: "/predstavitev"
    },
    {
      name: "Storitve",
      subItems: serviceItems
    },
    {
      name: "Ordinacija Štorje",
      href: "/ordinacija-storje"
    },
    {
      name: "Ordinacija Portorož",
      href: "/ordinacija-portoroz"
    },
    {
      name: "Obvestila",
      href: "/obvestila"
    }
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
          email: node?.mail || ""
        };
      })
      .sort((a, b) => {
        // Put Štorje first
        if (a.name.includes("Štorje")) return -1;
        if (b.name.includes("Štorje")) return 1;
        return 0;
      }) || [];

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
        </head>
        <body className="font-montserrat min-h-dvh flex flex-col min-w-80">
          <Navbar
            items={navigationItems}
            globalQuery={globalQuery}
          ></Navbar>
          <NoticeAlert {...noticesResponse} />
          <div className="mt-nav-mobile lg:mt-nav grow">{children}</div>
          <Footer locations={locations} />
        </body>
      </html>
    </>
  );
}
