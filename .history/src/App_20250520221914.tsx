import { Home } from './pages/Home';
import { Global, css } from '@emotion/react';

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #f5f5f5;
  }
`;

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Home />
    </>
  );
}

export default App;
