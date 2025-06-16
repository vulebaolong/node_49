import express from "express";
import { handleError } from "./src/common/helpers/handle-err.helper";
import rootRouter from "./src/routers/root.router";
import logApi from "./src/common/morgan/init.morgan";
import cors from "cors";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "./src/common/graphql/schema.graphql";
import root from "./src/common/graphql/root.graphql";
import { ruruHTML } from "ruru/server";
import protectGraphQL from "./src/common/graphql/protect.graphql";
import { createServer } from "http";
import initSocket from "./src/common/socket/init.socket";

var app = express();

// middleware
app.use(express.json());
app.use(logApi);
app.use(
   cors({
      origin: ["https://google.com", "http://localhost:3000"],
   })
);
app.use(express.static("."));

// Serve the GraphiQL IDE.
app.get("/ruru", (_req, res) => {
   res.type("html");
   res.end(ruruHTML({ endpoint: "/graphql" }));
});
// Create and use the GraphQL handler.
app.all(
   "/graphql",
   createHandler({
      schema: schema,
      rootValue: root,
      context: async (req) => {
         const user = await protectGraphQL(req);
         return {
            user: user,
         };
      },
   })
);

// gắn rootRouter vào app
// app: http://localhost:3069
app.use(rootRouter);
// Middleware gom lỗi và chỉ nên có 1 trong nguyên cả ứng dụng
// Nên để cuối cùng
app.use(handleError);

const httpServer = createServer(app);

initSocket(httpServer);

httpServer.listen(3069, () => {
   console.log(`Server running on port http://localhost:3069`);
});

/**
 * QUAN TRỌNG
 * express version thấp hơn 5 thì sẽ cần bọc try/catch để xử lý lỗi
 * express version từ 5 trở lên thì không cần nữa
 */

/**
 * express: lõi để xây dựng BE -> API
 * nodemon: reload lại server khi có code thay
 * mysql2: để tương tác với DB bằng CÂU LỆNH SQL
 * sequelize: ORM giúp tương tác với DB bằng function
 * sequelize-auto: giúp kéo table vào trong code và tự tạo ra model (DATABASE FIRST),
 * extensionless: giúp import file mà không cần phải thêm đuôi js
 * morgan: giúp show log ra terminal khi có 1 api gọi tới
 * chalk: tô màu cho terminal đẹp đẹp
 * dotenv: để đọc biến trong file .env
 * prisma: ORM tương tác DB
 *    - npx prisma db pull
 *    - npx prisma generate
 * cors: mở bảo vệ CORS
 * bcrypt: mã hoá password
 * jsonwebtoken: tạo token / thay thế việc xác minh bằng email / password
 * nodemailer: gửi email
 * jest: giúp viết unit test
 * swagger-ui-express: tích hợp swagger
 * graphql-http: giúp tương tác với graphql
 * graphql: core của graphql
 * ruru: công cụ gọi api graphql giống postman
 * multer: giúp upload file
 * cloudinary: upload hình ảnh lên đám mây
 * socket.io: realtime hỗ trợ chức năng chat
 */

/**
 * 
const data = pm.response.json()

pm.globals.set("accessToken",  data.data.accessToken )
pm.globals.set("refreshToken",  data.data.refreshToken )
 */

/*
"test": "node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage --watch",
 */
