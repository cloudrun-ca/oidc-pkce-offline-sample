const env = process.env.REACT_APP_ENV;
const appSettings = [];

const org_local = 'YOU NEED TO SET THIS VALUE';

appSettings["local"] = {
    callbackURL: window.location.origin + '/implicit/callback',
    clientId: 'YOU NEED TO SET THIS VALUE',
    authorizeEndpoint: `https://${org_local}/oauth2/default/v1/authorize`,
    tokenEndpoint: `https://${org_local}/oauth2/default/v1/token`
};

const current = appSettings[env];

export { current as AppSettings }