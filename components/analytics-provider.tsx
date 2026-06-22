"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

const STORAGE_KEY = "ordinacija-bozic-cookie-consent-v1";

type ConsentValue = "granted" | "denied" | null;

/**
 * GDPR-compliant analytics setup.
 *
 * - Google Analytics is NOT loaded until the visitor explicitly accepts cookies.
 *   No GA cookies are set, no requests sent to Google, until consent is granted.
 * - User's choice (accept / reject) is stored in localStorage so the banner only
 *   appears once per browser/device.
 * - If the GA Measurement ID env var isn't configured, the banner does not show
 *   at all (since there's nothing to consent to).
 *
 * To re-open the banner programmatically (e.g. from a "Cookie preferences"
 * link in the footer), remove the storage key:
 *     localStorage.removeItem("ordinacija-bozic-cookie-consent-v1")
 */
export default function AnalyticsProvider() {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [mounted, setMounted] = useState(false);

  // On mount (browser only) read any stored decision.
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "granted" || stored === "denied") {
        setConsent(stored as ConsentValue);
      }
    } catch {
      // localStorage may be unavailable (private browsing on some browsers);
      // we simply treat that as "no decision yet" and show the banner.
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "granted");
    } catch {
      /* swallow */
    }
    setConsent("granted");
  };

  const reject = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "denied");
    } catch {
      /* swallow */
    }
    setConsent("denied");
  };

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  // Don't show the banner if we have no analytics configured — there's nothing
  // to consent to in that case.
  const showBanner = mounted && consent === null && Boolean(gaId);
  const shouldLoadAnalytics = mounted && consent === "granted" && Boolean(gaId);

  return (
    <>
      {shouldLoadAnalytics && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </Script>
        </>
      )}

      {showBanner && <CookieBanner onAccept={accept} onReject={reject} />}
    </>
  );
}

function CookieBanner({
  onAccept,
  onReject,
}: {
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4 pointer-events-none"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 sm:p-6 pointer-events-auto">
        <div className="flex flex-col gap-4">
          <div>
            <h2
              id="cookie-banner-title"
              className="text-lg font-serif font-bold text-gray-800 mb-2"
            >
              Spoštujemo vašo zasebnost
            </h2>
            <p
              id="cookie-banner-desc"
              className="text-sm text-gray-600 leading-relaxed"
            >
              Za izboljšanje spletne strani uporabljamo Google Analytics. Ti
              piškotki zbirajo anonimne podatke o obiskih (število obiskovalcev,
              najbolj obiskane strani, vir prometa). Brez vašega soglasja jih
              ne nastavimo. Več si lahko preberete v naši{" "}
              <Link
                href="/politika-zasebnosti"
                className="text-primary underline hover:text-primary/80"
              >
                politiki zasebnosti
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
            <button
              type="button"
              onClick={onReject}
              className="btn btn-sm btn-ghost text-gray-700 hover:bg-gray-100"
            >
              Zavrni
            </button>
            <button
              type="button"
              onClick={onAccept}
              className="btn btn-sm btn-primary text-white"
            >
              Sprejmi piškotke
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
