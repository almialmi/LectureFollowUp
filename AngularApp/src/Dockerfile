FROM node:12.18.4


ENV NODE_ENV=production


WORKDIR /app


COPY ["package.json", "package-lock.json*", "./"]




RUN npm install --production


RUN npm run build --prod


COPY . .

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/angularapp /usr/share/nginx/html
CMD [ "node", "app.js" ]