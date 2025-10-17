FROM node:18-alpine
WORKDIR /usr/src/web
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 2999
CMD [ "npm", "run", "dev" ]