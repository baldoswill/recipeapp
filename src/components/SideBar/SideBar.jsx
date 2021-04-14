import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import firebase from '../../config/firebase';
import CurrentPageContext from "../../Context/CurrentPageContext";
import AuthContext from "../../Context/AuthContext";

export default function SideBar() {

    const {currentPage} = useContext(CurrentPageContext);
    const {setUserData} = useContext(AuthContext);
    const history = useHistory();

    const handleSignout = () => {
        firebase.auth().signOut();
        setUserData({});
        history.push('/auth/login');        
    }

    const handleActiveStyle = (title)=> {
        return currentPage !== title ? '' : 'active'
    }

    return (
        <div id="sidebar-nav" >
            <i className='fas fa-arrow-left hide-sidebar-menu'></i>
            <h1 class="site-brand">
                    <span class="site-brand-text">Cookz</span>   
            </h1>
            <h2 class="category-menu">
                Discover
            </h2>
            <ul class="discover">
                <li class={handleActiveStyle('Home')}>
                    <i class="fa fa-home"></i>
                    <NavLink to="/" className = 'discover-link'>Home</NavLink>
                </li>
                <li class={handleActiveStyle('My Recipes')}>
                    <i class="fas fa-utensils"></i>  
                    <NavLink to="/my-recipes" className = 'discover-link'>My Recipes</NavLink>
                </li>
                <li class={handleActiveStyle('Add Recipe')}>
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
