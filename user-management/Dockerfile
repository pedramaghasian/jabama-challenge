FROM node:14.15.5-alpine3.13 
WORKDIR /usr/src/app
COPY ./package.json .
RUN npm install
COPY ./nest-cli.json .
COPY ./tsconfig*.json .
COPY . .
RUN npm run build
CMD [ "node", "dist/src/main.js" ]

