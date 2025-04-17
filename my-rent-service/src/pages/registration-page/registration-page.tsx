import {JSX} from "react"

function ReagistrationPage(): JSX.Element{
    return(
        <body>
            <div className="form-container">
                <h2>Создать аккаунт</h2>
                <form action="/register" method="POST">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" id="email" name="email" required placeholder="example@mail.com"/>
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" id="password" name="password" required placeholder="Не менее 6 символов"/>
                    </div>
                    <div className="form-group">
                        <label >Подтвердите пароль</label>
                        <input type="password" id="confirm-password" name="confirm-password" required placeholder="Повторите пароль"/>
                    </div>
                    <button type="submit">Зарегистрироваться</button>
                </form>
                <div className="login-link">
                    Уже есть аккаунт? <a href="login.html">Войти</a>
                </div>
            </div>
            
            <div className="gradient-block">
                <h2>Добро пожаловать!</h2>
                <p>Присоединяйтесь к нам и получите доступ к эксклюзивным материалам.</p>
            </div>
        </body>
    )
}

export default ReagistrationPage;