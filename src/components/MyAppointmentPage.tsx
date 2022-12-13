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
      const q = query(collection(db, 'appointments'),
                where('patient', '==', currentPatient?.uid),
                where('active', '==', true)
                );
      const getProvider = await getDocs(q)

      let listAppointmentTemp:any[] = []
      getProvider.forEach((doc) => {
        listAppointmentTemp.push(doc.data())
      })
      setListAppointment(listAppointmentTemp)
    }
    fetchData();
  }, [])

  const handleClickCancelAppointment = async (event:any, appointmentUid:string) => {
    await deleteDoc(doc(db, "appointment", "DC"));

    const q = query(collection(db, 'appointment'), where('patient', '==', currentPatient?.uid));
    // Todo
  }

  const handleClickExportAppointment = async (event:any, appointmentUid:string) => {
    // Todo module
  }

  const handleClickButtonTakeAppointment = (event: any) => {
    navigate("/take-appointment");
  }

  return (
  <main className="main">
    <div className=''>
      <section className="wrapper">
        <div className="form">
          <h1 className="text text-large">My appointment 🧑🏽‍🦼</h1>
          <br/><br/>
          <span>
            <a onClick={handleClickButtonTakeAppointment} style={{cursor:'pointer'}} className="text text-links text-left">Take appointment</a>
          </span>
        </div>
      </section>
    </div>

    <section className="grid-container">
      {listAppointment?.map(appointment =>
        <div className="wrapper">
          <div className="form">
          <h5 className="text text-medium"><i>Provider 👨🏽‍⚕️</i></h5>
          <span className="text-left">
            Date : <i>{appointment.date}</i>
            <br/>
            With : {appointment.provider}
            <br/><br/>
          </span>

          <form onSubmit={e => {
            e.preventDefault();
            atcb_action({
              name: 'Appointment - Doctolike with :' + appointment.provider,
              startDate: appointment.date,
              endDate: appointment.date,
              options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
              timeZone: "Europe/Berlin",
              iCalFileName: "Reminder-Event",
            });
          }}>
            <input type="submit" value="Add to calendar" className="input-warning" />
          </form>

          <button className="input-danger" onClick={(event:any) => handleClickCancelAppointment(event, appointment.uid)}>
              Cancel
          </button>
        </div>
      </div>
      )}
    </section>
  </main>
  )

}
export default MyAppointmentPage;
