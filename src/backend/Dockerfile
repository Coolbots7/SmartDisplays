FROM node:12

WORKDIR /usr/src/app
COPY src/backend/package.json ./
RUN ["npm", "install"]
COPY src/backend/. ./

EXPOSE 3000

CMD ["node", "./server.js"]