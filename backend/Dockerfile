FROM node:14.14.0-alpine
WORKDIR /usr/app
COPY ./package.json ./
RUN npm install
COPY ./ ./
EXPOSE 8000
CMD ["npm", "start"]
