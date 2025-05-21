import { ReactNode } from 'react';
import styled from '@emotion/styled';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
`;

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <LayoutContainer>
      <Header>
        <h1>Your Name</h1>
      </Header>
      <Main>{children}</Main>
    </LayoutContainer>
  );
}; 