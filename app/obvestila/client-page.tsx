"use client";

import { NoticeConnectionQuery, NoticeConnectionQueryVariables } from "@/tina/__generated__/types";
import { TinaConnectionClientPageProps } from "@/tina/utils";
import { useTina } from "tinacms/dist/react";
import { useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function ClientObvestilaPage(
  props: TinaConnectionClientPageProps<NoticeConnectionQuery, NoticeConnectionQueryVariables>
) {
  const { data } = useTina({ ...props });
  const [expandedNotice, setExpandedNotice] = useState<string | null>(null);

  const toggleNotice = (id: string) => {
    setExpandedNotice(expandedNotice === id ? null : id);
  };

  // Sort notices by createdAt in descending order
  const sortedNotices = [...data.noticeConnection.edges!].sort((a, b) => {
    return new Date(b!.node!.createdAt).getTime() - new Date(a!.node!.createdAt).getTime();
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Obvestila</h1>
      <ul className="space-y-4">
        {sortedNotices.map((noticeData) => {
          const notice = noticeData!.node!;
          const { alertBody, createdAt, id, title, activeFrom, activeTo, optionalAlertText } = notice;

          return (
            <li
              key={id}
              className="border rounded-lg p-4 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              {(activeFrom || activeTo) && (
                <p className="text-sm text-gray-500 mb-2">
                  {activeFrom && `Od ${new Date(activeFrom).toLocaleDateString("sl-SI")}`}
                  {activeFrom && activeTo && " do "}
                  {activeTo && new Date(activeTo).toLocaleDateString("sl-SI")}
                </p>
              )}
              <div className="prose mb-2">
                <TinaMarkdown content={alertBody} />
              </div>
              {optionalAlertText && (
                <>
                  <button
                    onClick={() => toggleNotice(id)}
                    className="text-primary hover:underline focus:outline-none"
                  >
                    {expandedNotice === id ? "Prikaži manj" : "Prikaži več"}
                  </button>
                  {expandedNotice === id && (
                    <div className="mt-2 p-2 bg-gray-50 rounded prose">
                      <TinaMarkdown content={optionalAlertText} />
                    </div>
                  )}
                </>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Objavljeno: {new Date(createdAt).toLocaleDateString("sl-SI")}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
