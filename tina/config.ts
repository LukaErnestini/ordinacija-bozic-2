import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
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
            delete: false
          }
        },
        fields: [
          {
            name: "label",
            label: "Label",
            type: "string",
            required: true
          },
          {
            name: "address",
            label: "Address",
            type: "rich-text",
            required: true
          },
          {
            name: "googleMapsEmbedSrc",
            label: "GoogleMapsEmbedSrc",
            type: "string",
            required: true
          },
          {
            name: "phone",
            label: "Phone",
            type: "string",
            list: true,
            required: true
          },
          {
            name: "mail",
            label: "Mail",
            type: "string",
            required: true
          },
          {
            name: "about",
            label: "About",
            type: "rich-text",
            required: true
          },
          {
            name: "officeHours",
            label: "Office Hours",
            type: "rich-text",
            required: true
          },
          {
            name: "images",
            label: "Images",
            type: "image",
            list: true
          }
        ]
      },
      {
        name: "notice",
        label: "Notice",
        path: "content/notice",
        ui: {
          router: () => "/obvestila"
        },
        format: "mdx",
        defaultItem: () => ({
          createdAt: new Date().toISOString()
        }),
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true
          },
          {
            name: "alertBody",
            label: "Alert Body",
            type: "rich-text",
            required: true
          },
          {
            name: "optionalAlertText",
            label: "Optional Alert Text",
            type: "rich-text",
            description:
              "In case Alert Body is too large to display in the alert popup, this will be displayed instead."
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
              }
            }
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

                if (value && data.activeFrom && new Date(value) <= new Date(data.activeFrom)) {
                  return "Active To must be after Active From";
                }
              }
            }
          },
          {
            name: "createdAt",
            label: "Created At",
            type: "datetime",
            required: true
          }
        ]
      },
      {
        name: "about",
        label: "About",
        path: "content/about",
        format: "mdx",
        ui: {
          router: () => `/predstavitev`,
          allowedActions: { create: false, createNestedFolder: false, delete: false }
        },
        fields: [
          {
            name: "image",
            label: "Image",
            type: "image"
          },
          {
            name: "showImageUnderNavbar",
            label: "Show Image Under Navbar",
            type: "boolean"
          },
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true
          },
          {
            name: "subtitle",
            label: "Subtitle",
            type: "string"
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
                    collections: ["staff"]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "staff",
        label: "Staff",
        path: "content/staff",
        format: "mdx",
        ui: {
          router: ({ document }) => `/predstavitev/${document._sys.filename}`
        },
        fields: [
          {
            name: "name",
            label: "Name",
            type: "string",
            required: true
          },
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true
          },
          {
            name: "bio",
            label: "Bio",
            description: "Biography of the staff member",
            type: "rich-text",
            isBody: true,
            required: true
          },
          {
            name: "image",
            label: "Image",
            type: "image",
            required: true
          }
        ]
      },
      {
        name: "global",
        label: "Global",
        path: "content/global",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            createNestedFolder: false,
            delete: false
          },
          router: () => `/`
        },
        fields: [
          {
            name: "landingImage",
            label: "Landing Image",
            type: "image",
            required: true
          },
          {
            name: "logo",
            label: "Logo",
            type: "image",
            required: true
          },
          {
            name: "pageTitle",
            label: "Page Title",
            type: "string",
            required: true
          },
          {
            name: "ourServicesText",
            label: "Our Services Text",
            type: "string",
            required: true
          }
        ]
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
          }
        },
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true
          },
          {
            name: "shortDescription",
            label: "Short Description",
            type: "string",
            required: true
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            required: true
          },
          {
            name: "icon",
            label: "Icon",
            type: "image",
            required: true
          }
        ]
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
            readonly: true,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, "-")}` || "";
            }
          }
        },
        fields: [
          {
            type: "reference",
            name: "category",
            label: "Category",
            required: true,
            collections: ["serviceCategory"]
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
            isTitle: true
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle"
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image"
          },
          {
            type: "image",
            name: "icon",
            label: "Service Icon",
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body Content",
            description: "Main content of the service page",
            isBody: true,
            required: true
          },
          {
            type: "object",
            name: "faq",
            label: "FAQ Section",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.question };
              }
            },
            fields: [
              {
                type: "string",
                name: "question",
                label: "Question",
                required: true
              },
              {
                type: "string",
                name: "answer",
                label: "Answer",
                ui: {
                  component: "textarea"
                },
                required: true
              }
            ]
          }
        ]
      }
    ]
  }
});
