import React from 'react';
import {Link} from 'react-router-dom';
import styles from './landingPage.module.css';

export default function LandingPage() {
    return(
        <div className={styles.container}>
            <div className={styles.image}></div>
            <h1 className={styles.title}>The Food App</h1>
            <Link to ="/home">
                <button className={styles.enterButton}><span>Explore!</span></button>
            </Link>
        </div>
    )
}