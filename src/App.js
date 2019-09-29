import React, { Fragment, useEffect, useState } from "react";



const Appointment = ({ appointment, index, deleteAppointment }) => {
  return (
    <div className="cita">
      <p>Mascota: <span>{appointment.pet}</span> </p>
      <p>Dueño: <span>{appointment.owner}</span> </p>
      <p>Fecha: <span>{appointment.date}</span> </p>
      <p>Hora: <span>{appointment.hour}</span> </p>
      <p>Sintomas: <span>{appointment.symptom}</span> </p>
      <button
        onClick={() => deleteAppointment(index)}
        type="button"
        className="button eliminar u-full-width"
      >
        Eliminar X
      </button>
    </div>
  )
}


const Formulario = ({createAppointment}) => {
  const initialSate = {
    pet:      '',
    owner:    '',
    date:     '',
    hour:     '',
    symptom:  ''
  };

  // cita = appointment
  // appointment = this.state
  // setAppointment = this.setState()
  const [appointment, setAppointment] = useState(initialSate);

  // actualiza el state
  const handleChange = e => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value
    });
  };

  
  // pasamos la cita al componente principal
  const onSubmit = e => {
    e.preventDefault();
    console.log(appointment);
    // pasar la cita hacia el componente principal
    createAppointment(appointment)
    // Reiniciar el state (reiniciar el form)
    setAppointment(initialSate)

  }

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      <form onSubmit={onSubmit}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="pet"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={handleChange}
          value={appointment.pet}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="owner"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          onChange={handleChange}
          value={appointment.owner}
        />

        <label>Fecha</label>
        <input
          type="date"
          className="u-full-width"
          name="date"
          onChange={handleChange}
          value={appointment.date}
        />

        <label>Hora</label>
        <input
          type="time"
          className="u-full-width"
          name="hour"
          onChange={handleChange}
          value={appointment.hour}
        />

        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="symptom"
          onChange={handleChange}
          value={appointment.symptom}
        ></textarea>

        <button type="submit" className="button-primary u-full-width">
          Agregar
        </button>
      </form>
    </Fragment>
  );
};

const App = () => {

  // Cargar las citas de localstorage como state incial
  let initialAppointments = JSON.parse(localStorage.getItem('citas'));
  if(!initialAppointments) {
    initialAppointments = [];
  }

  // Appointments = citas
  // useState retorna 2 funciones
  // appointments es el state actual = this.state
  // setAppointments funcion que actualiza el state = this.setState()
  // valor inicial del state es un arreglo vacio!
  const [appointments, setAppointments] = useState(initialAppointments);

  // Se ejecuta cuando el componenete se carga o cuando se actualiza
  useEffect(
    () => {
      let initialAppointments = JSON.parse(localStorage.getItem('citas'));
      if(initialAppointments) {
        localStorage.setItem('citas', JSON.stringify(appointments))
      } else {
        localStorage.setItem('citas', JSON.stringify([]));
      }

    }, [appointments]
  );

  // Metodo para agregar las neuvas citas al state
  const createAppointment = appointment => {
    // Tomar una copia del state y agregar el nuevo cliente
    const newsAppointments = [...appointments, appointment];
    // Almacenamos en el state
    setAppointments(newsAppointments);
  }

  // Elimina las citas del state
  const deleteAppointment = index => {
    const newsAppointments = [...appointments];
    newsAppointments.splice(index, 1);
    setAppointments(newsAppointments);
  }

  // cargar condicionalmente un titutlo
  const title = Object.keys(appointments).length === 0 ? 'No hay citas' : 'Administrar las citas';

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              createAppointment={createAppointment}
            />
          </div>
          <div className="one-half column">
              <h2> { title } </h2>
              {
                appointments.map((appointment, index) => (
                  <Appointment 
                    key ={index}
                    index={index}
                    appointment={appointment}
                    deleteAppointment={deleteAppointment}
                  />
                ))
              }
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
