import React from "react";

interface Props {
  estrutura: { id: number; nome: string };
  setEstrutura: React.Dispatch<React.SetStateAction<{ id: number; nome: string }>>;
  onConsultar: () => void;
  modo: "inclusao" | "edicao" | "exclusao" | "visualizacao";
}


const EstruturaForm: React.FC<Props> = ({ estrutura, setEstrutura, onConsultar, modo }) => {
  return (
    <header>
      <h2>Cadastro de Estrutura</h2>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label htmlFor="idEstrutura">Cod. Estrutura</label>
        <input
          type="number"
          name="idEstrutura"
          min={1}
          value={estrutura.id}
          onChange={(e) => {
            const value = Number(e.target.value);
            setEstrutura((prev) => ({ ...prev, id: value }));
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="text"
            name="nomeEstrutura"
            placeholder="Nome da estrutura"
            value={estrutura.nome}
            onChange={(e) =>
              setEstrutura((prev) => ({ ...prev, nome: e.target.value.trimStart() }))
            }
          />
          <button type="button" onClick={onConsultar} disabled={modo === "inclusao"}>
            Consultar
          </button>
        </div>
      </form>
    </header>
  );
};

export default EstruturaForm;
