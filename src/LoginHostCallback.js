import React, { useEffect, useReducer } from 'react';
import WebStorageHelper from 'Util/WebStorageHelper';
import { AppSettings } from 'AppSettings';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@material-ui/core';

const searchParams = new URLSearchParams(window.location.search);

function LoginHostCallback(props) {
    async function exchange(isCancelled) {
        const authorizationCode = searchParams.get("code");
        const state = searchParams.get("state");

        const code_verifier = WebStorageHelper.getItem('cloudrun', 'pkce-code-verifier');

        const fd = new URLSearchParams();

        fd.append('grant_type', 'authorization_code');
        fd.append('client_id', AppSettings.clientId);
        fd.append('code_verifier', code_verifier);
        fd.append('code', authorizationCode);
        // ONE SHOULD NEVER obtain a refresh token from client side. This is just an example of what server-side code should be doing!!
        // fd.append('scope', 'openid offline_acces'); // this will get you a refresh token
        fd.append('redirect_uri', AppSettings.callbackURL);

        const response = await fetch(AppSettings.tokenEndpoint, {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            body: fd
        });

        const data = await response.json();

        if (!isCancelled) {
            const rows = [];

            for(const prop in data) {
                rows.push({ name: prop, value: data[prop]});
            }
            
            setInitLoadData({ loading: false, rows });
        }
    }

    useEffect(() => {
        let isCancelled = false;

        function onUnload() {
            isCancelled = true;
        }

        exchange(isCancelled);

        return onUnload;
    }, []);

    const [initLoadData, setInitLoadData] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            loading: true
        }
    );

    if (initLoadData.loading) {
        return "Loading...";
    }

    return (
        <TableContainer>
            <Table aria-label="table" size="small" style={{ marginTop: '1em' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {initLoadData.rows.map(item => {
                        return (
                            <TableRow hover tabIndex={-1} key={item.name}>
                                <TableCell component="th" scope="row">{item.name}</TableCell>
                                <TableCell>{item.value}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default LoginHostCallback;