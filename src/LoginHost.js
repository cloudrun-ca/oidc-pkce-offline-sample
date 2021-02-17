import React from 'react';
import { Button } from '@material-ui/core';
import WebStorageHelper from 'Util/WebStorageHelper';
import { AppSettings } from 'AppSettings';
import sha256 from 'crypto-js/sha256';

const base64url = require('base64url');
const crypto = require("crypto");
const CryptoJS = require("crypto-js");

// https://auth0.com/docs/flows/call-your-api-using-the-authorization-code-flow-with-pkce#create-code-verifier
// https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce
// https://tonyxu-io.github.io/pkce-generator/

function cryptoBase64Url(string) {
    return string.toString(CryptoJS.enc.Base64)
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function LoginHost(props) {
    function go(event) {
        event.preventDefault();

        const nonce = 'myNonce';
        const state = 'myState';

        // should be a crypto rand value
        // const code_verifier = base64url(crypto.randomBytes(32));
        
        // using a static value, just for debug purposes
        const rand = "ngchKjMcYM4Az17wBSAknBZ8IzpWYZoU";
        
        const code_verifier = base64url(rand);

        WebStorageHelper.setItem('cloudrun', 'pkce-code-verifier', code_verifier);

        const code_verifier_sha256 = sha256(code_verifier);
        
        const codeChallenge = cryptoBase64Url(code_verifier_sha256);

        const url = `${AppSettings.authorizeEndpoint}?client_id=${AppSettings.clientId}&code_challenge=${codeChallenge}&code_challenge_method=S256&nonce=${nonce}&redirect_uri=${AppSettings.callbackURL}&response_type=code&state=${state}&scope=openid email profile offline_access`;

        window.location.href = url;
    }

    return (
        <React.Fragment>
            <Button variant="contained" type="button" color="primary" onClick={go}>Go To Login Page</Button>
        </React.Fragment>
    );
}

export default LoginHost;