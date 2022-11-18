import React from 'react';
import { Link } from 'react-router-dom';
import styles from './card.module.css';

export default function Card({ id, name, image, healthScore, diets }) {
    return (
        <div className={styles.card}>
            <Link to={`/recipes/${id}`}>
                {image ? <img src={image} alt="" /> : <h2>Creado desde el formulario!</h2>}
                <h3>{name}</h3>
                <h4>healthScore: {healthScore}</h4>
                <h5>Diets:</h5>
                <ul className={styles.diets}>
                    {diets.length > 0 ? diets.map(d => {
                        return (
                            <li key={d.name} className={styles.li}>{d.name}</li>
                        )
                    }) : <li className={styles.noDiets}>Esta receta no contiene dietas</li>}
                </ul>
            </Link>
        </div>
    )
}