const SITE_URL = "https://www.ordinacijabozic.si";

export interface StructuredAddress {
  street?: string | null;
  postalCode?: string | null;
  city?: string | null;
  country?: string | null;
}

export interface ClinicSchemaLocation {
  phone: readonly string[];
  email?: string | null;
  addressStructured?: StructuredAddress | null;
}

export interface BuildDentalClinicSchemaInput {
  siteTitle: string;
  siteDescription: string;
  logoPath: string;
  locations: readonly ClinicSchemaLocation[];
  serviceCategoryTitles: readonly string[];
}

export interface PostalAddressSchema {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
  addressCountry: string;
}

interface MedicalProcedureOfferSchema {
  "@type": "Offer";
  itemOffered: {
    "@type": "MedicalProcedure";
    name: string;
  };
}

export interface DentalClinicSchema {
  "@context": "https://schema.org";
  "@type": "DentalClinic";
  "@id": string;
  name: string;
  description: string;
  url: string;
  logo: string;
  image: string;
  medicalSpecialty: "Dentistry";
  priceRange: "€€";
  telephone: string[];
  email: string;
  address: PostalAddressSchema[];
  sameAs: string[];
  hasOfferCatalog: {
    "@type": "OfferCatalog";
    name: "Zobozdravstvene storitve";
    itemListElement: MedicalProcedureOfferSchema[];
  };
}

function toAbsoluteSiteUrl(pathOrUrl: string): string {
  const value = pathOrUrl.trim();
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function formatSlovenianPhoneNumber(phone: string): string {
  const trimmed = phone.trim();
  const normalized = trimmed.replace(/[^+\d]/g, "");

  if (normalized.startsWith("+")) {
    return trimmed;
  }

  if (!normalized.startsWith("0")) {
    return trimmed;
  }

  const nationalNumber = normalized.slice(1);

  if (nationalNumber.length === 8 && nationalNumber.startsWith("5")) {
    return `+386 ${nationalNumber.slice(0, 1)} ${nationalNumber.slice(1, 5)} ${nationalNumber.slice(5)}`;
  }

  if (nationalNumber.length === 8) {
    return `+386 ${nationalNumber.slice(0, 2)} ${nationalNumber.slice(2, 5)} ${nationalNumber.slice(5)}`;
  }

  if (nationalNumber.length === 7) {
    return `+386 ${nationalNumber.slice(0, 1)} ${nationalNumber.slice(1, 4)} ${nationalNumber.slice(4)}`;
  }

  return `+386 ${nationalNumber}`;
}

function isNonEmptyString(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function toPostalAddressSchema(
  address: StructuredAddress | null | undefined,
): PostalAddressSchema | null {
  if (
    !isNonEmptyString(address?.street) ||
    !isNonEmptyString(address?.postalCode) ||
    !isNonEmptyString(address?.city)
  ) {
    return null;
  }

  return {
    "@type": "PostalAddress",
    streetAddress: address.street.trim(),
    addressLocality: address.city.trim(),
    postalCode: address.postalCode.trim(),
    addressCountry: isNonEmptyString(address.country)
      ? address.country.trim()
      : "SI",
  };
}

export function buildDentalClinicSchema({
  siteTitle,
  siteDescription,
  logoPath,
  locations,
  serviceCategoryTitles,
}: BuildDentalClinicSchemaInput): DentalClinicSchema {
  const logoUrl = toAbsoluteSiteUrl(logoPath);
  const telephone = locations.flatMap((location) =>
    location.phone.filter(isNonEmptyString).map(formatSlovenianPhoneNumber),
  );
  const address = locations
    .map((location) => toPostalAddressSchema(location.addressStructured))
    .filter((item): item is PostalAddressSchema => item !== null);
  const email =
    locations.find((location) => isNonEmptyString(location.email))?.email ||
    "szo.infos@gmail.com";
  const itemListElement = serviceCategoryTitles
    .filter(isNonEmptyString)
    .map((title) => ({
      "@type": "Offer" as const,
      itemOffered: {
        "@type": "MedicalProcedure" as const,
        name: title.trim(),
      },
    }));

  return {
    "@context": "https://schema.org",
    "@type": "DentalClinic",
    "@id": `${SITE_URL}/#clinic`,
    name: siteTitle,
    description: siteDescription,
    url: SITE_URL,
    logo: logoUrl,
    image: logoUrl,
    medicalSpecialty: "Dentistry",
    priceRange: "€€",
    telephone,
    email,
    address,
    sameAs: [
      `${SITE_URL}/ordinacija-storje`,
      `${SITE_URL}/ordinacija-portoroz`,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Zobozdravstvene storitve",
      itemListElement,
    },
  };
}
