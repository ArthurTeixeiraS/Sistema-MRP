import styled from "styled-components";

export const MainContainer = styled.div`
  padding: 1rem;
  font-family: sans-serif;

  form {
    margin-bottom: 1rem;
  }

  label {
    margin-right: 0.5rem;
  }

  input[type="text"],
  input[type="number"] {
    margin-right: 0.8rem;
    width: 15rem;
  }

  button {
    padding: 0.3rem 1rem;
    cursor: pointer;
  }

  table {
    margin-top: 1rem;
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    text-align: left;
  }
`;
