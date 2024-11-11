FROM node:22.4-alpine

RUN mkdir -p /usr/src/packages
WORKDIR /usr/src/app

COPY --from=feathers-react-to-do-app-to-do-api /usr/src/packages /usr/src/packages
COPY package*.json .

RUN npm i ../packages/to-do-api-0.0.0.tgz
RUN npm ci

COPY . .

RUN npm run bundle:client

# This just documents what port you expect the image to run on
EXPOSE 3031

CMD ["npm", "run", "dev"]
