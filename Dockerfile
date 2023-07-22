FROM node:14-alpine3.12 AS builder
WORKDIR /app
COPY . .
WORKDIR /app/App
RUN yarn install && yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/App/build .
COPY nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]