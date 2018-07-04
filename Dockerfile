FROM rabblerouser/node-base

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN yarn

ENTRYPOINT ["yarn", "simulate"]
