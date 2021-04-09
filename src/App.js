import {useState}  from 'react';
 import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import SideBar from './components/SideBar/SideBar';
import Header from './components/Header/Header';
import AddRecipe from './components/AddRecipe/AddRecipe';
import MyFavorites from './components/MyFavorites/MyFavorites';
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


function App() {

	const [userData, setUserData] = useState({});		  
	 
	return (
		<BrowserRouter>
			<AuthContext.Provider value={{userData, setUserData}}>
				<Switch>
					<Route path = '/auth/:path?' >
						<AuthLayout>
							<Switch>
								<Route exact path = '/auth/login' component = {Login}/>		
								<Route exact path = '/auth/signup' component = {SignUp}/>	
								<Route exact path = '/auth/forgot-password' component = {ForgotPassword}/>	
							</Switch>
						</AuthLayout>
					</Route>
					<Route>
						<ContentLayout>    
							<div className="main-wrapper">
								<SideBar />
								<div id="main-content">					
									<Header />  
									<Switch>         						
										<Route exact path = '/my-favorites' component = {MyFavorites}/>
										<Route exact path = '/my-recipes' component = {MyRecipes}/>				
										<Route exact path = '/add-recipe' component = {AddRecipe}/>				 
										<Route exact path = '/details/:id' component = {RecipeDetails}/>
										<Route exact path = '/login' component = {Auth}/>
										<Route exact path = '/' component = {Home}/>
									</Switch>					 
								</div>
							</div>
						</ContentLayout>
					</Route>
				</Switch>
			</AuthContext.Provider>
		</BrowserRouter>
	);
}

export default App;
