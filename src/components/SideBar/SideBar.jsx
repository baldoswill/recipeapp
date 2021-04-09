import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import firebase from '../../config/firebase';

export default function SideBar() {

    const history = useHistory();

    const handleSignout = () => {
        firebase.auth().signOut();
        history.push('/auth/login');        
    }

    return (
        <div id="sidebar-nav">
            <h1 class="site-brand">
                    <span class="site-brand-text">Cookz</span>   
            </h1>
            <h2 class="category-menu">
                Discover
            </h2>
            <ul class="discover">
                <li class="active">
                    <i class="fa fa-home"></i>
                    <NavLink to="/" className = 'discover-link'>Home</NavLink>
                </li>                     
                <li>
                    <i class="fas fa-heart"></i> 
                    <NavLink to="/my-favorites" className = 'discover-link'>My Favorites</NavLink>
                </li>
                <li>
                    <i class="fas fa-utensils"></i>  
                    <NavLink to="/my-recipes" className = 'discover-link'>My Recipes</NavLink>
                </li>
                <li>
                    <i class="fa fa-plus-circle" aria-hidden="true"></i> 
                    <NavLink to="/add-recipe" className = 'discover-link'>Add Recipe</NavLink>
                </li>
                <li>
                    <i class="fas fa-sign-out-alt"></i>
                    <p className = 'discover-link' onClick = {handleSignout}>Logout</p>
                </li>
                
            </ul>
        </div>
    )
}
