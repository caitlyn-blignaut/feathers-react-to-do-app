FROM postgres:latest

ADD ./docker-entrypoint-initdb.d/setup.sh /docker-entrypoint-initdb.d/

ENTRYPOINT ["docker-entrypoint.sh"]

USER postgres

EXPOSE 5432

CMD ["postgres"]
