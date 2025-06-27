FROM node:24

WORKDIR /app

# thay đổi thư viên thêm/ xoá thư viện
COPY package.json ./
RUN npm install

# thay đổi code
COPY . .

RUN npx prisma generate

RUN npm run build

# 1.64GB
# docker image build -t img-be_cyber_community .