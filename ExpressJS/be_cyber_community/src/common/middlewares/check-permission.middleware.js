const checkPermision = (req, res, next) => {
   req.isCheckPermision = true;


   next();
};

export default checkPermision;
