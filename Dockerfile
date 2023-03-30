FROM mhart/alpine-node:slim-16

EXPOSE 8080

WORKDIR /app
ADD . /app

CMD ["node", "index.js"]