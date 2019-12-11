import React from "react";
import {
  Button,
  Form,
  TextArea,
  Icon,
  Label,
  Menu,
  Table,
  Divider,
  Header as UIHeader,
  Image,
  Modal
} from "semantic-ui-react";

const IndicatorCalcDenominador = ({ denominador, handleDenominador }) => {
  return (
    <Table.Cell>
      <input
        type="number"
        name="number"
        id="number"
        placeholder="Numerador"
        onChange={handleDenominador}
        value={denominador}
        style={{ width: "80px" }}
      />
    </Table.Cell>
  );
};

export default IndicatorCalcDenominador;
