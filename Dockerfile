FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
WORKDIR /usr/share/nginx/html
COPY dist/admin-luckywheel .
