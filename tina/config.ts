import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Add these utility functions at the top of the file
const sanitizeFilename = (filename: string) => {
  // Replace diacritics/accents with basic latin characters
  const normalized = filename.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // Replace spaces with hyphens and remove unsafe characters
  return normalized
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
};


export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "location",
        label: "Location",
        path: "content/location",
        format: "mdx",
        ui: {
          router: ({ document }) => `/${document._sys.filename}`,
          allowedActions: {
            create: false,
            createNestedFolder: false,
            delete: false,
          },
        },
        fields: [
          {
            name: "label",
            label: "Label",
            type: "string",
            required: true,
          },
          {
            name: "address",
            label: "Address",
            type: "rich-text",
            required: true,
          },
          {
            name: "googleMapsEmbedSrc",
            label: "GoogleMapsEmbedSrc",
            type: "string",
            required: true,
          },
          {
            name: "phone",
            label: "Phone",
            type: "string",
            list: true,
            required: true,
          },
          {
            name: "mail",
            label: "Mail",
            type: "string",
            required: true,
          },
          {
            name: "about",
            label: "About",
            type: "rich-text",
            required: true,
          },
          {
            name: "officeHours",
            label: "Office Hours",
            type: "rich-text",
            required: true,
          },
          {
            name: "images",
            label: "Images",
            type: "image",
            list: true,
          },
        ],
      },
      {
        name: "notice",
        label: "Notice",
        path: "content/notice",
        ui: {
          router: () => "/obvestila",
        },
        format: "mdx",
        defaultItem: () => ({
          createdAt: new Date().toISOString(),
        }),
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true,
          },
          {
            name: "alertBody",
            label: "Alert Body",
            type: "rich-text",
            required: true,
          },
          {
            name: "optionalAlertText",
            label: "Optional Alert Text",
            type: "rich-text",
            description:
              "In case Alert Body is too large to display in the alert popup, this will be displayed instead.",
          },
          {
            name: "activeFrom",
            label: "Active From",
            type: "datetime",
            description: "From when to display alert to visitors.",
            ui: {
              validate: (value, data) => {
                if (data.activeTo && !value) {
                  return "Active From must be set if Active To is set";
                }
              },
            },
          },
          {
            name: "activeTo",
            label: "Active To",
            type: "datetime",
            description: "Until when to display alert to visitors.",
            ui: {
              validate: (value, data) => {
                if (!value && data.activeFrom) {
                  return "Active To must be set if Active From is set";
                }

                if (
                  value &&
                  data.activeFrom &&
                  new Date(value) <= new Date(data.activeFrom)
                ) {
                  return "Active To must be after Active From";
                }
              },
            },
          },
          {
            name: "createdAt",
            label: "Created At",
            type: "datetime",
            required: true,
          },
        ],
      },
      {
        name: "about",
        label: "About",
        path: "content/about",
        format: "mdx",
        ui: {
          router: () => `/predstavitev`,
          allowedActions: {
            create: false,
            createNestedFolder: false,
            delete: false,
          },
        },
        fields: [
          {
            name: "image",
            label: "Image",
            type: "image",
          },
          {
            name: "showImageUnderNavbar",
            label: "Show Image Under Navbar",
            type: "boolean",
          },
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true,
          },
          {
            name: "subtitle",
            label: "Subtitle",
            type: "string",
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            isBody: true,
            required: true,
            templates: [
              {
                name: "EmployeeLink",
                label: "Employee Link",
                fields: [
                  {
                    name: "staff",
                    label: "Staff",
                    type: "reference",
                    collections: ["staff"],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "staff",
        label: "Staff",
        path: "content/staff",
        format: "mdx",
        ui: {
          router: ({ document }) => `/predstavitev/${document._sys.filename}`,
        },
        fields: [
          {
            name: "name",
            label: "Name",
            type: "string",
            required: true,
          },
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true,
          },
          {
            name: "bio",
            label: "Bio",
            description: "Biography of the staff member",
            type: "rich-text",
            isBody: true,
            required: true,
          },
          {
            name: "image",
            label: "Image",
            type: "image",
            required: true,
          },
        ],
      },
      {
        label: "Global Settings",
        name: "global",
        path: "content/global",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            createNestedFolder: false,
            delete: false,
          },
          router: () => `/`,
        },
        fields: [
          {
            type: "image",
            name: "heroImages",
            label: "Hero Images",
            list: true,
          },
          {
            name: "logo",
            label: "Logo",
            type: "image",
            required: true,
          },
          {
            name: "pageTitle",
            label: "Page Title",
            type: "string",
            required: true,
          },
          {
            name: "ourServicesText",
            label: "Our Services Text",
            type: "string",
            required: true,
          },
          {
            name: "heroSubtext",
            label: "Hero Subtext",
            type: "string",
            required: true,
          },
          {
            name: "siteTitle",
            label: "Site Title",
            description: "Title of the site, displayed in the browser tab",
            type: "string",
            required: true,
          },
          {
            name: "siteDescription",
            label: "Site Description",
            description:
              "Description of the site, displayed in the browser tab",
            type: "string",
            required: true,
          },
          {
            name: "backgroundEffect",
            label: "Background Effect",
            description: "Enable decorative background effect",
            type: "boolean",
            required: true,
          },
          {
            type: "object",
            label: "Home Page Content",
            name: "homePage",
            required: true,
            fields: [
              {
                type: "string",
                label: "Why Choose Us Title",
                name: "whyChooseUsTitle",
                required: true,
              },
              {
                type: "string",
                label: "Why Choose Us Subtitle",
                name: "whyChooseUsSubtitle",
                required: true,
              },
              {
                type: "string",
                label: "Experience Title",
                name: "experienceTitle",
                required: true,
              },
              {
                type: "string",
                label: "Experience Description",
                name: "experienceDescription",
                required: true,
              },
              {
                type: "string",
                label: "Modern Equipment Title",
                name: "modernEquipmentTitle",
                required: true,
              },
              {
                type: "string",
                label: "Modern Equipment Description",
                name: "modernEquipmentDescription",
                required: true,
              },
              {
                type: "string",
                label: "Personal Care Title",
                name: "personalCareTitle",
                required: true,
              },
              {
                type: "string",
                label: "Personal Care Description",
                name: "personalCareDescription",
                required: true,
              },
              {
                type: "string",
                label: "Years Experience Stat",
                name: "yearsExperienceStat",
                required: true,
              },
              {
                type: "string",
                label: "Years Experience Label",
                name: "yearsExperienceLabel",
                required: true,
              },
              {
                type: "string",
                label: "Locations Stat",
                name: "locationsStat",
                required: true,
              },
              {
                type: "string",
                label: "Locations Label",
                name: "locationsLabel",
                required: true,
              },
              {
                type: "string",
                label: "Satisfaction Stat",
                name: "satisfactionStat",
                required: true,
              },
              {
                type: "string",
                label: "Satisfaction Label",
                name: "satisfactionLabel",
                required: true,
              },
              {
                type: "string",
                label: "Emergency Help Stat",
                name: "emergencyHelpStat",
                required: true,
              },
              {
                type: "string",
                label: "Emergency Help Label",
                name: "emergencyHelpLabel",
                required: true,
              },
              {
                type: "string",
                label: "Services Subtitle",
                name: "servicesSubtitle",
                required: true,
              },
              {
                type: "string",
                label: "Team Title",
                name: "teamTitle",
                required: true,
              },
              {
                type: "string",
                label: "Team Subtitle",
                name: "teamSubtitle",
                required: true,
              },
              {
                type: "string",
                label: "Team Link Text",
                name: "teamLinkText",
                required: true,
              },
              {
                type: "string",
                label: "Locations Title",
                name: "locationsTitle",
                required: true,
              },
              {
                type: "string",
                label: "Locations Subtitle",
                name: "locationsSubtitle",
                required: true,
              },
              {
                type: "string",
                label: "Storje Description",
                name: "storjeDescription",
                required: true,
              },
              {
                type: "string",
                label: "Portoroz Description",
                name: "portorozDescription",
                required: true,
              },
              {
                type: "string",
                label: "More Info Text",
                name: "moreInfoText",
                required: true,
              },
              {
                type: "string",
                label: "CTA Title",
                name: "ctaTitle",
                required: true,
              },
              {
                type: "string",
                label: "CTA Subtitle",
                name: "ctaSubtitle",
                required: true,
              },
              {
                type: "string",
                label: "Contact Button Text",
                name: "contactButtonText",
                required: true,
              },
              {
                type: "string",
                label: "Call Button Text",
                name: "callButtonText",
                required: true,
              },
              {
                type: "string",
                label: "Call Button Phone",
                name: "callButtonPhone",
                required: true,
              },
            ],
          },
          {
            type: "object",
            label: "Contact Form Settings",
            name: "contactForm",
            required: true,
            fields: [
              {
                type: "object",
                label: "Preset Messages",
                name: "presetMessages",
                list: true,
                required: true,
                ui: {
                  itemProps: (item) => ({
                    label: item.label,
                  }),
                },
                fields: [
                  {
                    type: "string",
                    label: "Label",
                    name: "label",
                    required: true,
                  },
                  {
                    type: "string",
                    label: "Value",
                    name: "value",
                    required: true,
                  },
                  {
                    type: "boolean",
                    label: "Enabled",
                    name: "enabled",
                    required: true,
                  },
                ],
              },
              {
                type: "string",
                label: "Header Title",
                name: "headerTitle",
                required: true,
              },
              {
                type: "string",
                label: "Header Subtitle",
                name: "headerSubtitle",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "serviceCategory",
        label: "Service Category",
        path: "content/service-category",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            console.log(document);
            return `/${document._sys.filename}`;
          },
        },
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true,
          },
          {
            name: "shortDescription",
            label: "Short Description",
            type: "string",
            required: true,
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            required: true,
            templates: [
              {
                name: "Video",
                label: "Video",
                fields: [
                  {
                    name: "url",
                    label: "Video URL",
                    type: "string",
                    required: true,
                  },
                  {
                    name: "autoPlay",
                    label: "Auto Play",
                    type: "boolean",
                    required: false,
                  },
                  {
                    name: "controls",
                    label: "Show Controls",
                    type: "boolean",
                    required: false,
                  },
                ],
              },
              {
                name: "FeatureGrid",
                label: "Feature Grid",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "string",
                    name: "item1Title",
                    label: "Item 1 Title",
                  },
                  { type: "image", name: "item1Image", label: "Item 1 Image" },
                  {
                    type: "rich-text",
                    name: "item1Body",
                    label: "Item 1 Body",
                  },
                  {
                    type: "string",
                    name: "item2Title",
                    label: "Item 2 Title",
                  },
                  { type: "image", name: "item2Image", label: "Item 2 Image" },
                  {
                    type: "rich-text",
                    name: "item2Body",
                    label: "Item 2 Body",
                  },
                  {
                    type: "string",
                    name: "item3Title",
                    label: "Item 3 Title",
                  },
                  { type: "image", name: "item3Image", label: "Item 3 Image" },
                  {
                    type: "rich-text",
                    name: "item3Body",
                    label: "Item 3 Body",
                  },
                  {
                    type: "string",
                    name: "item4Title",
                    label: "Item 4 Title",
                  },
                  { type: "image", name: "item4Image", label: "Item 4 Image" },
                  {
                    type: "rich-text",
                    name: "item4Body",
                    label: "Item 4 Body",
                  },
                ],
              },
            ],
          },
          {
            name: "icon",
            label: "Icon",
            type: "image",
            required: true,
          },
        ],
      },
      {
        name: "services",
        label: "Services",
        path: "content/services",
        format: "mdx",
        defaultItem: () => ({ type: "Splošno zobozdravstvo" }), // this is deprecated ?
        ui: {
          router: ({ document }) => `/storitve/${document._sys.filename}`,
          filename: {
            readonly: false,
            slugify: (values) => sanitizeFilename(values?.title || ""),
          },
        },
        fields: [
          {
            type: "number",
            name: "order",
            label: "Order",
            description:
              "Order of the service in the category, when displayed in a list. Can use negative numbers to display services or decimal numbers to display services in between. Clunky but it works.",
          },
          {
            type: "reference",
            name: "category",
            label: "Category",
            required: true,
            collections: ["serviceCategory"],
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle",
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
          },
          {
            type: "image",
            name: "icon",
            label: "Service Icon",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body Content",
            description: "Main content of the service page",
            isBody: true,
            required: true,
            templates: [
              {
                name: "FeatureGrid",
                label: "Feature Grid",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "string",
                    name: "item1Title",
                    label: "Item 1 Title",
                  },
                  { type: "image", name: "item1Image", label: "Item 1 Image" },
                  {
                    type: "rich-text",
                    name: "item1Body",
                    label: "Item 1 Body",
                  },
                  {
                    type: "string",
                    name: "item2Title",
                    label: "Item 2 Title",
                  },
                  { type: "image", name: "item2Image", label: "Item 2 Image" },
                  {
                    type: "rich-text",
                    name: "item2Body",
                    label: "Item 2 Body",
                  },
                  {
                    type: "string",
                    name: "item3Title",
                    label: "Item 3 Title",
                  },
                  { type: "image", name: "item3Image", label: "Item 3 Image" },
                  {
                    type: "rich-text",
                    name: "item3Body",
                    label: "Item 3 Body",
                  },
                  {
                    type: "string",
                    name: "item4Title",
                    label: "Item 4 Title",
                  },
                  { type: "image", name: "item4Image", label: "Item 4 Image" },
                  {
                    type: "rich-text",
                    name: "item4Body",
                    label: "Item 4 Body",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
