import { Server } from "socket.io";
import prisma from "../prisma/init.prisma";

const initSocket = (httpServer) => {
   const io = new Server(httpServer, {
      /* options */
   });

   io.on("connection", (socket) => {
      console.log(`id`, socket.id);

      socket.on("CREATE_ROOM", async (data) => {
         try {
            console.log("CREATE_ROOM", data);
            let { ownerId, targetUserIds } = data;

            targetUserIds = targetUserIds || [];
            const uniqueUserIds = Array.from(new Set([...targetUserIds, ownerId]));
            const countUserIds = uniqueUserIds.length;

            console.log("uniqueUserIds", uniqueUserIds);

            if (countUserIds < 2) {
               throw new Error("Bắt buộc phải tối thiểu 2 member");
            }

            await prisma.$transaction(async (tx) => {
               // kiểm tra group chat đã tồn tại hay chưa
               let chatGroupsExist = await tx.chatGroups.findMany({
                  where: {
                     ChatGroupMembers: {
                        every: {
                           userId: {
                              in: uniqueUserIds,
                           },
                        },
                        some: {}, // đảm bảo phải có thành viên
                     },
                  },
                  include: {
                     ChatGroupMembers: {
                        select: {
                           userId: true,
                        },
                     },
                  },
               });

               console.log({
                  chatGroupsExist,
               });

               if (!chatGroupsExist.length) {
                  // tạo ra group chat
                  chatGroupsExist = await tx.chatGroups.createMany({
                     data: {
                        ownerId: ownerId,
                        name: countUserIds <= 2 ? null : "Chat Nhóm",
                     },
                  });

                  const dataCreateGroupMembers = uniqueUserIds.map((userId) => {
                     return {
                        userId: userId,
                        chatGroupId: chatGroupsExist.id,
                     };
                  });

                  // tạo từng thành viên cho goup
                  await tx.chatGroupMembers.createMany({
                     data: dataCreateGroupMembers,
                  });
               }

               console.log({
                  chatGroupsExist,
               });

               // luôn tồn tại chatGroupsExist
               socket.join(`chat${chatGroupsExist[0].id}`);

               console.log(`id:${ownerId} join room: `, `chat${chatGroupsExist[0].id}`);

               socket.emit("CREATE_ROOM", {
                  chatGroupId: chatGroupsExist[0].id,
               });
            });
         } catch (error) {
            console.log(`Lỗi CREATE_ROOM`, error);
         }
      });

      socket.on("SEND_MESSAGE", async (data) => {
         console.log("SEND_MESSAGE", data);
         const { message, userIdSender, userIdRecipient, chatGroupId } = data;

         const createdAt = new Date().toISOString();
         io.to(`chat${chatGroupId}`).emit("SEND_MESSAGE", {
            messageText: message,
            userIdSender: userIdSender,
            chatGroupId: chatGroupId,
            createdAt: createdAt,
         });

         await prisma.chatMessages.create({
            data: {
               chatGroupId: chatGroupId,
               messageText: message,
               userIdSender: userIdSender,
               createdAt: createdAt,
            },
         });
      });

      socket.on("LEAVE_ROOM", (payload) => {
         console.log("LEAVE_ROOM", payload);

         socket.leave("")
      });
   });
};

export default initSocket;
