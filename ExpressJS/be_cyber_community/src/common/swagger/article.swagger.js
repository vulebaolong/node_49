const articleSwagger = {
   "/article/": {
      get: {
         tags: ["Article"],
         security: [{ ANH_LONG_BearerAuth: [] }],
         summary: "Get all articles",
         parameters: [
            { name: "page", in: "query", type: "number" },
            { name: "pageSize", in: "query", type: "number" },
            { name: "filters", in: "query", type: "string", description: "truyền lên JSON" },
         ],
         responses: {
            200: {
               description: "Get all articles successfully",
            },
         },
      },
   },
   "/article/{id}": {
      get: {
         tags: ["Article"],
         security: [{ ANH_LONG_BearerAuth: [] }],
         summary: "Get all articles",
         parameters: [{ name: "id", in: "path", description: "id article" }],
         responses: {
            200: {
               description: "Get all articles successfully",
            },
         },
      },
   },
};

export default articleSwagger;
