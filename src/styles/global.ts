import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html{ 
    // Matemáticamente falando, isso transforma 1rem em 10px
    font-size:62.5% !important; 
    scroll-behavior: smooth;
}
    body, input, textarea, button{
        font-family: 'Montserrat', sans-serif;
        font-weight:  400;
        font-size: 1.2rem;
    }

    a {
        text-decoration: none;
    }
`