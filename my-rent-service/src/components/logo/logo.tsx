import {Link} from 'react-router-dom';

function Logo(){
    return(
        <div className="header-logo">
            <Link to="/">
                <img src="../../public/image/logo.png" alt=""/>
            </Link>
        </div>
    )
}

export {Logo};