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
  const [currentIndex, setCurrentIndex] = useState(0);

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

    // Move to next notice if available
    if (currentIndex < activeNotices.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
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
    <div
      role="alert"
      className="alert shadow-lg max-w-4xl mx-auto mb-4 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-accent border-accent"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-black h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div className="flex-1">
        <h3 className="font-bold">
          {currentNotice.title}
          {activeNotices.length > 1 && (
            <span className="text-sm font-normal ml-2">
              ({currentIndex + 1}/{activeNotices.length})
            </span>
          )}
        </h3>
        <div className="prose text-sm">
          {currentNotice.optionalAlertText.children.length ? (
            <TinaMarkdown content={currentNotice.optionalAlertText} />
          ) : (
            <TinaMarkdown content={currentNotice.alertBody} />
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="btn btn-sm"
          onClick={acknowledgeNotice}
        >
          Razumem
        </button>
        <Link
          href="/obvestila"
          className="btn btn-sm btn-primary"
          onClick={acknowledgeAllNotices}
        >
          Več
        </Link>
      </div>
    </div>
  );
}
