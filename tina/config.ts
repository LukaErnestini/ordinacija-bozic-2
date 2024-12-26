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
        ui: {
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
