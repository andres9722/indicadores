// Importacion de librerias
import React, { Fragment, useState } from "react";
import Page from "./Page";
import Header from "../organisms/Header";
import "./Dashboard.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";
import "firebase/firestore";
import serialize from "form-serialize";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  TextArea,
  Label,
  Table,
  Divider,
  Header as UIHeader,
  Modal,
  List,
  Card
} from "semantic-ui-react";
import IndicatorCalcNumerador from "./IndicatorCalcNumerador";

// Opciones para el proceso al que pertenece el indicador
const options = [
  {
    key: "Gestion de la prestacion del servicio",
    text: "Gestion de la prestacion del servicio",
    value: "Gestion de la prestacion del servicio"
  },
  {
    key: "Direccionamiento y planeacion estrategica",
    text: "Direccionamiento y planeacion estrategica",
    value: "Direccionamiento y planeacion estrategica"
  },
  {
    key: "Desarrollo institucional",
    text: "Desarrollo institucional",
    value: "Desarrollo institucional"
  },
  {
    key: "Gestion del conocimiento y la innovacion",
    text: "Gestion del conocimiento y la innovacion",
    value: "Gestion del conocimiento y la innovacion"
  },
  {
    key: "Gestion de la contratacion y las adquisiciones",
    text: "Gestion de la contratacion y las adquisiciones",
    value: "Gestion de la contratacion y las adquisiciones"
  },
  {
    key: "Gestion del talento humano",
    text: "Gestion del talento humano",
    value: "Gestion del talento humano"
  },
  {
    key: "Gestion de recursos financieros",
    text: "Gestion de recursos financieros",
    value: "Gestion de recursos financieros"
  },
  {
    key: "Gestion juridica",
    text: "Gestion juridica",
    value: "Gestion juridica"
  },
  {
    key: "Gestion de comunicaciones",
    text: "Gestion de comunicaciones",
    value: "Gestion de comunicaciones"
  },
  {
    key: "Gestion logistica",
    text: "Gestion logistica",
    value: "Gestion logistica"
  },
  {
    key: "Gestion tecnologica",
    text: "Gestion tecnologica",
    value: "Gestion tecnologica"
  },
  {
    key: "Gestion ambiental",
    text: "Gestion ambiental",
    value: "Gestion ambiental"
  },
  {
    key: "Control y gestion de mejoramiento",
    text: "Control y gestion de mejoramiento",
    value: "Control y gestion de mejoramiento"
  }
];

// Opciones para el tipo al que pertenece el indicador
const optionsType = [
  {
    key: "Eficacia",
    text: "Eficacia",
    value: "Eficacia"
  },
  { key: "Eficiencia", text: "Eficiencia", value: "Eficiencia" },
  { key: "Efectividad", text: "Efectividad", value: "EficienEfectividadcia" }
];

// Declaracion del componente
const Dashboard = () => {
  // Estado de la aplicacion
  const [indicators, setIndicators] = useState([]);
  const [groups, setGroups] = useState([]);

  // Metodos de la base de datos
  const database = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  database.settings(settings);

  // Peticion para obtener los indicadores
  React.useEffect(() => {
    database.collection("indicators").onSnapshot(querySnapshot => {
      let arr = [];
      querySnapshot.forEach(doc => {
        arr.push({ ...doc.data(), id: doc.id });

        setIndicators(arr);
      });
    });

    database.collection("groups").onSnapshot(querySnapshot => {
      let arr = [];
      querySnapshot.forEach(doc => {
        arr.push({ ...doc.data(), id: doc.id });

        setGroups(arr);
      });
    });
  }, []);

  // Metodo para manejar el envio del formulario
  const handleSubmit = e => {
    const form = document.querySelector(".formulario");

    const data = serialize(form, { hash: true });

    database
      .collection("indicators")
      .add(data)
      .then(docRef => {
        toast("Indicador guardado correctamente!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000
        });
      })
      .catch(() => {
        toast.error("Error guardando comentario!", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });

    // Vacear el formulario
    form.reset();
  };

  const handleSubmitGroup = e => {
    const form = document.querySelector(".formulario-grupo");

    let data = serialize(form, { hash: true });

    data = {
      ...data,
      indicators: []
    };

    database
      .collection("groups")
      .add(data)
      .then(docRef => {
        toast("Proceso guardado correctamente!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000
        });
      })
      .catch(() => {
        toast.error("Error guardando proceso!", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });

    // Vacear el formulario
    form.reset();
  };

  // Eliminar un indicador
  const deleteAppt = id => () => {
    database
      .collection("indicators")
      .doc(id)
      .delete()
      .then(() => {
        toast("Indicador borrada correctamente!", {
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

  // Markup del componente
  return (
    <Fragment>
      <Header />
      <Page>
        <div className="dashboard">
          <div className="dashboard-profile">Sesion iniciada</div>

          <Form className="formulario-grupo" onSubmit={handleSubmitGroup}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Nombre del grupo</label>
                <input
                  name="groupName"
                  required
                  placeholder="Nombre del grupo"
                />
              </Form.Field>
            </Form.Group>
            <Button primary type="submit">
              Guardar
            </Button>
          </Form>

          <Card.Group itemsPerRow={4}>
            {groups.map(group => {
              return (
                <Link to={`/dashboard/process/${group.id}`}>
                  <Card color="red">
                    <Card.Content>
                      <Card.Header>{group.groupName}</Card.Header>
                      <Card.Meta>
                        <span className="date">Creado en 2019</span>
                      </Card.Meta>
                      <Card.Description>
                        Numero de Indicadores asociados: {indicators.length}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra></Card.Content>
                  </Card>
                </Link>
              );
            })}
          </Card.Group>
        </div>
        <Divider />
      </Page>
      <ToastContainer />
    </Fragment>
  );
};

export default Dashboard;
