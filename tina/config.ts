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
        name: "global",
        label: "Global",
        path: "content/global",
        format: "json",
        fields: [
          {
            type: "image",
            name: "landingImage",
            label: "Landing Image"
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
            type: "string",
            name: "type",
            label: "Type",
            required: true,
            options: [
              {
                value: "Specialistično",
                label: "Specialistično"
              },
              {
                value: "Splošno zobozdravstvo",
                label: "Splošno zobozdravstvo"
              }
            ]
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
            label: "Subtitle",
            required: true
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
            required: true
          },
          {
            type: "image",
            name: "icon",
            label: "Service Icon",
            required: true
          },
          {
            type: "string",
            name: "shortDescription",
            label: "Short Description",
            description: "Brief description for service cards on the homepage",
            ui: {
              component: "textarea"
            },
            required: true
          },
          {
            type: "string",
            name: "longDescription",
            label: "Long Description",
            description: "Detailed description for the service page header",
            ui: {
              component: "textarea"
            },
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
