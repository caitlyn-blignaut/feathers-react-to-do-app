FROM node:22.4-alpine

RUN mkdir -p /usr/src/packages
WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run bundle:client

# This just documents what port you expect the image to run on
EXPOSE 3030

CMD ["npm", "run", "dev"]
