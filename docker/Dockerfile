FROM node:12 AS base
RUN apk add --no-cache tini
WORKDIR /root/app
ENTRYPOINT ["/sbin/tini", "--"]
COPY package.json package-lock.json ./

FROM base AS dependencies
RUN npm set progress=false && npm config set depth 0
RUN npm ci --only=production
RUN cp -R node_modules /tmp/prod_node_modules
RUN npm install
COPY . .

FROM dependencies AS build
RUN npm run compile
RUN cp -R dist /tmp/prod_dist

FROM dependencies AS test
RUN npm run lint && npm run test

FROM base AS release
COPY --from=dependencies /tmp/prod_node_modules ./node_modules
COPY --from=build /tmp/prod_dist .
EXPOSE 3000
CMD node ./src/index.js
