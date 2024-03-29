import { ProviderId } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../main';
import { uid } from 'uid';


const TakeAppointmentPage = () => {

  const navigate = useNavigate();
  const currentPatient = auth.currentUser
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [listProvider, setListProvider] = useState<any[]>();


  useEffect(() => {
    if (!auth.currentUser){
      navigate("/login")
    }

    const fetchData = async () => {
      const q = query(collection(db, 'users'), where('type', '==', 'PROVIDER'));
      const getProvider = await getDocs(q)

      let listProviderTemp:any[] = []
      getProvider.forEach((doc) => {
        listProviderTemp.push(doc.data())
      })
      setListProvider(listProviderTemp)
    }

    fetchData();
    console.log(listProvider)
  }, [])


  const handleClickTakeAppointment = async (event:any, providerUid:string) => {
    if (currentPatient){
      const appointmentCreateDoc = await addDoc(collection(db, 'appointments'), {
        uid: uid(28),
        status: 'WAITING_CONFIRMATION',
        date: appointmentDate,

        patient: currentPatient.uid,
        provider: providerUid,
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage)
        console.log(error);
      })

      if (appointmentCreateDoc) {
        console.log(appointmentCreateDoc)
        // Todo add navigation ?
        navigate("/my-appointment");
      }
    }
  }

  const handleChangeDate = (event: any) => {
    setAppointmentDate(event.currentTarget.value)
  }

  const handleClickButtonMyAppointment = (event: any) => {
    navigate("/my-appointment");
  }

  return (
    <main className="main">
      <div className=''>
        <section className="wrapper">
          <div className="form">
            <h1 className="text text-large text-left">You are sick as fuck<br/><br/>Take appointment now 📆</h1>
            <br/><br/>
            <span>
              <a onClick={handleClickButtonMyAppointment} style={{cursor:'pointer'}} className="text text-links text-left">See my appointment</a>
            </span>
          </div>
        </section>
      </div>
      <div className=''>
        <div style={{display: 'inline-flex'}}>
          {listProvider?.map(provider =>
            <section className="wrapper" style={{margin: '7px'}}>
              <div className="form">
                <h1><i>👨🏽‍⚕️</i></h1>
                <p><b>Provider : </b>{provider.lastname} {provider.firstname}</p>

                <div className="input-control">
                  <label htmlFor="appointmentDate" hidden>Date</label>
                  <input
                  type="date"
                  id="appointmentDate"
                  name="appointmentDate"
                  className="input-field"
                  onChange={handleChangeDate}>
                  </input>
                </div>
                <button className="input-submit" onClick={(event:any) => handleClickTakeAppointment(event, provider.uid)}>
                    Take
                </button>
              </div>
            </section>
            )}
        </div>
      </div>
    </main>
  )
}
export default TakeAppointmentPage;
