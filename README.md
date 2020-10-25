# ENVOY-KEYCLOAK INTEGRATION POC

This is a proof of concept for an integration between Envoy Proxy and a Keycloak identity server.

The objective is to have a server behind an Envoy proxy which delegates the authentication on the proxy.
The Envoy proxy is responsible of validating the authentication tokens against the Keycloak server, setting the server free of any authentication configuration.

This pattern allows to abstract the authentication validation out of the server, which allows dedveloppers to focus even more on the business logic. The server isn't even aware of the existence of the identity server.

## Docker environment

For this POC we use a fully Dockerized environment.
To set the environment up and running use the following command:
```
docker-compose --env-file config\.env up -d
```
This will set up the following elements:
* A Keycloak identity server with a Postgres database
* An Envoy proxy
* A target server

## Keycloak identity server

The Keycloak server is used to authenticate the client.
It is set up with a realm and a client configuration.
The client uses the `client-credentials` grant to obtain an access token.
You can see the realm configuration at http://localhost:8080/auth/realms/Envoy-Keycloak-POC/.well-known/openid-configuration

Login to the Keycloak server at http://localhost:8080 with the credentials:
* User: `admin`
* Password: `admin`

## Server

The server that sits behind the Envoy proxy and receives requests from the client.
The server is completely unaware of the authentication infrastructure, and is not explicitely protected by any authentication, as can be seen in the server source code at [./server/server.js](./server/server.js)

## Envoy proxy

The envoy proxy sits in front of the target server, proxying all the requests sent to the server.
This proxy is responsible for catching the authentication token of the incoming requests, and validating them against the Keycloak server that has issued the token, usin the corresponding JWKS (JSON Web Key Sets).

## Client

The client that makes an authentified call to the server.
The client first gets the authentication token from the identity server, then sends the authenticated request to the server via the Envoy proxy.

Make a call **from the [./client](./client) directory** with:
```
npm start
```
