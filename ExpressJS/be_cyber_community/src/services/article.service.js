import prisma from "../common/prisma/init.prisma";

const articleService = {
   findAll: async (req) => {
      let { page, pageSize } = req.query;
      page = +page > 0 ? +page : 1;
      pageSize = +pageSize > 0 ? +pageSize : 3;

      console.log(page, pageSize);
      console.log(typeof page, typeof pageSize);

      // (page - 1) * pageSize
      const skip = (page - 1) * pageSize;

      const articles = await prisma.articles.findMany({
         take: pageSize, // LIMIT
         skip: skip, // OFFSET,
         orderBy: {
            createdAt: "desc",
         },
      });

      const totalItem = await prisma.articles.count();
      const totalPage = Math.ceil(totalItem / pageSize);

      return {
         page: page, // Số trang
         pageSize: pageSize, // Một trang có bao nhiêu item
         totalItem: totalItem, // Tổng cộng có tất cả bao nhiêu item
         totalPage: totalPage, // Tổng cộng có bao nhiêu trang
         items: articles,
      };
   },
};

export default articleService;
