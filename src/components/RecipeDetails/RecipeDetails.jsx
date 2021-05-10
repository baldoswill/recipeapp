import React, {useContext, useEffect, useState} from 'react';
import firebase from '../../config/firebase';
import CurrentPageContext from "../../Context/CurrentPageContext";
import {withRouter} from "react-router-dom";

export function RecipeDetails(props) {

    const [recipe, setRecipe] = useState({});
    const firestore = firebase.firestore();

    const {setCurrentPage} = useContext(CurrentPageContext);
    

    useEffect(() => {

        let id = props.match.params.id
        setCurrentPage('Recipe Details');

        const getItem = () => {
            var docRef = firestore.collection("recipes").doc(id);

            docRef.get().then((doc) => {

                setRecipe(doc.data());

            })
        }

        getItem();

    }, []);

    return (
        <>
            <h2 className="daily-recipes-title">{recipe.title}</h2>
            <div className="recipe-detail-image">
                <img srcSet={recipe.imageUrl} alt={recipe.title}/>
            </div>

            <div className="recipe-information">
                <h3 className="details-subtitle">Other Information</h3>
                <div className="recipe-detail-other-info">
                    <div className="recipe-info-details">
                        <span>Servings: </span>
                        <span>{recipe.servings} Persons</span>
                    </div>
                    <div className="recipe-info-details">
                        <span>Time of Preparation: </span>
                        <span>{recipe.time} Minutes</span>
                    </div>
                </div>
                <h3 className="details-subtitle">Ingredients</h3>
                <div className="recipe-info-details">
                    <p style={{'whiteSpace': 'pre-line'}}>
                         {recipe.ingredients}
                    </p>
                </div>

                <h3 className="details-subtitle">Preparation</h3>
                <div className="recipe-info-details">
                    <p style={{'whiteSpace': 'pre-line'}}>
                        {recipe.preparation}
                    </p>
                </div>
            </div>

        </>
    )
}


export default withRouter(RecipeDetails);