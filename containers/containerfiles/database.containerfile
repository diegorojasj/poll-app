FROM postgres:16-alpine

ENV POSTGRES_USER=polluser \
    POSTGRES_PASSWORD=pollpass \
    POSTGRES_DB=polldb

EXPOSE 5432

COPY entrypoints/database.entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
