import { GridContainer, MainContainer, TopContainer } from "./styles/generic"

function App() {
  return (
    <MainContainer>
      <TopContainer>
        <h2>Cadastro de Estrutura de Produto</h2>
        <form action="">
          <label htmlFor="idEstrutura">Cod. Estrutura</label>
          <input type="number" 
            name="idEstrutura" 
            min={1}
          />
          <label htmlFor="nomeEstrura">Estrutura</label>
          <input type="text" name="nomeEstrutura" />
        </form>
      </TopContainer>
      <GridContainer>
          <form action="">
              <label htmlFor="idMaterial">Cód. Material</label>
              <input type="number" 
                name="idMaterial"
                min={1}
              />
              <label htmlFor="material">Material</label>
              <input type="text" name="material"/>
          </form>
      </GridContainer>
    </MainContainer>
  )
}

export default App
