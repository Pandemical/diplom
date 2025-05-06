import {JSX} from 'react'
import {Logo} from '../logo/logo';
import { Link } from 'react-router-dom';
import styles from './header.module.css'

function Header(): JSX.Element {
    return(
        <header className={styles.header}>
            <div className={styles.container}>
                <Logo/>
                <nav className={styles['menu-list']}>
                    <ul>
                        <li><Link to="/">Обзор</Link></li>
                        <li><Link to="/bills">Счета</Link></li>
                        <li><Link to="/transaction">Транзакции</Link></li>
                        <li><Link to="/analiticks">Аналитика</Link></li>
                    </ul>
                </nav>
                <div className={styles['header-right']}>
                    <div className={styles['header-settings']}>
                        <Link to="/settings"><img src="image/settings.png"/></Link>
                    </div>
                    <div className={styles['header-notification']}>
                        <a href="#"><img src="image/notification.png"/></a>
                    </div>
                    <div className={styles['header-account']}>
                        <a href="#"><img src="image/avatar.png"/></a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;