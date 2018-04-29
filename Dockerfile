FROM node:alpine

ENV CONTAINER_HOME=/usr/src/strimpack
WORKDIR $CONTAINER_HOME

COPY package*.json ./
RUN npm install --only=production
COPY . ./
RUN npm run build

EXPOSE 8080

CMD ["/bin/sh", "docker-entry.sh"]