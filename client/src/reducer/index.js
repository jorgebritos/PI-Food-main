import {
    GET_ALL_RECIPES, FILTER_BY_DIET, SEARCH_BY_NAME, ORDER_ALPHABETICALLY,
    GET_RECIPE_DETAIL, CREATE_RECIPE, GET_ALL_DIETS, RESET_DETAIL
} from "../actions"

const initialState = {
    recipes: [],
    allRecipes: [],
    recipeDetail: {},
    diets: []
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case GET_ALL_DIETS:
            return {
                ...state,
                diets: action.payload,
            }
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload
            }
        case RESET_DETAIL:
            return {
                ...state,
                recipeDetail: {}
            }
        case FILTER_BY_DIET:
            const allRecipes = state.allRecipes
            let result = [];

            if (action.payload === "All") {
                result = allRecipes
            } else {
                for (const r of allRecipes) {
                    for (const k in r.diets) {
                        if (Object.hasOwnProperty.call(r.diets, k)) {
                            const element = r.diets[k];
                            if (element.name === action.payload) result.push(r)
                        }
                    }
                }
            }
            return {
                ...state,
                recipes: result
            }
        case SEARCH_BY_NAME:
            const allRecipes2 = state.allRecipes
            const searchedRecipes = allRecipes2.filter(recipe => recipe.name.toLowerCase().includes(action.payload.toLowerCase()))
            return {
                ...state,
                recipes: searchedRecipes
            }
        case ORDER_ALPHABETICALLY:
            const sortRecipes = action.payload === "asc" ?
                state.recipes.sort((a, b) => a.name.localeCompare(b.name)) :
                action.payload === "desc" ? state.recipes.sort((a, b) => b.name.localeCompare(a.name)) :

                    action.payload === "hs+" ? state.recipes.sort((a, b) => b.healthScore - a.healthScore) :
                        state.recipes.sort((a, b) => a.healthScore - b.healthScore)

            return {
                ...state,
                recipes: sortRecipes
            }
        case CREATE_RECIPE:
            return action.payload
        default:
            return state;
    }
}