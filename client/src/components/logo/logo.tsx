import {Link} from 'react-router-dom';
import styles from './logo.module.css'
function Logo(){
    return(
        <div className={styles["header-logo"]}>
            <Link to="/">
                <img src="https://budgetbakers.com/wp-content/uploads/2022/05/logo-colors.svg" alt=""/>
            </Link>
        </div>
    )
}

export {Logo};