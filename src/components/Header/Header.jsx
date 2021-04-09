import React, {useEffect} from 'react';
import firebase from '../../config/firebase';
import {NavLink, useHistory} from 'react-router-dom';

export default function Header() {
    const history = useHistory();

    useEffect(() => {

        let isCancelled = false;

        if (!isCancelled) {
            if (!firebase.auth().currentUser) {
                history.push('/auth/login');
            }
        }

        return () => {
            isCancelled = true;
        };

    }, []);

    return (
        <div className="header-wrapper">
            <div className="searchbar-wrapper">
            </div>
            <div className="user-menu">
                <div className="user-menu-wrapper">
                    <img className="user-pic"
                         src={firebase.auth().currentUser && firebase.auth().currentUser.photoURL && firebase.auth().currentUser.photoURL
                         !== '' ? firebase.auth().currentUser.photoURL : "assets//images/avatar.jpg"}
                         alt="user-pic"/>
                    <span className="user-name">{firebase.auth().currentUser
                    && firebase.auth().currentUser.displayName
                        ? firebase.auth().currentUser.displayName
                        : 'Guest'}</span>
                </div>
            </div>
        </div>
    )
}
