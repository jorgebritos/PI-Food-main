const { Router } = require("express");
const { Diet, Recipe } = require("../db.js");
const router = Router()
const axios = require("axios");
const {
    API_KEY
} = process.env;

router.post('/', async (req, res) => {
    try {
        const { id, name, image, summary, healthScore, steps, diets } = req.body
        if (!name || !summary || !healthScore || !steps || !diets) {
            return res.status(422).send("Missing data")
        }

        const newRecipe = await Recipe.create({
            id,
            name,
            image,
            summary,
            healthScore,
            steps
        })

        diets.forEach(async d => {
            const searchDiet = await Diet.findOne({
                where: { name: d }
            })
            newRecipe.addDiet(searchDiet)
        });
        res.status(200)
    } catch (error) {
        res.sendStatus(404)
    }
})

router.get('/', async (req, res) => {
    const dietTable = await Diet.findAll()

    if (dietTable.length > 0) return res.send(dietTable)

    let apiInfo = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=108`)
    apiInfo.then(info => info.data.results.map(d => { return { diet: d.diets, vegetarian: d.vegetarian } }))
        .then(info => {
            let aux = []
            for (const diet of info) {
                if (diet['diet']) {
                    let d = diet['diet']
                    if (diet['vegetarian']) d.push('vegetarian')
                    aux.push(...d)

                }
            }

            let result = [...new Set(aux)]
            res.send(result);

            result = result.map(e => {
                return {
                    name: e
                }
            })
            Diet.bulkCreate(result)
        })
        .catch(error => console.error('Inside error:', error))
})

module.exports = router;