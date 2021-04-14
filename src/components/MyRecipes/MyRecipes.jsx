import React, {useContext, useEffect, useState} from 'react'
import firebase from "../../config/firebase";
import {NavLink, withRouter} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import CurrentPageContext from "../../Context/CurrentPageContext";

export function MyRecipes() {

    const firestore = firebase.firestore();
    const [recipes, setRecipes] = useState({});

    const {setCurrentPage} = useContext(CurrentPageContext);
    setCurrentPage('My Recipes');

    const handleDeleteRecipe = async(e, recipeId) =>  {
        e.preventDefault();
        try{
             await firestore.collection("recipes").doc(recipeId).delete();
            const doc = await firestore.collection("likes").where('recipeId', '==', recipeId).get();
            doc.forEach(element => {
                element.ref.delete();
            });
            setRecipes(prevItem => prevItem.filter(x => x.id !== recipeId));
        }catch(error){
            toast.error(`🦄 ${error.message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    useEffect(async() => {
        let isCancelled = false;

        const getAllItems = async () => {
            let recipeArr = [];
            let userId = await firebase.auth().currentUser.uid;

            firestore.collection('recipes')
                .where('userId', '==', userId)
                .get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    let items = doc.data();

                    items.id = doc.id;
                    recipeArr.push(items);
                });
                setRecipes(recipeArr);

            });
        }

        if (!isCancelled) {
            await getAllItems();
        }
        return () => {
            isCancelled = true;
        };

    }, [])

    return (
        <>
            <h2 className="daily-recipes-title">My Recipes </h2>
            <div className="daily-recipes">
                {recipes && recipes.length > 0 && recipes.map((recipe, index) => (
                    <div className="daily-recipe-box" key={recipe.id}>
                        <img srcSet={recipe.imageUrl !== null && recipe.imageUrl} alt=""/>
                        <i className="fas fa-times active" onClick={e => handleDeleteRecipe(e, recipe.id)} ></i>
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
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    bodyClassName="toastBody"
                />
            </div>
        </>
    )
}

export default withRouter(MyRecipes);