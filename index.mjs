export const handler = async (event) => {
  const response = {
    statusCode: 200,
<<<<<<< HEAD
    body: { message: "Hello from Lambda ALB!" }
=======
    body: JSON.stringify('Hello from Lambda7'),
>>>>>>> 3a20819843df25b317dc4b47e3c3865dc76fafea
  };
return response;
};
