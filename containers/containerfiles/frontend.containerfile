FROM node:20-alpine

WORKDIR /app

ENV BACKEND_URL=http://localhost:4000

EXPOSE 3000

VOLUME /app/node_modules
VOLUME /app/.next

COPY entrypoints/frontend.entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
