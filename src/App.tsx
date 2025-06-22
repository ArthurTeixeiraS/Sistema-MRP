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
  type Modo = "inclusao" | "edicao" | "exclusao" | "visualizacao";
  const [modo, setModo] = useState<Modo>("visualizacao");


  const adicionarItem = (item: EstruturaItem) => {
    const jaExiste = itens.some((i) => i.idMaterial === item.idMaterial);

    if (jaExiste) {
      alert("Este material já foi adicionado à estrutura.");
      return;
    }

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

    const metodo = modo === "edicao" ? "PUT" : "POST";

    
    try {
      const response = await fetch("http://localhost:3001/estrutura", {
        method: metodo,
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
        setModo("visualizacao");
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
    setModo("visualizacao")
  };

  const buscarEstrutura = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/estrutura/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEstrutura({ id: data.id, nome: data.nome });
        setItens(data.itens);
      } else {
        setEstrutura({ id, nome: "" });
        setItens([]);
        alert("Estrutura não encontrada.");
      }
    } catch (error) {
      console.error("Erro ao buscar estrutura:", error);
      alert("Erro ao buscar estrutura.");
    }
  };

  const consultar = () => {
    if (estrutura.id > 0) {
      buscarEstrutura(estrutura.id);
    } else {
      alert("Informe um código de estrutura válido.");
    }
  };

  const excluir = async () => {
    if (estrutura.id <= 0) {
      alert("Informe um código de estrutura válido.");
      return;
    }

    const confirmar = window.confirm("Tem certeza que deseja excluir esta estrutura?");
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:3001/estrutura/${estrutura.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Estrutura excluída com sucesso!");
        setEstrutura({ id: 0, nome: "" });
        setItens([]);
        setModo("visualizacao");
      } else {
        const errorText = await response.text();
        alert("Erro ao excluir: " + errorText);
      }
    } catch (error) {
      console.error("Erro ao excluir estrutura:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };


  return (
    <MainContainer>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setModo("inclusao")}>Incluir</button>

        <button
          onClick={() => {
            setModo("edicao");
            setEstrutura({ id: 0, nome: "" });
            setItens([]);
          }}
        >
          Editar
        </button>


        <button onClick={() => setModo("exclusao")}>Excluir</button>
      </div>

      <EstruturaForm
        estrutura={estrutura}
        setEstrutura={setEstrutura}
        onConsultar={consultar}
        modo={modo}
      />
      <EstruturaItemForm adicionarItem={adicionarItem} />
      <EstruturaItemGrid
        itens={itens}
        modo={modo}
      />

      {modo === "exclusao" && (
        <div style={{ marginTop: "1rem" }}>
          <button onClick={excluir}>Excluir Estrutura</button>
        </div>
      )}

      {modo !== "exclusao" && (
        <Buttons onGravar={gravar} onCancelar={cancelar} />
      )}
    </MainContainer>
  );
}

export default App;
