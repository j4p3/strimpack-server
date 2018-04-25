FROM node:alpine

ENV CONTAINER_HOME=/src/strimpack
RUN mkdir /src/strimpack-web-client
VOLUME /src/strimpack-web-client
WORKDIR $CONTAINER_HOME

COPY package*.json ./
RUN npm install --only=production
COPY . ./
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve"]
