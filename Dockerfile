FROM node:current
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
#ENV NODE_ENV=staging
EXPOSE 1234
CMD ["npm", "run", "start:prod"]