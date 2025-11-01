FROM public.ecr.aws/lambda/nodejs:22
# Copy function code
COPY index.js package.json ./
CMD [ "index.handler" ]
