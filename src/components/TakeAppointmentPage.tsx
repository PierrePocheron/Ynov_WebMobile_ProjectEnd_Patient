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

    //const getProvider = collection("users").where("id", "==", match.params.id).get()
    // Todo add where condition
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
      const appointmentCreateDoc = await addDoc(collection(db, 'appointment'), {
        uid: uid(28),

        patient: currentPatient.uid,
        provider: providerUid,

        date: appointmentDate,
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

  return (
    <main className="main">
      <div className=''>
        <section className="wrapper">
          <div className="form">
            <h1 className="text text-large">You are sick as fuck <br/><br/> Take appointment now 📆</h1>
          </div>
        </section>
      </div>
      <div className=''>
        <div style={{display: 'inline-flex'}}>
          {listProvider?.map(provider =>
            <section className="wrapper" style={{margin: '7px'}}>
              <div className="form">
              <h5><i>Provider 👨🏽‍⚕️</i></h5>
                <h4><b>{provider.lastname}</b> {provider.firstname}</h4>
                <div className="input-control">
                  <label htmlFor="appointmentDate" hidden>Appointment date</label>
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
