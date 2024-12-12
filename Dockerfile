#node
FROM node:22-alpine

#ambiente
WORKDIR /app
COPY package*.json ./
RUN npm install

#build
COPY . .
RUN npm run build

#play
EXPOSE 3000
CMD ["node", "dist/index.js"]