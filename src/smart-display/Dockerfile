FROM node:12

WORKDIR /usr/src/app

COPY src/smart-display/package.json ./

RUN ["npm", "install"]

COPY src/smart-display/. .

EXPOSE 3001

CMD ["npm", "start"]