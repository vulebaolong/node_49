const authSwagger = {
   "/auth/login": {
      post: {
         tags: ["Auth"],
         summary: "Login",
         requestBody: {
            content: {
               "application/json": {
                  schema: {
                     type: "object",
                     properties: {
                        email: { type: "string", example: "example@gmail.com" },
                        password: { type: "string", example: "1234" },
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

export default authSwagger;
