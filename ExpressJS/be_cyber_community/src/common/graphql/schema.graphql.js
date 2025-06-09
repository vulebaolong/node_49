import { buildSchema } from "graphql";

// Các loại type trong graphql
// Int số nguyên
// Float Số thực
// String chuỗi
// Boolean đúng/ sai
// ID định nghĩa duy nhất

const Article = /* GraphQL */ `
   type Article {
      id: ID
      title: String
      content: String
      imageUrl: String
      views: Int
      userId: Int
      deletedBy: Int
      deletedAt: String
      createdAt: String
      updatedAt: String
   }
`;

// Construct a schema, using GraphQL schema language
const schema = buildSchema(/* GraphQL */ `
   ${Article}

   type Pagination {
      page: Int
      pageSize: Int
      totalItem: Int
      totalPage: Int
      items: [Article]
   }

   input ArticleFilterInput {
      title: String
      content: String
      userId: Int
      views: Int
   }

   type LoginRes {
      accessToken: String
      refreshToken: String
   }

   # Khi lấy dữ liệu
   # method GET
   type Query {
      getListArticle(page: Int, pageSize: Int, filters: ArticleFilterInput): Pagination
   }

   # Chừa Query, còn lại dùng mutation
   type Mutation {
      login(email: String, password: String): LoginRes
      hello: String
   }
`);

export default schema;
