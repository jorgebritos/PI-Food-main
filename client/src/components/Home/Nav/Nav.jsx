import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterByDiet, searchByName, orderBy } from '../../../actions';
import styles from "./nav.module.css"


export default function Nav({ changePage }) {
    const dispatch = useDispatch()
    const [recipe, setRecipe] = useState('')
    const [, setOrder] = useState("")

    const handleInputChange = e => {
        setRecipe(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(searchByName(recipe))
        setTimeout(function () {
            changePage(1)
        }, 1);
        changePage(2)
    }

    const handleFilterByDiet = e => {
        dispatch(filterByDiet(e.target.value))
        setOrder(`Ordered ${e.target.value}`)
        setTimeout(function () {
            changePage(1)
        }, 1);
        changePage(2)
    }

    const handleOrder = e => {
        e.preventDefault()
        dispatch(orderBy(e.target.value))
        setOrder(`Ordered ${e.target.value}`)
        setTimeout(function () {
            changePage(1)
        }, 1);
        changePage(2)
    }


    return (
        <div>
            <input type="text" className={styles.searchBar} value={recipe} onChange={e => handleInputChange(e)} placeholder="Search..." onKeyDown={e => e.key === 'Enter' ? handleClick(e) : ""}/>
            <button type='submit' className={styles.button} onClick={e => handleClick(e)}>Search</button>
            <select onChange={e => handleFilterByDiet(e)}>
                <option value="All">All</option>
                <option value="gluten free">Gluten Free</option>
                <option value="dairy free">Dairy Free</option>
                <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="primal">Primal</option>
                <option value="whole 30">Whole 30</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="fodmap friendly">Fodmap Friendly</option>
            </select>
            <select onChange={e => handleOrder(e)}>
                <option >Select Filter</option>
                <optgroup label="Alphabetically">
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </optgroup>
                <optgroup label="Health Score">
                    <option value="hs+">Higher</option>
                    <option value="hs-">Lower</option>
                </optgroup>
            </select>
            <br />
            <Link to="/create-recipe"><button className={styles.buttonCreate}><span>Create Recipe</span></button></Link>
        </div>
    )
}