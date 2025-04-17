import {JSX} from 'react'
import {Logo} from '../logo/logo';
import { Link } from 'react-router-dom';

function Header(): JSX.Element {
    return(
        <header>
            <div className="header">
                <div className="container">
                    <Logo/>
                    <nav className="menu-list">
                        <ul>
                            <li><Link to="/">Обзор</Link></li>
                            <li><Link to="/bills">Счета</Link></li>
                            <li><Link to="/transaction">Транзакции</Link></li>
                            <li><Link to="/analiticks">Аналитика</Link></li>
                        </ul>
                    </nav>
                    <div className="header-right">
                        <div className="header-settings">
                            <Link to="/settings"><img src="image/settings.png"/></Link>
                        </div>
                        <div className="header-notification">
                            <a href="#"><img src="image/notification.png"/></a>
                        </div>
                        <div className="header-account">
                            <a href="#"><img src="image/avatar.png"/></a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;