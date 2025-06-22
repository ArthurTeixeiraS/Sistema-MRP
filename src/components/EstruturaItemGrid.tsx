import React from "react";
import type { EstruturaItem } from "../App";

interface Props {
  itens: EstruturaItem[];
  modo: "visualizacao" | "inclusao" | "edicao" | "exclusao";
}

const EstruturaItemGrid: React.FC<Props> = ({ itens }) => {
  return (
    <section>
      <h3>Itens da Estrutura</h3>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Cód. Material</th>
            <th>Nome</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item, index) => (
            <tr key={index}>
              <td>{item.idMaterial}</td>
              <td>{item.nomeMaterial}</td>
              <td>{item.quantidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default EstruturaItemGrid;
