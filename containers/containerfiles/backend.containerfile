FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=development \
    PORT=4000 \
    DATABASE_URL=postgres://polluser:pollpass@db:5432/polldb \
    SECRET_KEY=supersecretkey \
    FRONTEND_URL=http://localhost:3000

EXPOSE 4000

VOLUME /app/node_modules

COPY entrypoints/backend.entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
