import React, {useEffect, useState} from 'react'
import firebase from "../../config/firebase";
import {NavLink} from "react-router-dom";

export default function MyRecipes() {

    const firestore = firebase.firestore();
    const [recipes, setRecipes] = useState({});

    useEffect(() => {
        let isCancelled = false;

        const getAllItems = async () => {
            let recipeArr = [];
            let userId = await firebase.auth().currentUser.uid;

            firestore.collection('recipes').where('uid', '==', userId).get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    let items = doc.data();
                    items.id = doc.id;
                    recipeArr.push(items);
                });
                console.log(recipeArr);
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
 