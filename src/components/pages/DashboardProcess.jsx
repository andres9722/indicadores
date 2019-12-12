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
import { withRouter } from "react-router-dom";

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
const DashboardProcess = props => {
  console.log("TCL: DashboardProcess -> props", props);
  // Estado de la aplicacion
  const [indicators, setIndicators] = useState([]);
  const [groups, setGroups] = useState([]);

  // Metodos de la base de datos
  const database = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  database.settings(settings);

  // Peticion para obtener los indicadores
  React.useEffect(() => {
    const path = props.location.pathname;
    const res = path.split("/dashboard/process/");
    console.log("TCL: res", res[1]);

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

          <Form className="formulario" onSubmit={handleSubmit} size="large">
            <Form.Group widths="equal">
              <Form.Field>
                <label>Nombre del indicador</label>
                <input
                  name="name"
                  required
                  placeholder="Nombre del indicador"
                />
              </Form.Field>
              <Form.Field>
                <label>Numero del indicador</label>
                <input
                  name="number"
                  required
                  placeholder="Numero del indicador"
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select
                name="process"
                fluid
                label="Proceso al que pertenece"
                options={options}
                placeholder="Proceso"
                required
              />
              <Form.Select
                name="type"
                fluid
                label="Tipo de indicador"
                options={optionsType}
                placeholder="Tipo"
                required
              />
            </Form.Group>
            <Form.Field
              name="opinion"
              id="form-textarea-control-opinion"
              control={TextArea}
              label="Opinion"
              placeholder="Opinion"
              required
            />
            <Form.Group widths="equal">
              <Form.Field>
                <label>Encargado del proceso</label>
                <input
                  name="incharge"
                  required
                  placeholder="Encargado del proceso"
                />
              </Form.Field>
              <Form.Field>
                <label>Lider del proceso</label>
                <input name="lead" required placeholder="Lider del proceso" />
              </Form.Field>
              <Form.Field>
                <label>Fuente</label>
                <input name="source" required placeholder="Fuente" />
              </Form.Field>
            </Form.Group>
            <Button primary type="submit">
              Guardar
            </Button>
          </Form>
        </div>
        <Divider />
        <div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Numero</Table.HeaderCell>
                <Table.HeaderCell>Opinion</Table.HeaderCell>
                <Table.HeaderCell>Lider</Table.HeaderCell>
                <Table.HeaderCell>Fuente</Table.HeaderCell>
                <Table.HeaderCell>Excelente</Table.HeaderCell>
                <Table.HeaderCell>Aceptable</Table.HeaderCell>
                <Table.HeaderCell>Deficiente</Table.HeaderCell>
                <Table.HeaderCell>Persona a cargo</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {indicators.map(indicator => (
                <Table.Row>
                  <Table.Cell>{indicator.name}</Table.Cell>
                  <Table.Cell>{indicator.number}</Table.Cell>
                  <Table.Cell>{indicator.opinion}</Table.Cell>
                  <Table.Cell>{indicator.lead}</Table.Cell>
                  <Table.Cell>{indicator.source}</Table.Cell>
                  <Table.Cell>95% > </Table.Cell>
                  <Table.Cell>60% - 94%</Table.Cell>
                  <Table.Cell> {"< 59%"} </Table.Cell>
                  <Table.Cell>{indicator.incharge}</Table.Cell>
                  <Table.Cell>
                    <Button onClick={deleteAppt(indicator.id)} primary>
                      Eliminar
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Modal
                      size="fullscreen"
                      trigger={<Button secondary>Detalle</Button>}
                    >
                      <Modal.Header>Indicadores</Modal.Header>
                      <Modal.Content>
                        <p>
                          <b>Nombre:</b> {indicator.name}
                        </p>
                        <p>
                          <b>Número: </b> {indicator.number}
                        </p>
                        <p>
                          <b>Lider:</b> {indicator.lead}
                        </p>
                        <p>
                          <b>Encargado del proceso:</b> {indicator.incharge}
                        </p>
                        <p>
                          <b>Fuente:</b> {indicator.source}
                        </p>
                        <Modal.Description>
                          <Label as="a" color="green">
                            Excelente
                            <Label.Detail>95% ></Label.Detail>
                          </Label>
                          <Label as="a" color="yellow">
                            Aceptable
                            <Label.Detail>60% - 94%</Label.Detail>
                          </Label>
                          <Label as="a" color="orange">
                            Deficiente
                            <Label.Detail>{"< 59%"}</Label.Detail>
                          </Label>
                        </Modal.Description>
                        <Divider />
                        <Table celled>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>Enero</Table.HeaderCell>
                              <Table.HeaderCell>Febrero</Table.HeaderCell>
                              <Table.HeaderCell>Marzo</Table.HeaderCell>
                              <Table.HeaderCell>Abril</Table.HeaderCell>
                              <Table.HeaderCell>Mayo</Table.HeaderCell>
                              <Table.HeaderCell>Junio</Table.HeaderCell>
                              <Table.HeaderCell>Julio</Table.HeaderCell>
                              <Table.HeaderCell>Agosto</Table.HeaderCell>
                              <Table.HeaderCell>Septiembre</Table.HeaderCell>
                              <Table.HeaderCell>Octubre</Table.HeaderCell>
                              <Table.HeaderCell>Noviembre</Table.HeaderCell>
                              <Table.HeaderCell>Diciembre</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            <Table.Row>
                              {[...new Array(12)].map(item => {
                                return (
                                  <IndicatorCalcNumerador
                                    indicator={indicator}
                                  />
                                );
                              })}
                            </Table.Row>
                          </Table.Body>
                        </Table>
                      </Modal.Content>
                    </Modal>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Page>
      <ToastContainer />
    </Fragment>
  );
};

export default withRouter(DashboardProcess);
