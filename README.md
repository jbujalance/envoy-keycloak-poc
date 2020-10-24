# ENVOY-KEYCLOAK INTEGRATION POC

This is a proof of concept for an integration between Envoy Proxy and a Keycloak identity server.

The objective is to have a server behind an Envoy proxy which delegates the authentication on the proxy.
The Envoy proxy is responsible of validating the authentication tokens against the Keycloak server, setting the server free of any authentication configuration.

This pattern allows to abstract the authentication validation out of the server, which allows dedveloppers to focus even more on the business logic. The server isn't even aware of the existence of the identity server.

## Keycloak identity server

Start the Keycloak server **from the root directory of the project** with:
```
docker-compose -f keycloak\keycloak.yml --env-file config\.env up -d
```

## Server

The server that sits behind the Envoy proxy and receives requests from the client.
The server is completely unawar of the authentication infrastructure, and is not explicitely protected by any authentication, as can be seen in the server source code at [./server/server.js](./server/server.js)

Start the server **from the root directory of the project** with:
```
docker-compose -f server\server.yml --env-file config\.env up -d
```

**ATTENTION:** Beware that the Dockerfile and the compose file in the [./server](./server) directory are designe to work with the root context. The compose file must be executed **from the root directory of the project** or it will fail.