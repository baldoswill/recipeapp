import {useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import SideBar from './components/SideBar/SideBar';
import Header from './components/Header/Header';
import AddRecipe from './components/AddRecipe/AddRecipe';
import MyRecipes from './components/MyRecipes/MyRecipes';
import Home from './components/Home/Home';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import Auth from './components/Auth/Auth';
import ContentLayout from './HOC/ContentLayout/ContentLayout';
import AuthLayout from './HOC/AuthLayout/AuthLayout';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import AuthContext from './Context/AuthContext';
import CurrentPageContext from './Context/CurrentPageContext';
import ProtectedRoute from "./Utilities/ProtectedRoute";



function App() {

    const [userData, setUserData] = useState({});
    const [currentPage, setCurrentPage] = useState('');

    return (
        <BrowserRouter>
            <AuthContext.Provider value={{userData, setUserData}}>
                <CurrentPageContext.Provider value={{currentPage, setCurrentPage}}>
                    <Switch>
                        <Route path='/auth/:path?'>
                            <AuthLayout>
                                <Switch>
                                    <Route exact path='/auth/login' component={Login}/>
                                    <Route exact path='/auth/signup' component={SignUp}/>
                                    <Route exact path='/auth/forgot-password' component={ForgotPassword}/>
                                </Switch>
                            </AuthLayout>
                        </Route>
                        <Route>
                            <ContentLayout>
                                <div className="main-wrapper">
                                    <SideBar/>
                                    <div id="main-content">
                                        <Header/>
                                        <Switch>
                                            <ProtectedRoute exact path='/my-recipes' component={MyRecipes} isAuth={userData.isLoggedIn}/>
                                            <ProtectedRoute exact path='/add-recipe' component={AddRecipe} isAuth={userData.isLoggedIn}/>
                                            <ProtectedRoute exact path='/details/:id' component={RecipeDetails} isAuth={userData.isLoggedIn}/>
                                            <ProtectedRoute exact path='/' component={Home} isAuth={userData.isLoggedIn}/>
                                        </Switch>
                                    </div>
                                </div>
                            </ContentLayout>
                        </Route>
                    </Switch>
                </CurrentPageContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}

export default App;
