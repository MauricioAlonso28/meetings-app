FROM node:23-alpine3.20

WORKDIR /src/app/nestjs

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]