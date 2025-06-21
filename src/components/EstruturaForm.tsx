import React from "react";

interface Props {
  estrutura: { id: number; nome: string };
  setEstrutura: React.Dispatch<React.SetStateAction<{ id: number; nome: string }>>;
}

const EstruturaForm: React.FC<Props> = ({ estrutura, setEstrutura }) => {
  return (
    <header>
      <h2>Cadastro de Estrutura</h2>
      <form>
        <label htmlFor="idEstrutura">Cod. Estrutura</label>
        <input
            type="number"
            name="idEstrutura"
            min={1}
            value={estrutura.id}
            onChange={(e) => {
                const value = Number(e.target.value);
                if (value > 0) setEstrutura({ ...estrutura, id: value });
            }}
        />
        <input
            type="text"
            name="nomeEstrutura"
            value={estrutura.nome}
            onChange={(e) => setEstrutura({ ...estrutura, nome: e.target.value.trimStart() })}
        />    
      </form>
    </header>
  );
};

export default EstruturaForm;
