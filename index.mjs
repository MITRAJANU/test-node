export const handler = async (event) => {
  const response = {
    statusCode: 200,
    body: { message: "Hello from Lambda ALB!" }
  };
return response;
};
