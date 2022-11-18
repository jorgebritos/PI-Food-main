import axios from 'axios';
export const GET_ALL_RECIPES = "GET_ALL_RECIPES"
export const FILTER_BY_DIET = "FILTER_BY_DIET"
export const ORDER_ALPHABETICALLY = "ORDER_ALPHABETICALLY"
export const SEARCH_BY_NAME = "SEARCH_BY_NAME"
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL"
export const CREATE_RECIPE = "CREATE_RECIPE"
export const GET_ALL_DIETS = "GET_ALL_DIETS"
export const RESET_DETAIL = "RESET_DETAIL"

export function getAllRecipes() {
    return async function (dispatch) {
        const recipesInfo = await axios.get('http://localhost:3001/recipes')
        dispatch({
            type: GET_ALL_RECIPES,
            payload: recipesInfo.data
        })
    }
}

export function getAllDiets() {
    return async function (dispatch) {
        const recipesInfo = await axios.get('http://localhost:3001/diets')
        dispatch({
            type: GET_ALL_DIETS,
            payload: recipesInfo.data
        })
    }
}

export function getRecipeDetail(id) {
    return async function (dispatch) {
        const recipeDetail = await axios.get(`http://localhost:3001/recipes/${id}`)
        dispatch({
            type: GET_RECIPE_DETAIL,
            payload: recipeDetail.data
        })
    }
}

export function resetDetail() {
    return async function (dispatch) {
        dispatch({
            type: RESET_DETAIL
        })
    }
}

export function searchByName(payload) {
    return {
        type: SEARCH_BY_NAME,
        payload
    }
}

export function filterByDiet(payload) {
    return {
        type: FILTER_BY_DIET,
        payload
    }
}

export function orderBy(payload) {
    return {
        type: ORDER_ALPHABETICALLY,
        payload
    }
}

export function createRecipe(payload) {
    return async function (dispatch) {
        const info = await axios.post('http://localhost:3001/diets', payload)
        dispatch({
            type: CREATE_RECIPE,
            payload: info.data
        })
    }
}