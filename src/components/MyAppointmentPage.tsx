import { ProviderId } from 'firebase/auth';
import { collection, deleteDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../main';
import { atcb_action, atcb_init } from 'add-to-calendar-button';
import 'add-to-calendar-button/assets/css/atcb.css';

const MyAppointmentPage = () => {

  const navigate = useNavigate();
  const currentPatient = auth.currentUser
  const [listAppointment, setListAppointment] = useState<any[]>();


  useEffect(() => {
    if (!auth.currentUser){
      navigate("/login")
    }

    const fetchData = async () => {
      const q = query(collection(db, 'appointment'), where('patient', '==', currentPatient?.uid));
      const getProvider = await getDocs(q)

      let listAppointmentTemp:any[] = []
      getProvider.forEach((doc) => {
        listAppointmentTemp.push(doc.data())
      })
      setListAppointment(listAppointmentTemp)
    }

    fetchData();
    console.log(listAppointment)
  }, [])

  const handleClickCancelAppointment = async (event:any, appointmentUid:string) => {
    await deleteDoc(doc(db, "appointment", "DC"));

    const q = query(collection(db, 'appointment'), where('patient', '==', currentPatient?.uid));
    // Todo
  }

  const handleClickExportAppointment = async (event:any, appointmentUid:string) => {
    // Todo module
  }

  return (
  <main className="main">
    <div className=''>
      <section className="wrapper">
        <div className="form">
          <h1 className="text text-large">My appointment 🧑🏽‍🦼</h1>
        </div>
      </section>
    </div>

    <div className=''>
      <div style={{display: 'inline-flex'}}>
        {listAppointment?.map(appointment =>
          <section className="wrapper" style={{margin: '7px'}}>
            <div className="form">
            <h5><i>Provider 👨🏽‍⚕️</i></h5>
              <h5><i>{appointment.date}</i></h5>
              <h5><i><b>{appointment.uid}</b></i></h5>
              <h4><b>{appointment.provider}</b></h4>
              <h4><b>{appointment.patient}</b></h4>

              <button className="input-danger" onClick={(event:any) => handleClickCancelAppointment(event, appointment.uid)}>
                  Cancel
              </button>
            </div>
          </section>
          )}
      </div>
    </div>

  </main>
  )

}
export default MyAppointmentPage;
