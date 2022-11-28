# 1) Node image for building
FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

# Copy all files from current directory to working dir (except .dockerignore)
COPY . .

RUN npm run build

# 2) nginx to serve frontend assets
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy our static assets from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Override the nginx configuration file
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# Containers run nginx with global directives and daemon off
# See https://hub.docker.com/r/yobasystems/alpine-nginx/  that says: make sure you 
# start nginx without daemon mode, by including daemon off; in your nginx configuration,
# otherwise the container will constantly exit right after nginx starts.
ENTRYPOINT ["nginx", "-g", "daemon off;"]
