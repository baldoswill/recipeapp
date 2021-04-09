import React from 'react';
import {facebookProvider, githubProvider, googleProvider} from '../../config/authMethods';
import SocialAuthProvider from './SocialAuthProvider';

export default function Auth() {

    const handleOnClick = async(provider) => {
        const resp = await SocialAuthProvider(provider);
        console.log(resp);
        console.log(resp.displayName)
    }

    return (
        <div>
            <button onClick = {() => handleOnClick(facebookProvider)}>
                facebook
            </button>
            <button onClick = {() => handleOnClick(githubProvider)}>
                github
            </button>
            <button onClick = {() => handleOnClick(googleProvider)}>
                google 
            </button>
        </div>
    )
}
