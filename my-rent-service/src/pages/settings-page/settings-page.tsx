import {JSX} from 'react';
import Header from '../../components/header/header';

function SettingsPage(): JSX.Element{
    return(
        <body>
            <Header/>   
            <main>
                <div className="content">
                    <div className="container-content-bills">
                        <div className="side-bar">
                            <span>Настройки</span>
                            <a href="" >Редакировать аккаунт</a>
                            <a href="" >Безопастность</a>
                        </div>
                        <div className="main-content">
                            <div className="edit-profile">
                                <div className="img-profile">
                                    <a href=""><img src="image/imgprofile.png" alt="imgprofile"/></a>
                                </div>
                                <div className="input-profile">
                                    <div className="first-name">
                                        <p>Ваше Имя</p>
                                        <input type="text" placeholder="Иван"/>
                                    </div>
                                    <div className="last-name">
                                        <p>Ваша Фамилия</p>
                                        <input type="text" placeholder="Иванов"/>
                                    </div>
                                    <div className="sur-name">
                                        <p>Ваше Отчество</p>
                                        <input type="text" placeholder="Иванович"/>
                                    </div>
                                    <div className="email">
                                        <p>Ваша Почта</p>
                                        <input type="text" placeholder="example@.ru"/>
                                    </div>
                                    <div className="save-button">
                                        <button><span>Сохранить</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    )
}

export default SettingsPage;