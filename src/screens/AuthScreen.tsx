import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, CardBody, Input, Button } from '../components/ui';

// Types
interface AuthScreenProps {
  onLogin: (email: string, password: string) => boolean;
}

// Styled Components
const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary.dark} 0%,
    ${props => props.theme.colors.primary.main} 100%
  );
`;

const AuthCard = styled(Card)`
  width: 100%;
  max-width: 480px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.primary.main},
      ${props => props.theme.colors.secondary.main}
    );
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  h1 {
    font-size: ${props => props.theme.typography.sizes['3xl']};
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    background: linear-gradient(
      45deg,
      ${props => props.theme.colors.primary.main},
      ${props => props.theme.colors.secondary.main}
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }
  
  p {
    color: ${props => props.theme.colors.neutral.gray600};
    font-size: ${props => props.theme.typography.sizes.lg};
    margin-top: ${props => props.theme.spacing.xs};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const FormActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: ${props => props.theme.spacing.md} 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${props => props.theme.colors.neutral.gray200};
  }
  
  span {
    padding: 0 ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.neutral.gray500};
    font-size: ${props => props.theme.typography.sizes.sm};
  }
`;

const SocialButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.neutral.gray600};
  font-size: ${props => props.theme.typography.sizes.sm};
  
  a {
    color: ${props => props.theme.colors.primary.main};
    text-decoration: none;
    font-weight: ${props => props.theme.typography.fontWeights.medium};
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

// Auth Screen Component
const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = onLogin(email, password);
      if (!success) {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <CardBody>
          <Logo>
            <h1>TalentHub</h1>
            <p>Sign in to your account</p>
          </Logo>

          <Form onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              fullWidth
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
              errorText={error}
              fullWidth
              placeholder="Enter your password"
              required
            />

            <FormActions>
              <Button 
                variant="primary" 
                type="submit" 
                fullWidth
                isLoading={isLoading}
              >
                Sign In
              </Button>
              
              <OrDivider>
                <span>Or continue with</span>
              </OrDivider>
              
              <SocialButton 
                variant="outline" 
                fullWidth
                onClick={() => console.log('Google sign in')}
              >
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.229,1.205-0.999,2.251-2.08,2.914 c-0.632,0.389-1.364,0.601-2.109,0.601c-2.269,0-4.109-1.84-4.109-4.109s1.84-4.109,4.109-4.109c1.107,0,2.137,0.402,2.896,1.088 l1.843-1.842C16.599,6.652,14.855,6,13,6c-3.866,0-7,3.134-7,7s3.134,7,7,7c1.959,0,3.732-0.803,5.009-2.096 c1.401-1.421,2.241-3.398,2.241-5.573v-0.９18h-6.795C12.545,11.412,12.545,12.151,12.545,12.151z"/>
                </svg>
                Sign in with Google
              </SocialButton>
            </FormActions>
          </Form>

          <Footer>
            Don't have an account? <a href="#">Sign up</a>
          </Footer>
        </CardBody>
      </AuthCard>
    </AuthContainer>
  );
};

export default AuthScreen;