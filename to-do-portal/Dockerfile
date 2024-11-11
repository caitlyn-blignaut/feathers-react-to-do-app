FROM node:22.4-alpine

RUN mkdir -p /usr/src/packages
WORKDIR /usr/src/app

COPY --from=feathers-react-to-do-app-to-do-api /usr/src/packages /usr/src/packages
COPY --from=feathers-react-to-do-app-integration-api /usr/src/packages /usr/src/packages
COPY package*.json .

RUN npm i ../packages/to-do-api-0.0.0.tgz ../packages/integration-api-0.0.0.tgz
# npm ci installs exact versions specified in package-lock
RUN npm ci 

COPY . .

# EXPOSE 5173 - not mandatory

CMD ["npm", "run", "dev"]
