"use client";

import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { StaffConnectionQuery } from "@/tina/__generated__/types";

interface TeamPreviewProps {
  staffConnection: StaffConnectionQuery["staffConnection"];
  global: {
    homePage?: {
      teamTitle?: string;
      teamSubtitle?: string;
      teamLinkText?: string;
    };
  };
}

export default function TeamPreview({ staffConnection, global }: TeamPreviewProps) {
  const staffMembers = staffConnection.edges?.map((edge) => edge?.node).filter(Boolean) || [];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-base-100 to-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl lg:text-4xl font-serif font-bold text-gray-800 mb-4"
            data-tina-field={tinaField(global.homePage, "teamTitle")}
          >
            {global.homePage?.teamTitle}
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            data-tina-field={tinaField(global.homePage, "teamSubtitle")}
          >
            {global.homePage?.teamSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {staffMembers.map((staff) => {
            if (!staff) return null;

            const displayImage = staff.teamPreviewImage || staff.image;
            const displayTitle = staff.teamPreviewTitle || staff.title;
            const displayDescription = staff.teamPreviewDescription;
            const displayName = staff.teamPreviewPrefix ? `${staff.teamPreviewPrefix} ${staff.name}` : staff.name;
            const staffSlug = staff._sys.breadcrumbs?.join("/") || staff._sys.filename;
            const staffHref = `/predstavitev/${staffSlug}`;

            return (
              <Link
                key={staff._sys.filename}
                href={staffHref}
                className="text-center group block bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Predstavitev: ${displayName}`}
              >
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  {displayImage ? (
                    <Image
                      src={displayImage}
                      alt={staff.name || "Team member"}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                      data-tina-field={tinaField(staff, "teamPreviewImage") || tinaField(staff, "image")}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <h3
                  className="text-xl font-serif font-bold text-gray-800 mb-1"
                  data-tina-field={tinaField(staff, "name")}
                >
                  {displayName}
                </h3>
                <p
                  className="text-primary font-medium mb-2"
                  title={staff.title}
                  data-tina-field={tinaField(staff, "teamPreviewTitle") || tinaField(staff, "title")}
                >
                  {displayTitle}
                </p>
                {displayDescription && (
                  <p
                    className="text-gray-600 text-sm"
                    data-tina-field={tinaField(staff, "teamPreviewDescription")}
                  >
                    {displayDescription}
                  </p>
                )}
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/predstavitev"
            className="btn btn-primary text-white gap-2 px-8"
          >
            <span data-tina-field={tinaField(global.homePage, "teamLinkText")}>{global.homePage?.teamLinkText}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
