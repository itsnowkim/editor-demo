import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html,
body {
  margin: 0;
  background-color:'#FAFAFA';
  /* Center Container */
  display: flex;
  align-items: center;
  justify-content: center;
}
a{
  text-decoration-line : none;
  color: black;
}
input,
button,
ul,
p {
  all: unset;
}
.EditablePage{
  width: 350px;
  height: 600px;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
  background: white;
}
`;

export default GlobalStyle;
