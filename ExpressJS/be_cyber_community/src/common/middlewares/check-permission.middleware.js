import { BadrequestException } from "../helpers/exception.helper";
import prisma from "../prisma/init.prisma";

const checkPermision = async (req, res, next) => {
   req.isCheckPermision = true;

   const user = req.user;
   if (!user) {
      throw new BadrequestException("User không tồn tại từ protect");
   }

   // nếu roleID === 1 (quyền ADMIN cao nhất) sẽ cho qua
   if (user.roleId === 1) {
      next();
      return;
   }
   const method = req.method;
   const endpoint = req.baseUrl + req.route?.path;

   const rolePermissionExist = await prisma.rolePermission.findFirst({
      where: {
         roleId: user.roleId,
         Permissions: {
            method: method,
            endpoint: endpoint,
         },
         isActive: true,
         Roles: {
            isActive: true,
         },
      },
   });

   console.log({ rolePermissionExist, user, method, endpoint });

   if(!rolePermissionExist) throw new BadrequestException("Không đủ quyền sử dụng");

   next();
};

export default checkPermision;
