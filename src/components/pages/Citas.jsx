import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../organisms/Header";
import Page from "../pages/Page";
import Button from "../atoms/Button";

import "./Cobros.scss";

const Citas = () => {
  const [appts, setAppts] = useState([]);
  const [clients, setClients] = useState(
    JSON.parse(window.localStorage.getItem("clients")) || []
  );
  const [date, setDate] = useState(new Date());

  const database = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  database.settings(settings);

  const onChange = date => setDate(date);

  useEffect(() => {
    database.collection("appts").onSnapshot(querySnapshot => {
      let arr = [];
      querySnapshot.forEach(doc => {
        arr.push({ ...doc.data(), id: doc.id });
        setAppts(arr);
      });
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;

    const data = {
      client: form.client.value,
      description: form.description.value,
      date
    };

    database
      .collection("appts")
      .add(data)
      .then(docRef => {
        toast("Cita guardado correctamente!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000
        });
      })
      .catch(() => {
        toast.error("Error guardando cita!", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });

    form.reset();
  };

  const deleteAppt = id => () => {
    database
      .collection("appts")
      .doc(id)
      .delete()
      .then(() => {
        toast("Cita borrada correctamente!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000
        });
      })
      .catch(error => {
        toast.error("Error borrando cita!", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });
  };

  return (
    <React.Fragment>
      <Header />
      <Page>
        <div
          className="appt"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h3>Agendar cita</h3>
          <DateTimePicker onChange={onChange} value={date} />
          <div className="appt-info" style={{ marginTop: "32px" }}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="client">Seleccionar cliente</label>
              <select
                style={{
                  marginBottom: "12px",
                  width: "200px"
                }}
                name="client"
                id="client"
              >
                {clients &&
                  clients.length > 0 &&
                  clients.map(client => (
                    <option value={client}>{client}</option>
                  ))}
              </select>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                placeholder="Descripción"
              ></textarea>
              <Button type="submit" theme="login__button">
                Enviar
              </Button>
            </form>
          </div>
        </div>
        <div className="cobro">
          <h3>Listado de citas</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Descripcion</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {appts &&
                appts.map(appt => {
                  console.log("TCL: appt", appt);
                  const date = appt.date.toDate();

                  return (
                    <tr>
                      <td>{appt.client}</td>
                      <td>{appt.description}</td>
                      <td>
                        {moment(date.toString())
                          .locale("es")
                          .format("LLLL")}
                      </td>
                      <td style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={deleteAppt(appt.id)}>borrar</Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </Page>
    </React.Fragment>
  );
};

export default Citas;
