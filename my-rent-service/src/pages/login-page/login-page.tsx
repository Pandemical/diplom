import {JSX} from 'react'

function LoginPage(): JSX.Element {
    return(
        
<body>
    <div className="form-container">
        <h2>Вход в систему</h2>
        <form action="/login" method="POST">
            <div className="form-group">
                <label>Email</label>
                <input type="email" id="email" name="email" required placeholder="example@mail.com"/>
            </div>
            <div className="form-group">
                <label>Пароль</label>
                <input type="password" id="password" name="password" required placeholder="Введите ваш пароль"/>
            </div>
            <button type="submit">Войти</button>
        </form>
        <div className="signup-link">
            Нет аккаунта? <a href="signup.html">Зарегистрироваться</a>
        </div>
    </div>
    
    <div className="gradient-block">
        <h2>С возвращением!</h2>
        <p>Войдите в свой аккаунт, чтобы продолжить работу.</p>
    </div>
</body>
    )
}

export default LoginPage;