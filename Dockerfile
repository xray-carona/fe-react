FROM node:lts-stretch-slim

# Optionally set a maintainer name to let people know who made this image.
MAINTAINER Ankit Arora <ankit.j.arora@gmail.com>

ENV INSTALL_PATH /fe-react
RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

RUN apt-get update && apt-get install -y --no-install-recommends apt-utils

RUN apt-get install -y gzip && apt-get install -y bzip2

COPY package.json package.json

RUN npm install

COPY . /fe-react/

CMD npm start

EXPOSE 3000