FROM nginx:latest-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/Teste-Autobem /usr/share/nginx/html
