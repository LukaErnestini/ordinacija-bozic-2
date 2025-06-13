"use client";

import { NoticeConnectionQuery, NoticeConnectionQueryVariables } from "@/tina/__generated__/types";
import { useTina } from "tinacms/dist/react";
import { useEffect, useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { TinaConnectionClientPageProps } from "@/tina/utils";
import Link from "next/link";

export default function NoticeAlert(
  props: TinaConnectionClientPageProps<NoticeConnectionQuery, NoticeConnectionQueryVariables>
) {
  const { data } = useTina(props);
  const [acknowledgedNotices, setAcknowledgedNotices] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [currentIndex] = useState(0);

  // Load acknowledged notices from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("acknowledgedNotices");
    if (stored) {
      setAcknowledgedNotices(new Set(JSON.parse(stored)));
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Find all active and unacknowledged notices
  const activeNotices = data.noticeConnection.edges
    ?.filter((edge) => {
      const notice = edge?.node;
      if (!notice) return false;

      const now = new Date();
      const activeFrom = notice.activeFrom ? new Date(notice.activeFrom) : null;
      const activeTo = notice.activeTo ? new Date(notice.activeTo) : null;

      const isActive = (!activeFrom || activeFrom <= now) && (!activeTo || activeTo >= now);

      return isActive && !acknowledgedNotices.has(notice.id);
    })
    .map((edge) => edge!.node!);

  if (!activeNotices?.length || currentIndex >= activeNotices.length) return null;

  const currentNotice = activeNotices[currentIndex];

  const acknowledgeNotice = () => {
    const newAcknowledged = new Set(acknowledgedNotices);
    newAcknowledged.add(currentNotice.id);
    setAcknowledgedNotices(newAcknowledged);
    localStorage.setItem("acknowledgedNotices", JSON.stringify(Array.from(newAcknowledged)));
  };

  const acknowledgeAllNotices = () => {
    const newAcknowledged = new Set(acknowledgedNotices);
    activeNotices.forEach((notice) => {
      newAcknowledged.add(notice.id);
    });
    setAcknowledgedNotices(newAcknowledged);
    localStorage.setItem("acknowledgedNotices", JSON.stringify(Array.from(newAcknowledged)));
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" />
      
      {/* Alert Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4">
        <div 
          role="alert"
          className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/90 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-serif font-bold text-white">{currentNotice.title}</h3>
                <p className="text-white/80 text-sm">Pomembno obvestilo</p>
              </div>
              {activeNotices.length > 1 && (
                <div className="bg-white/20 rounded-full px-2 py-1">
                  <span className="text-white text-xs font-medium">
                    {currentIndex + 1} / {activeNotices.length}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="prose prose-sm max-w-none [&_p]:text-gray-700 [&_p]:leading-relaxed [&_strong]:text-gray-800 [&_ul]:text-gray-700 [&_li]:text-gray-700 [&_p]:mb-3">
              <TinaMarkdown content={currentNotice.alertBody} />
            </div>

            {/* Date Info */}
            {(currentNotice.activeFrom || currentNotice.activeTo) && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2 text-amber-800 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">
                    {currentNotice.activeFrom && `Od ${new Date(currentNotice.activeFrom).toLocaleDateString("sl-SI")}`}
                    {currentNotice.activeFrom && currentNotice.activeTo && " do "}
                    {currentNotice.activeTo && new Date(currentNotice.activeTo).toLocaleDateString("sl-SI")}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium text-sm"
                onClick={acknowledgeNotice}
              >
                Razumem
              </button>
              <Link
                href="/obvestila"
                className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium text-sm text-center"
                onClick={acknowledgeAllNotices}
              >
                Prikaži vse
              </Link>
            </div>
            {activeNotices.length > 1 && (
              <p className="text-center text-xs text-gray-500 mt-2">
                Še {activeNotices.length - 1} obvestil
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
