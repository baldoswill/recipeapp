import React, {useEffect, useState} from 'react';
import firebase from '../../config/firebase';

export default function RecipeDetails(props) {

const [recipe, setRecipe] = useState({});

const firestore = firebase.firestore();
    useEffect(() => {
        
        let id = props.match.params.id
        console.log(id);

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
            <img srcSet={recipe.imageUrl} alt={recipe.title} />
        </div>
            
        <div className="recipe-information">
            <h3 className = "details-subtitle">Other Information</h3>
            <ul className="recipe-detail-other-info">
                <li>
                    <i className="fas fa-dot-circle"></i>
                    <span>Servings: </span>
                    <span>{ recipe.servings} Persons</span>
                </li>
                <li>
                    <i className="fas fa-dot-circle"></i>
                    <span>Time of Preparation: </span>
                    <span>{ recipe.time} Minutes</span>
                </li>
            </ul>
            
            <h3 className = "details-subtitle">Ingredients</h3>
            <ul className="recipe-detail-ingredients">
                <li>
                    <i className="fas fa-dot-circle"></i> <span>{recipe.ingredients}</span> 
                </li>
                <li>
                    <i className="fas fa-dot-circle"></i> <span>2 garlic cloves</span> 
                </li>
                <li>
                    <i className="fas fa-dot-circle"></i> <span> ½ cup coarsely chopped roasted red peppers from a jar</span>
                </li>
                <li>
                    <i className="fas fa-dot-circle"></i> <span>3 Tbsp. extra-virgin olive oil, plus more for drizzling</span> 
                </li>
                <li>
                    <i className="fas fa-dot-circle"></i> <span>12 oz. rigatoni, mezzi rigatoni, ditali, or other short or medium-length straight tube pasta</span> 
                </li>
                <li>
                    <i className="fas fa-dot-circle"></i> <span>2 (5–6-oz.) cans or jars oil-packed tuna</span>  
                </li>
            </ul>

            <h3 className = "details-subtitle">Preparation</h3>
            <ul className="recipe-detail-preparation">
                <li>                            
                    {recipe.preparation}
                </li>
                <li>
                    Place rack in upper third of oven; preheat to 375°F. Pulse onion, garlic, and roasted red peppers in a food processor until finely chopped; set aside.
                    Heat 3 Tbsp. olive oil in a 10” ovenproof skillet, preferably cast iron, over medium-low. Add pasta and cook, stirring often, until evenly coated in oil and lightly browned, about 5 minutes (depending on the size and shape of your pasta, you may need to work in batches). Using a slotted spoon, transfer to a large bowl. Reserve pan.
                </li>
                <li>
                    Drain tuna, reserving 2 Tbsp. tuna oil. place oil in reserved pan and increase heat to medium. Add anchovy, ½ tsp. salt, and reserved chopped vegetable mixture and season with pepper. Cook, stirring occasionally, until vegetables soften, 5–7 minutes. Add tomato paste and cook, stirring, until slightly darkened in color, about 3 minutes. Mix in toasted pasta, tomatoes, turmeric, red pepper flakes, remaining ½ tsp. salt, and 2½ cups water and bring to a boil. Cook, stirring occasionally, until pasta is slightly softened, 8–10 minutes. Remove from heat and stir in drained tuna and ¼ cup water.
                </li>
                <li>
                    Transfer skillet to oven and bake casserole until pasta is tender and juices at the edges are bubbling, about 15 minutes. Remove from oven.
                </li>
                <li>
                    Heat broiler. Drizzle casserole with a little olive oil and broil until browned and crisped in spots, about 4 minutes.
                </li>
                <li>
                    Spoon some aioli over casserole and top with parsley if desired. Serve remaining aioli alongside.
                </li>
            </ul>
        </div>

         </>
    )
}
