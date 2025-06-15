"use client";

import {
  NoticeConnectionQuery,
  NoticeConnectionQueryVariables,
} from "@/tina/__generated__/types";
import { TinaConnectionClientPageProps } from "@/tina/utils";
import { useTina } from "tinacms/dist/react";
import { useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";
import Link from "next/link";

export default function ClientObvestilaPage(
  props: TinaConnectionClientPageProps<
    NoticeConnectionQuery,
    NoticeConnectionQueryVariables
  >,
) {
  const { data } = useTina({ ...props });
  const [expandedNotice, setExpandedNotice] = useState<string | null>(null);

  const toggleNotice = (id: string) => {
    setExpandedNotice(expandedNotice === id ? null : id);
  };

  // Sort notices by createdAt in descending order
  const sortedNotices = [...data.noticeConnection.edges!].sort((a, b) => {
    return (
      new Date(b!.node!.createdAt).getTime() -
      new Date(a!.node!.createdAt).getTime()
    );
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">Pomembne informacije za vas</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tu najdete vse, kar morate vedeti o našem delovanju - od sprememb urnika do novih storitev, ki vam olajšajo pot do zdravja.
          </p>
        </div>

        {sortedNotices.length === 0 ? (
          /* Empty State */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="mb-8">
                <Image
                  src="/happy-tooth.png"
                  alt="Srečen zob"
                  width={120}
                  height={120}
                  className="mx-auto"
                />
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
                Trenutno ni novih obvestil
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Odlično! Vse teče po načrtu. Redno preverjamo za nova obvestila o spremembah 
                delovnega časa, posebnih akcijah ali važnih informacijah za naše paciente.
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 Uporabni nasveti</h3>
                <ul className="text-left text-blue-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Redno pregledujte to stran za aktualne informacije
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Naročite se na pregled v naprej preko kontaktne forme
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Sledite nam za najnovejše novice in nasvete
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/kontaktiraj-nas"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Kontaktirajte nas
                </Link>
                <Link 
                  href="/#our-services"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                  Naše storitve
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Notices List */
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {sortedNotices.map((noticeData) => {
                const notice = noticeData!.node!;
                const {
                  alertBody,
                  createdAt,
                  id,
                  title,
                  activeFrom,
                  activeTo,
                  optionalAlertText,
                } = notice;

                return (
                  <div key={id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-8">
                      {/* Notice Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">{title}</h2>
                          {(activeFrom || activeTo) && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {activeFrom && `Od ${new Date(activeFrom).toLocaleDateString("sl-SI")}`}
                              {activeFrom && activeTo && " do "}
                              {activeTo && new Date(activeTo).toLocaleDateString("sl-SI")}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Notice Content */}
                      <div className="prose prose-blue max-w-none mb-6 [&_p]:text-gray-700 [&_p]:leading-relaxed [&_strong]:text-gray-800 [&_ul]:text-gray-700 [&_li]:text-gray-700">
                        <TinaMarkdown content={alertBody} />
                      </div>

                      {/* Expandable Content */}
                      {!!optionalAlertText.children.length && (
                        <div className="border-t border-gray-100 pt-6">
                          <button
                            onClick={() => toggleNotice(id)}
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                          >
                            <span>{expandedNotice === id ? "Prikaži manj" : "Prikaži več"}</span>
                            <svg 
                              className={`w-4 h-4 transition-transform ${expandedNotice === id ? 'rotate-180' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {expandedNotice === id && (
                            <div className="mt-4 p-6 bg-gray-50 rounded-xl prose prose-blue max-w-none [&_p]:text-gray-700 [&_p]:leading-relaxed [&_strong]:text-gray-800">
                              <TinaMarkdown content={optionalAlertText} />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Objavljeno: {new Date(createdAt).toLocaleDateString("sl-SI")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
