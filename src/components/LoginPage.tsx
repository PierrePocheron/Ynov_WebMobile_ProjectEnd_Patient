import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

interface PropsLoginPage {
  updateLogin: (isLogin: boolean) => void;
}

const LoginPage = (props: PropsLoginPage) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { updateLogin } = props;

  const handleClickPassword = async () => {
    //fetch for api firebase auth
    const auth = getAuth();
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
    if(user) {
      updateLogin(true);
      // Todo : add user & role in Firestore
    }
  }

  const handleChangeEmail = (event: any) => {
    setEmail(event.currentTarget.value)
  }

  const handleChangePassword = (event: any) => {
    setPassword(event.currentTarget.value)
  }

  return (
    <main className="main">
      <div className='container'>
        <section className="wrapper-login">
          <div className="form">
            <h1 className="text text-large">Patient ? Sign In 👀</h1>

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
