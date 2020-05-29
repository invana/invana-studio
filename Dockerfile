# Multi stage docker build

## stage1: build react
FROM node:12 as react-build
WORKDIR /code
ENV PORT=8888
COPY . ./
RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install && \
    npm cache clean --force
RUN npm run-script build

# stage2: deploy to nginx
FROM nginx:alpine as production
COPY --from=react-build /code/dockerfiles/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /code/build /usr/share/nginx/html
#CMD ["nginx", "-g", "daemon off;"]
EXPOSE $PORT
CMD nginx -g 'daemon off;'