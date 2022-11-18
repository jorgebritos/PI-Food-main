import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getRecipeDetail } from "../../actions/index";
import styles from "./recipeDetail.module.css"


const RecipeDetail = (props) => {
    let recipe = useSelector(state => state.recipeDetail);
    let stepsList = recipe.steps
    let summary = recipe.summary

    const dispatch = useDispatch();

    useEffect(() => {
        let id = props.match.params.id;
        dispatch(getRecipeDetail(id))
    }, [dispatch])

    return (
        recipe ?
            <div className={styles.general}>
                <div className={styles.detail}>
                    <Link to="/home"><button className={styles.homeButton}><span>Ir a Home</span></button></Link>
                    <br /><br />
                    <div className={styles.principals}>
                        <h1>{recipe.name}</h1>
                        <h3>Health Score: {recipe.healthScore}</h3>
                        <img className={styles.image} src={recipe.image} alt="" />
                        <h5>Diets:</h5>
                        <ul className={styles.diets}>
                            {recipe.diets ? recipe.diets.length > 0 ? recipe.diets.map(d => {
                                return (
                                    <li key={d.name} className={styles.li}>{d.name}</li>
                                )
                            }) : <li className={styles.noDiets}>Esta receta no contiene dietas</li> : ""}
                        </ul>
                    </div>
                    <div className={styles.summary}>
                        <p id="summary"></p>
                        {/* <p>{recipe.summary}</p> */}
                        {
                            //ESTO LO HAGO PORQUE EL SUMMARY QUE TRAE TAMBIÉN CONTIENE ETIQUETAS
                            document.getElementById("summary") ? document.getElementById("summary").innerHTML.length < 1 ? document.getElementById("summary").innerHTML = summary : "" : ""
                        }
                    </div>
                    <div className={styles.steps}>
                        <h2>Steps</h2>
                        {
                            stepsList ? stepsList.steps ? [...stepsList.steps].map(a => {
                                return (
                                    <div key={a.number} className={styles.stepContainer}>
                                        <h3 className={styles.stepNumber}>{a.number}</h3>
                                        <p>{a.step}</p>
                                    </div>
                                )
                            }) : <p className={styles.stepContainer}>Esta receta no contiene pasos</p> : ""
                        }
                    </div>
                </div >
            </div>
            : <h1>Loading...</h1>)
}

export default RecipeDetail;