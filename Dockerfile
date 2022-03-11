FROM node:16 as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY  yarn.lock ./
COPY .env ./
RUN yarn install

COPY . .

RUN yarn tsc

FROM node:16 as ts-remover 
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package*.json ./
## COPY --from=ts-compiler /usr/app/build ./build/src
COPY --from=ts-compiler /usr/app/build/src ./build/
COPY --from=ts-compiler /usr/app/.env ./.env
RUN yarn install --production=true

ENTRYPOINT [ "yarn" ]

