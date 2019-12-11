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

const IndicatorCalcNumerador = () => {
  const [numerador, setNumerador] = React.useState(0);
  const [denominador, setDenominador] = React.useState(0);

  const handleNumerador = e => {
    setNumerador(e.target.value);
  };

  const handleDenominador = e => {
    setDenominador(e.target.value);
  };

  const result = numerador / denominador;

  return (
    <Table.Cell>
      <input
        type="number"
        name="number"
        id="number"
        placeholder="Numerador"
        onChange={handleNumerador}
        value={numerador}
        style={{ width: "80px" }}
      />
      <Divider />
      <input
        type="number"
        name="number"
        id="number"
        placeholder="Numerador"
        onChange={handleDenominador}
        value={denominador}
        style={{ width: "80px" }}
      />
      <Divider />
      <Table.Cell>
        Result: {result > 0 ? Number.parseFloat(result * 100).toFixed(2) : 0}%
      </Table.Cell>
      <Divider />
      <Table.Cell>
        {result * 100 > 0 && result * 100 <= 59 && (
          <Label as="a" color="orange">
            Deficiente
            <Label.Detail>
              {Number.parseFloat(result * 100).toFixed(2)}
            </Label.Detail>
          </Label>
        )}
        {result * 100 >= 60 && result * 100 <= 94 && (
          <Label as="a" color="yellow">
            Aceptable
            <Label.Detail>
              {Number.parseFloat(result * 100).toFixed(2)}
            </Label.Detail>
          </Label>
        )}
        {result * 100 >= 95 && result * 100 < 100 && (
          <Label as="a" color="green">
            Excelente
            <Label.Detail>
              {Number.parseFloat(result * 100).toFixed(2)}
            </Label.Detail>
          </Label>
        )}
      </Table.Cell>
    </Table.Cell>
  );
};

export default IndicatorCalcNumerador;
