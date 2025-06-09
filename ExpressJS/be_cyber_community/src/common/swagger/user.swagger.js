const userSwagger = {
   "/user/avatar-local": {
      post: {
         tags: ["Auth"],
         summary: "Login",
         requestBody: {
            content: {
               "multipart/form-data": {
                  schema: {
                     type: "object",
                     properties: {
                        file: { type: "string", format: "binary" },
                        files: {
                           type: "array",
                           items: { type: "string", format: "binary" },
                        },
                     },
                  },
               },
            },
         },
         responses: {
            200: {
               description: "Get all articles successfully",
            },
         },
      },
   },
};

export default userSwagger;
