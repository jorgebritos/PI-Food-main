import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiets, getAllRecipes, resetDetail } from '../../actions';
import Card from './Card/Card';
import Nav from './Nav/Nav';
import Pagination from '../Home/Pagination/Pagination';
import styles from './home.module.css'

export default function Home() {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes)
    const diets = useSelector(state => state.diets)
    const [actualPage, setActualPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = actualPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const changePage = pageNum => setActualPage(pageNum)
    const recipesToRender = num => setRecipesPerPage(num)
    
    useEffect(() => {
        dispatch(getAllDiets())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllRecipes())
        dispatch(resetDetail())
    }, [dispatch, diets])
    
    return (
        <div className={styles.general}>
            <Nav changePage={changePage} />
            <div className={styles.container}>
                {
                    currentRecipes?.map(c => {
                        return (
                            <Card key={c.id} id={c.id} name={c.name} image={c.image} healthScore={c.healthScore} diets={c.diets} />
                        )
                    })
                }
                <Pagination totalRecipes={recipes.length} recipesPerPage={recipesPerPage} paginate={changePage} recipesToRender={recipesToRender} />
            </div>
        </div>
    )
}
