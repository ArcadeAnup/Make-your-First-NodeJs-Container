FROM node:20-alpine

WORKDIR /app

COPY package.json package.json
RUN npm install 
COPY server.js server.js
COPY . .

EXPOSE 3000

CMD ["npm", "start"]


