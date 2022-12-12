import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../main';


const RegisterPage = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleClickRegister = async () => {
    const userCreate = await createUserWithEmailAndPassword(auth, email, password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      })

    if (userCreate){
      const userCreateDoc = addDoc(collection(db, 'users'), {
        uid: userCreate.user.uid,
        type: "PATIENT",
        address: address
      })
    }
    // if(userCreateDoc) Redirect to /login
}

  const handleChangeEmail = (event: any) => {
    setEmail(event.currentTarget.value)
  }

  const handleChangePassword = (event: any) => {
    setPassword(event.currentTarget.value)
  }

  const handleChangeAddress = (event: any) => {
    setAddress(event.currentTarget.value)
  }

  return (
    <main className="main">
      <div className='container'>
        <section className="wrapper-Register">
          <div className="form">
            <h1 className="text text-large">Patient without account ? Register 👀</h1>
            <p className="text text-normal">You have account ?
              <span>
                <a href="login" className="text text-links">Login</a>
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

            <div className="input-control">
              <label htmlFor="address" hidden>Address</label>
              <input type="address"
              id="address"
              name="address"
              className="input-field"
              value={address}
              onChange={handleChangeAddress}
              placeholder="Address">
              </input>
            </div>

            <button className="input-submit" onClick={handleClickRegister}>Register</button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default RegisterPage;
