import Input from './Input';

const LoginForm = ({ mode , Email, setEmail, password, setpassword,  login }) => {


    return (
    <form >
        <div className="form-block__input-wrapper">
            <div className="form-group form-group--login">
                <Input type="text" id="username" label="email" value={Email}  setvalue={setEmail} disabled={mode === 'signup'}/>
                <Input type="password" id="password" value={password} setvalue={setpassword} label="password" disabled={mode === 'signup'}/>
            </div>
            <div className="form-group form-group--signup">
                <Input type="text" id="fullname" label="full name" disabled={mode === 'login'} />
                <Input type="email" id="email" label="email" disabled={mode === 'login'} />
                <Input type="password" id="createpassword" label="password" disabled={mode === 'login'} />
                <Input type="password" id="repeatpassword" label="repeat password" disabled={mode === 'login'} />
            </div>
        </div>
        <button className="button button--primary full-width" type="submit" onClick={login}>{mode === 'login' ? 'Log In' : 'Sign Up'}</button>
    </form>
    )
}

export default LoginForm;