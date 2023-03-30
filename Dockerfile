FROM node:alpine

EXPOSE 8080

WORKDIR /app
ADD . /app

CMD ["node", "index.js"]