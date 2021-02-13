## Buildstep
FROM node:15.6.0-alpine3.10 as BUILD
WORKDIR /home/app
COPY package.json package-lock.json ./

RUN npm ci
COPY . . 
RUN npm run build && npm prune --production

## Production step
FROM node:15.6.0-alpine3.10
COPY --from=BUILD /home/app .
RUN npm install -g serve

EXPOSE 8000

CMD ["serve", "-s", "build", "-l", "8000"]

