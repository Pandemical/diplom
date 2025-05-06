import {Link} from 'react-router-dom';

function Logo(){
    return(
        <div className="header-logo">
            <Link to="/">
                <img src="https://budgetbakers.com/wp-content/uploads/2022/05/logo-colors.svg" alt=""/>
            </Link>
        </div>
    )
}

export {Logo};