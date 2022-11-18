const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
const { Diet, Recipe } = require("../db.js");
const router = Router();
const {
    API_KEY
} = process.env;


router.get('/', async (req, res) => {
    const { name } = req.query
    const recipeTable = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })

    const dietTable = await Recipe.findAll()
    if (recipeTable.length === 0) {
        try {
            let apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=108`)
            const recipes = apiInfo.data.results.map(c => {
                return {
                    id: c.id,
                    name: c.title,
                    image: c.image,
                    summary: c.summary,
                    healthScore: c.healthScore,
                    steps: { ...c.analyzedInstructions[0] }
                }
            });
            await Recipe.bulkCreate(recipes)
            let info = apiInfo.data.results.map(c => {
                return {
                    id: c.id,
                    name: c.title,
                    image: c.image,
                    summary: c.summary,
                    healthScore: c.healthScore,
                    steps: { ...c.analyzedInstructions[0] },
                    diets: [...c.diets, c.vegetarian ? "vegetarian" : ""]
                }
            });

            for (let i = 0; i < recipes.length; i++) {
                let aRecipe = recipes[i];
                let data = await recipeTable.find(r => r.id == aRecipe.id);
                for (let j = 0; j < aRecipe.diets.length; j++) {
                    let diet = await dietTable.find(d => d.name == aRecipe.diets[j])
                    data.addDiet(diet)
                }
            }
            return res.send(info)
        } catch (error) {
            res.status(404).send(error)
        }
    } else {
        if (name) {
            const specificRecipe = await Recipe.findAll({
                where: {
                    name: { [Op.iLike]: `%${name}%` }
                }
            })

            if (specificRecipe.length > 0) return res.status(200).send(specificRecipe);

            return res.status(404).send("No such Recipe");
        }
    }
    res.status(200).send(recipeTable);
})

router.get('/:id', async (req, res) => {
    const selectedRecipe = await Recipe.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    if (selectedRecipe) {
        res.status(200).send(selectedRecipe)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router