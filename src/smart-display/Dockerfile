FROM node:12

RUN ["npm", "i", "-g", "serve"]

WORKDIR /usr/src/app
COPY src/smart-display/package.json ./
RUN ["npm", "install"]
COPY src/smart-display/. .
RUN ["npm", "run", "build"]

EXPOSE 5000

CMD ["serve", "-s", "build"]