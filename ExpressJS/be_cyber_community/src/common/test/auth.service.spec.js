import { describe, it, jest, beforeEach, afterEach, expect } from "@jest/globals";
import authService from "../../services/auth.service";
import prisma from "../prisma/init.prisma";

describe("Register", () => {
   beforeEach(() => {
      // console.log(`beforeEach`);
      jest.spyOn(prisma.users, "findUnique");
      jest.spyOn(prisma.users, "create");
   });
   afterEach(() => {
      // console.log(`afterEach`);
      jest.restoreAllMocks();
   });

   it("Case 1: Tạo người dùng mới với thông tin hợp lệ", async () => {
      prisma.users.findUnique.mockResolvedValue(null);
      prisma.users.create.mockResolvedValue({
         id: 32,
         email: "lethitest@gmail.com",
         fullName: "le thi test",
         avatar: null,
         password: "$2b$10$fkS09jDfxu0lyZNEv6b2.O.3xFAx96HFphKsXbjCmKmf4aEQKfrZG",
         facebookId: null,
         googleId: null,
         roleId: 2,
         deletedBy: 0,
         isDeleted: false,
         deletedAt: null,
         createdAt: "2025-06-06T13:15:25.000Z",
         updatedAt: "2025-06-06T13:15:25.000Z",
      });

      // console.log(`Case 1`);
      const reqBody = {
         body: {
            email: "lethitest@gmail.com",
            password: "1234",
            fullName: "le thi test",
         },
      };
      const result = await authService.register(reqBody);
      console.log({ result });

      expect(result).not.toHaveProperty("password");
      expect(result).toHaveProperty("id");
   });

   it("Case 2: Tạo người dùng mới với email đã tồn tại", () => {
      // console.log(`Case 2`);
   });
});
