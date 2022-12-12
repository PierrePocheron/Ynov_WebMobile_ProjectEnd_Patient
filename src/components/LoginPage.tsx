import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


interface PropsLoginPage {
  updateLogin: (isLogin: boolean) => void;
}

const LoginPage = (props: PropsLoginPage) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const { updateLogin } = props;

  const handleClickPassword = async () => {
    //fetch for api firebase auth
    const auth = getAuth();
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    if(user) {
      updateLogin(true);
      navigate("/dashboard");
    }
  }

  const handleChangeEmail = (event: any) => {
    setEmail(event.currentTarget.value)
  }

  const handleChangePassword = (event: any) => {
    setPassword(event.currentTarget.value)
  }

  const handleClickButtonRegister = (event: any) => {
    navigate("/register");
  }

  return (
    <main className="main">
      <div className='container'>
        <section className="wrapper">
          <div className="form">
            <h1 className="text text-large">Patient ? Sign In 👀</h1>
            <p className="text text-normal">New user ?
              <span>
                <a onClick={handleClickButtonRegister} style={{cursor:'pointer'}} className="text text-links"> Register</a>
              </span>
            </p>
            <div className="input-control">
              <label htmlFor="username" hidden>Username</label>
              <input
              type="text"
              id="username"
              name="username"
              className="input-field"
              value={email}
              onChange={handleChangeEmail}
              placeholder="Email Address">
              </input>
            </div>

            <div className="input-control">
              <label htmlFor="password" hidden>Password</label>
              <input type="password"
              id="password"
              name="password"
              className="input-field"
              value={password}
              onChange={handleChangePassword}
              placeholder="Password">
              </input>
            </div>

            <button className="input-submit" onClick={handleClickPassword}>Login</button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default LoginPage;
