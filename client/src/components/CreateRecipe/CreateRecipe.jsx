import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createRecipe, getAllDiets, getAllRecipes } from "../../actions/index";
import styles from "./createRecipe.module.css"

const CreateRecipe = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDiets())
        dispatch(getAllRecipes())
    }, [dispatch])

    let recipes = useSelector(state => state.allRecipes)
    let diets = useSelector(state => state.diets);

    const [input, setInput] = useState({
        name: "",
        healthScore: 0,
        summary: ""
    });

    const [error, setError] = useState("");

    function handleInput(e) {
        e.preventDefault()
        let regex = new RegExp("^[a-zA-Z ]+$");
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        if (!regex.test(input.name)) {
            setError("El nombre solo puede contener letras")
        } else {
            setError("")
        }
        visibility();
    }

    const [steps, setSteps] = useState({
        name: "",
        listSteps: [],
        newStepNumber: 0,
        newStep: ""
    })

    function handleSteps(e) {
        e.preventDefault();
        setSteps({
            ...steps,
            [e.target.name]: e.target.value
        })
        visibility();
    }

    function quitarPaso(e) {
        e.preventDefault();
        steps.listSteps.pop();

        handleSteps(e)
    }

    function cantidadPasos() {
        return steps.listSteps.length;
    }

    function agregarPaso(e) {
        e.preventDefault();
        if (steps.newStep.length < 1) return alert("El paso no puede estar vacío")
        steps.newStepNumber = steps.listSteps.length + 1;
        steps.listSteps.push({
            number: steps.newStepNumber,
            step: steps.newStep
        });


        steps.newStep = "";
        steps.newStepNumber = 0;

        handleSteps(e);
    }

    const [checkedState, setCheckedState] = useState(
        new Array(11).fill(false)
    );

    const [isChecked, setIsChecked] = useState([]);

    const handleOnChange = (position, e) => {
        //SETEAR CAMPOS QUE ESTAN CHECKED
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        //GUARDAR LOS VALORES O QUITARLOS DE LA LISTA DE DIETAS DEPENDIENDO DEL VALOR
        if (e.target.checked) {
            setIsChecked([...isChecked, e.target.value])
        } else {
            let newArray = isChecked.filter(i => i !== e.target.value)
            setIsChecked(newArray)
        }
        
        setCheckedState(updatedCheckedState);
        visibility();
    };

    const handleButton = () => {
        return !input.name || input.healthScore === 0 || !input.summary || steps.listSteps.length < 1 || isChecked.length < 1
    }

    const visibility = () => {
        if (!handleButton()) {
            return styles.button;
        } else {
            return styles.invisible;
        }
    }

    const validar = function (e) {
        e.preventDefault();
        let regex = new RegExp("^[a-zA-Z ]+$");
        if (!regex.test(input.name)) return alert("El nombre debe contener solo letras")

        dispatch(createRecipe({
            id: recipes.length,
            name: input.name.trim(),
            image: "",
            summary: input.summary,
            healthScore: Number(input.healthScore),
            steps: { name: steps.name, steps: steps.listSteps },
            diets: [...isChecked]
        }));

        input.name = "";
        input.healthScore = 0;
        input.summary = "";
        steps.listSteps = [];
        
        setCheckedState(new Array(11).fill(false))
        handleInput(e);
    }

    return (
        <div className={styles.general}>
            <div className={styles.container}>
                <button className={styles.button}><Link to="/home"><span>Home</span></Link></button>
                <hr />
                <h1>Create Recipe</h1>
                <label className={styles.label}>Name: </label>

                <input
                    type="text"
                    name="name"
                    className={styles.input}
                    value={input.name}
                    onInput={e => handleInput(e)}
                />
                <p>{error}</p>

                <hr />

                <label className={styles.label}>Health Score: </label>

                <input
                    type="number"
                    name="healthScore"
                    value={input.healthScore}
                    onInput={e => handleInput(e)}
                />

                <hr />

                <label className={styles.label}>Summary: </label>

                <textarea
                    name="summary"
                    value={input.summary}
                    onInput={e => handleInput(e)}
                    cols="30"
                    rows="10">
                </textarea>

                <hr />

                <label className={styles.label}>Select Diets:</label>

                <div className="dietsDiv">
                    {
                        diets?.map((d, index) => {
                            return (
                                <div key={d.name}>
                                    <label htmlFor={d.name}>{d.name}
                                        <input type="checkbox" name="diet" checked={checkedState[index]} value={d.name} onChange={(e) => handleOnChange(index, e)} />
                                        <span></span>
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>

                <hr />

                <label className={styles.label}>Steps: </label>

                <textarea
                    name="newStep"
                    id="stepI"
                    value={steps.newStep}
                    onChange={e => handleSteps(e)}
                    cols="30"
                    rows="10">
                </textarea>
                <label className={styles.label}>Actualmente hay {cantidadPasos()} pasos </label>
                <div className="buttons">
                    <button className={styles.stepsB} onClick={e => agregarPaso(e)}><span>Agregar Paso</span></button>
                    <button className={steps.listSteps.length > 0 ? styles.stepsB : styles.invisible} onClick={e => quitarPaso(e)}><span>Quitar Último Paso</span></button>
                </div>

                <hr />

                <button className={visibility()} type="submit" disabled={handleButton()} id="btn" onClick={e => validar(e)}><span>Create</span></button>
                <p>{handleButton() ? "Debe rellenar los campos para poder crear la receta" : ""}</p>
            </div>
        </div>
    );
};

export default CreateRecipe;