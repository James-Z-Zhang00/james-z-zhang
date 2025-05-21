import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

export const Home = () => {
  return (
    <PageContainer>
      <Header>
        <h1>Your Name</h1>
      </Header>
      <MainContent>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to My Portfolio
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          I'm a developer passionate about creating amazing web experiences
        </Subtitle>
      </MainContent>
    </PageContainer>
  );
}; 