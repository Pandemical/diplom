import {JSX} from 'react';
import Header from '../../components/header/header';
import LogoutButton from '../../components/logout-button/logout-button';

import styles from './settings-page.module.css'
function SettingsPage(): JSX.Element{
    return(
        <>
            <Header/>   
            <main>
                <div className="content">
                    <div className="container-content-bills">
                        <div className={styles["side-bar"]}>
                            <p>Настройки</p>
                            <a href="" >Редакировать аккаунт</a>
                            <a href="" >Безопастность</a>
                        </div>
                        <div className="main-content">
                            <div className={styles["edit-profile"]}>
                                <div className="img-profile">
                                    <a href=""><img src="image/imgprofile.png" alt="imgprofile"/></a>
                                </div>
                                <div className={styles["input-profile"]}>
                                    <div className={styles["first-name"]}>
                                        <p>Ваше Имя</p>
                                        <input type="text" placeholder="Иван"/>
                                    </div>
                                    <div className={styles["last-name"]}>
                                        <p>Ваша Фамилия</p>
                                        <input type="text" placeholder="Иванов"/>
                                    </div>
                                    <div className={styles["sur-name"]}>
                                        <p>Ваше Отчество</p>
                                        <input type="text" placeholder="Иванович"/>
                                    </div>
                                    <div className={styles["email"]}>
                                        <p>Ваша Почта</p>
                                        <input type="text" placeholder="example@.ru"/>
                                    </div>
                                    <div className={styles["save-button"]}>
                                        <button><span>Сохранить</span></button>
                                    </div>
                                </div>
                                <LogoutButton/>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SettingsPage;