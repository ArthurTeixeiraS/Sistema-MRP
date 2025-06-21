import { useState } from "react";
import { MainContainer } from "./styles/generic";
import EstruturaForm from "./components/EstruturaForm";
import EstruturaItemForm from "./components/EstruturaItemForm";
import EstruturaItemGrid from "./components/EstruturaItemGrid";
import Buttons from "./components/Buttons";

export interface EstruturaItem {
  idMaterial: number;
  nomeMaterial: string;
  quantidade: number;
}

function App() {
  const [estrutura, setEstrutura] = useState({ id: 0, nome: "" });
  const [itens, setItens] = useState<EstruturaItem[]>([]);

  const adicionarItem = (item: EstruturaItem) => {
    setItens([...itens, item]);
  };

  const gravar = async () => {
    if (estrutura.id <= 0 || !estrutura.nome.trim()) {
      alert("Preencha os dados da estrutura corretamente.");
      return;
    }
    if (itens.length === 0) {
      alert("Adicione pelo menos um item à estrutura.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/estrutura", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: estrutura.id,
          nome: estrutura.nome,
          itens: itens,
        }),
      });

      if (response.ok) {
        alert("Estrutura gravada com sucesso!");
        setEstrutura({ id: 0, nome: "" });
        setItens([]);
      } else {
        const errorText = await response.text();
        alert("Erro ao gravar: " + errorText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };



  const cancelar = () => {
    setEstrutura({ id: 0, nome: "" });
    setItens([]);
  };

  return (
    <MainContainer>
      <EstruturaForm estrutura={estrutura} setEstrutura={setEstrutura} />
      <EstruturaItemForm adicionarItem={adicionarItem} />
      <EstruturaItemGrid itens={itens} />
      <Buttons onGravar={gravar} onCancelar={cancelar} />
    </MainContainer>
  );
}

export default App;
