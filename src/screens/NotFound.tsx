import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  color: #4a90e2;
  margin: 0;
  line-height: 1;
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin: 1rem 0;
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 500px;
  margin-bottom: 2rem;
`;

function NotFound() {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>Page Not Found</ErrorTitle>
      <ErrorMessage>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </ErrorMessage>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button
          title="Return to Home"
          onClick={() => {}}
          variant="primary"
          size="md"
        />
      </Link>
    </NotFoundContainer>
  );
}

export default NotFound;