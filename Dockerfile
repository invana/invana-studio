# Multi stage docker build

## stage1: build react
FROM node:12 as react-build
ARG gremlin_server_url
ENV GREMLIN_SERVER_URL=$gremlin_server_url
WORKDIR /code
COPY . ./
RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install && \
    npm cache clean --force
RUN REACT_APP_NOT_SECRET_CODE=$gremlin_server_url && npm run-script build

#
FROM nginx:alpine
COPY --from=react-build /code/dockerfiles/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /code/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
