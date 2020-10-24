const axios = require('axios');
const oauth = require('axios-oauth-client');
const tokenProvider = require('axios-token-interceptor');

const getClientCredentials = oauth.client(axios.create(), {
    url: `http://localhost:${process.env.KEYCLOAK_PUBLISHED_PORT}/auth/realms/Envoy-Keycloak-POC/protocol/openid-connect/token`,
    grant_type: 'client_credentials',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
});

const client = axios.create();
client.interceptors.request.use(
    oauth.interceptor(tokenProvider, getClientCredentials)
);

// Make the actual call to the protected server
client.get(`http://localhost:${process.env.SERVER_PUBLISHED_PORT}/`)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });