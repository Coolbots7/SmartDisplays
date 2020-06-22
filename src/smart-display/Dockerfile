FROM node:12

WORKDIR /usr/src/app

RUN ["npm", "i", "-g", "serve"]

COPY src/smart-display/package.json ./

RUN ["npm", "install"]

COPY src/smart-display/. .

RUN ["npm", "run", "build"]

EXPOSE 5000

CMD ["serve", "-s", "build"]