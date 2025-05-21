import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Global } from '@emotion/react';

const globalStyles = {
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  body: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#f5f5f5',
  },
};

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <MainLayout>
        <Home />
      </MainLayout>
    </>
  );
}

export default App;
