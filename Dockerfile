FROM public.ecr.aws/lambda/nodejs:22
# Copy function code
COPY index.mjs package.json ./
CMD [ "index.handler" ]
