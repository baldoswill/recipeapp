import React, {useEffect, useState, useContext} from 'react';
import firebase from '../../config/firebase';
import {NavLink, withRouter} from 'react-router-dom';
import CurrentPageContext from "../../Context/CurrentPageContext";

function Home() {
    const firestore = firebase.firestore();
    const [recipes, setRecipes] = useState({});

    const {setCurrentPage} = useContext(CurrentPageContext);
    setCurrentPage('Home');

    useEffect(() => {
        let isCancelled = false;

        const getAllItems = async () => {
            let recipeArr = [];

            firestore.collection('recipes').get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    let items = doc.data();
                    items.id = doc.id;
                    recipeArr.push(items);
                });
                setRecipes(recipeArr);
            });
        }

        if (!isCancelled) {
            getAllItems();
        }

        return () => {
            isCancelled = true;
        };

    }, [])


    return (
        <>
            <h2 className="daily-recipes-title">Daily Recipes </h2>
            <div className="daily-recipes">
                {recipes && recipes.length > 0 && recipes.map((recipe, index) => (
                    <div className="daily-recipe-box" key={recipe.id}>
                        <img srcSet={recipe.imageUrl} alt=""/>
                        <h2 className="divider">
                            <span>
                                <i className="fas fa-star"></i>
                            </span>
                        </h2>
                        <NavLink to={`/details/${recipe.id}`}>
                            <p>{recipe.title}</p>
                        </NavLink>
                    </div>
                ))}
            </div>
        </>
    )
}

export default withRouter(Home);