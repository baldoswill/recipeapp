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
            <h1 className="site-brand">
                    <span className="site-brand-text">Cookz</span>   
            </h1>
            <h2 className="category-menu">
                Discover
            </h2>
            <ul className="discover">
                <li className={handleActiveStyle('Home')}>
                    <i className="fa fa-home"></i>
                    <NavLink to="/" className = 'discover-link'>Home</NavLink>
                </li>
                <li className={handleActiveStyle('My Recipes')}>
                    <i className="fas fa-utensils"></i>  
                    <NavLink to="/my-recipes" className = 'discover-link'>My Recipes</NavLink>
                </li>
                <li className={handleActiveStyle('Add Recipe')}>
                    <i className="fa fa-plus-circle" aria-hidden="true"></i> 
                    <NavLink to="/add-recipe" className = 'discover-link'>Add Recipe</NavLink>
                </li>
                <li>
                    <i className="fas fa-sign-out-alt"></i>
                    <p className = 'discover-link' onClick = {handleSignout}>Logout</p>
                </li>
            </ul>
        </div>
    )
}
