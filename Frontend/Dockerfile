# Use an official Node.js runtime as a parent image
FROM node:18

WORKDIR /usr/src/app

COPY . .
EXPOSE 4200
RUN npm install -g @angular/cli
RUN yarn install
CMD ["ng", "serve", "--host", "0.0.0.0"]
