import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../main';
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const navigate = useNavigate();


  const handleClickRegister = async () => {
    const userCreate = await createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => {
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
      const userCreateDoc = await addDoc(collection(db, 'users'), {
        uid: userCreate.user.uid,
        type: "PATIENT",
        address: address,
        firstname: firstname,
        lastname: lastname,
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage)
        console.log(error);
      })

      if (userCreateDoc) {
        navigate("/login");
      }
    }
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

  const handleChangeFirstname = (event: any) => {
    setFirstname(event.currentTarget.value)
  }

  const handleChangeLastname = (event: any) => {
    setLastname(event.currentTarget.value)
  }

  const handleClickButtonLogin = (event: any) => {
    navigate("/login");
  }

  return (
    <main className="main">
      <div className='container'>
        <section className="wrapper">
          <div className="form">
            <h1 className="text text-large">Patient without account ?<br/><br/> Register 👀</h1>

            <p className="text text-normal">You have account ?
              <span>
                <a onClick={handleClickButtonLogin} style={{cursor:'pointer'}} className="text text-links"> Login</a>
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

            <div className="input-control">
              <label htmlFor="firstname" hidden>Firstname</label>
              <input type="firstname"
              id="firstname"
              name="firstname"
              className="input-field"
              value={firstname}
              onChange={handleChangeFirstname}
              placeholder="Firstname">
              </input>
            </div>

            <div className="input-control">
              <label htmlFor="lastname" hidden>Lastname</label>
              <input type="lastname"
              id="lastname"
              name="lastname"
              className="input-field"
              value={lastname}
              onChange={handleChangeLastname}
              placeholder="Lastname">
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
