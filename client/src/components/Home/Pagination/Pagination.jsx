import styles from './pagination.module.css';

export default function Pagination({totalRecipes, recipesPerPage, paginate}) {
    
    var pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalRecipes/recipesPerPage); i++ ) {
        pageNumbers.push(i)
    }

    return (
        <ul className={styles.pagination}>
            {
                pageNumbers.map(pageNumber => (
                    <li key={pageNumber} className={styles.li}>
                        <a href='#' onClick={() => paginate(pageNumber)}>{pageNumber}</a>
                    </li>
                ))
            }
        </ul>
    )
}