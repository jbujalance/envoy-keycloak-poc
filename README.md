# ENVOY-KEYCLOAK INTEGRATION POC

This is a proof of concept for an integration between Envoy Proxy and a Keycloak identity server.

The objective is to have a server behind an Envoy proxy which delegates the authentication on the proxy.
The Envoy proxy is responsible of validating the authentication tokens against the Keycloak server, setting the server free of any authentication configuration.

This pattern allows to abstract the authentication validation out of the server, which allows dedveloppers to focus even more on the business logic. The server isn't even aware of the existence of the identity server.

## Keycloak identity server

Start the Keycloak server with:
```
docker-compose -f keycloak\keycloak.yml --env-file config\.env up -d
```