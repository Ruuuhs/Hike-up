FROM node:14-alpine
WORKDIR /front
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build


CMD [ "yarn", "start" ]
