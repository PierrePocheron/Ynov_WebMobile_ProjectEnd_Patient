import { ProviderId } from 'firebase/auth';
import { collection, updateDoc, getDocs, query, where, doc } from 'firebase/firestore';
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
      const qAppointment = query(collection(db, 'appointments'),
                where('patient', '==', currentPatient?.uid)
                );
      const getAppointments = await getDocs(qAppointment)

      const listAppointmentsTemp = await Promise.all(
        getAppointments.docs.map( async (appointment) => {

          var appointmentData = appointment.data()
          console.log(appointmentData.patient)

          const qProvider = query(collection(db, 'users'), where('uid', '==', appointmentData.provider));
          const getProvider = await getDocs(qProvider)

          var providerData = getProvider.docs.at(0)?.data()

          return ({
            id: appointment.id,
            data: appointmentData,
            provider: providerData,
          })
        })
      )
      console.log(listAppointmentsTemp)
      setListAppointment(listAppointmentsTemp)
    }
    fetchData();
  }, [])


  const handleClickCancelAppointment = async (event:any, appointmentId:string) => {

    const appointmentRef = doc(db, "appointments", appointmentId);

    const data = {
      status: 'DELETED'
    };

    updateDoc(appointmentRef, data)
    .then(docRef => {
        console.log("Appointment canceled");
    })
    .catch(error => {
        console.log(error);
    })

    // Update state
    const newAppointments = listAppointment?.filter((appointment) => appointment.id !== appointmentId);
    setListAppointment(newAppointments);
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
          <span>
            <h1>👨🏽‍⚕️</h1>
            <b>Provider : </b>{appointment.provider.lastname} {appointment.provider.firstname}<br/>
            <b>Date : </b><i>{appointment.data.date}</i><br/>
            <b>Time : </b><i>{appointment.data.time}</i><br/>
            <br/><br/>
          </span>

          <form onSubmit={e => {
            e.preventDefault();
            atcb_action({
              name: 'Appointment - Doctolike with : ' + appointment.data.provider,
              startDate: appointment.data.date,
              endDate: appointment.data.date,
              options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
              timeZone: "Europe/Berlin",
              iCalFileName: "Appointment-Event",
            });
          }}>
            <input type="submit" value="Add to calendar" className="input-warning" />
          </form>

          <button className="input-danger" onClick={(event:any) => handleClickCancelAppointment(event, appointment.id)}>
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
