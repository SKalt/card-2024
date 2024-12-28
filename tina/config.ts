import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "book",
        label: "Books",
        path: "content/shelves",
        fields: [
          {
            name: "title",
            type: "string",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            name: "author",
            type: "string",
            label: "Author",
            required: true,
          },
          {
            name: "series",
            label: "Series",
            type: "reference",
            collections: ["series"],
          },
          // {
          //   // TODO: GoodReads? StoryGraph? ISBN?
          //   name: "",
          //   label: "",
          // },
          {
            name: "body",
            type: "rich-text",
            label: "Body",
            isBody: true,
          },
          {
            type: "boolean",
            name: "recommended",
            label: "Recommended",
          }
        ],
      },
      {
        name: "author",
        label: "Author",
        path: "content/authors",
        fields: [
          {
            name: "name",
            type: "string",
            label: "Name",
            isTitle: true,
            required: true,
          },
          {
            name: "bio",
            type: "string",
            label: "Bio",
          },
        ],
      },
      {
        name: "series",
        label: "Series",
        path: "content/series",
        fields: [
          {
            name: "title",
            type: "string",
            label: "Title",
            isTitle: true,
            required: true,
          },
          // {
          //   name: "books",
          //   type: "reference",
          //   label: "Books",
          //   collections: ["book"],
          // },
        ],
      },
    ],
  },
});
