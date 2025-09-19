FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 9000

CMD ["node", "app.js"]