import express from "express";

const app = express();

// middleware
app.use(express.json())

app.get("/", (req, res, next) => {
   res.json("hello world");
});

// 4 cách nhận dữ liệu từ FE (hê thống khác)
// Query
// Cách nhận biết: bắt đầu bằng dấu chẩm hỏi (?), phân tách biến bằng dấu và (&)
// Thường sử dụng: phân trang, lọc, tim kiếm
app.get("/query", (req, res, next) => {
   const query = req.query;

   console.log(query);

   res.json(query);
});

// Params
// Cách nhận biết: bắt đầu bằng dấu sẹc (/:id)
// Thường sử dụng: để lấy thông tin chi tiết của một item (detail)
app.get("/params/:id", (req, res, next) => {
   const params = req.params;

   console.log(params);

   res.json(params);
});

// headers
// Thường sử dụng: token, x-api-key
app.delete("/headers", (req, res, next) => {
   const headers = req.headers;

   console.log(headers);

   res.json(headers);
});

// body
// sẽ cần middleware: express.json() để chuyển từ dữ liệu JSON => JAVASCRIPT
// Thường sử dụng: khi tạo mới, dữ liệu gửi lên nhiều
app.post("/body", (req, res, next) => {
   const body = req.body;

   console.log(body);

   res.json(body);
});

app.listen(3069, () => {
   console.log(`Server running on port http://localhost:3069`);
});
