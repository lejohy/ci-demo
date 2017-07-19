FROM node
MAINTAINER Syd <lejohy@gmail.com>
RUN mkdir -p ~/ci-demo
WORKDIR ~/ci-demo

COPY package.json ~/ci-demo
RUN npm install
COPY . ~/ci-demo

ENV NODE_ENV production
EXPOSE 3000
CMD ["npm", "run", "start:prod"]

