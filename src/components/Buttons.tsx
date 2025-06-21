import React from "react";

interface Props {
  onGravar: () => void;
  onCancelar: () => void;
}

const Buttons: React.FC<Props> = ({ onGravar, onCancelar }) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <button onClick={onGravar}>Gravar</button>
      <button onClick={onCancelar} style={{ marginLeft: "1rem" }}>Cancelar</button>
    </div>
  );
};

export default Buttons;
