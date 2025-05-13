export const responseSuccess = (data = null, message = `OK`, statusCode = 200) => {
   return {
      stautus: `success`,
      statusCode: statusCode,
      message: message,
      data: data,
      doc: "domain.com/swagger",
   };
}


