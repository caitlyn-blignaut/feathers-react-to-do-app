FROM mongo:5.0

WORKDIR /usr/src/app

COPY --chown=mongodb:mongodb setup.js /docker-entrypoint-initdb.d/

# we need to rebind mongo's ip addresses otherwise it's not accessable by anything outside of the container
CMD ["mongod", "--bind_ip_all"]
