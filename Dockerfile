# Multi stage docker build

## stage1: build react
FROM node:12 as react-build
ARG GREMLIN_SERVER_URL
ENV GREMLIN_SERVER_URL=$GREMLIN_SERVER_URL
WORKDIR /code
COPY . ./
RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install && \
    npm cache clean --force
RUN  GREMLIN_SERVER_URL=$GREMLIN_SERVER_URL && npm run-script build

# stage2: deploy to nginx
FROM nginx:alpine as production
COPY --from=react-build /code/dockerfiles/nginx.conf /etc/nginx/conf.d/default.conf.template
COPY --from=react-build /code/build /usr/share/nginx/html
#CMD ["nginx", "-g", "daemon off;"]
CMD envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
