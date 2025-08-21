import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

// Types
type NavItem = {
  label: string;
  path: string;
  icon?: string;
};

type NavbarProps = {
  navItems: NavItem[];
  onLogout?: () => void;
  appName?: string;
};

// Styled components
const NavbarContainer = styled.nav`
  background-color: ${props => props.theme.colors.neutral.black};
  color: ${props => props.theme.colors.neutral.white};
  padding: ${props => `${props.theme.spacing.md} ${props.theme.spacing.xl}`};
  box-shadow: ${props => props.theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Logo = styled.div`
  font-size: ${props => props.theme.typography.sizes['2xl']};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  color: ${props => props.theme.colors.primary.main};
  display: flex;
  align-items: center;
  
  span {
    background: linear-gradient(45deg, ${props => props.theme.colors.primary.main} 30%, ${props => props.theme.colors.secondary.main} 90%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavMenu = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
`;

const NavLink = styled(Link)<{ active?: boolean }>`
  color: ${props => props.active ? props.theme.colors.secondary.main : props.theme.colors.neutral.gray300};
  text-decoration: none;
  font-weight: ${props => props.active ? props.theme.typography.fontWeights.semiBold : props.theme.typography.fontWeights.medium};
  padding: ${props => props.theme.spacing.sm} 0;
  position: relative;
  transition: color ${props => props.theme.transitions.fast};
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${props => props.theme.colors.secondary.main};
    transform: ${props => props.active ? 'scaleX(1)' : 'scaleX(0)'};
    transform-origin: bottom left;
    transition: transform ${props => props.theme.transitions.normal};
  }
  
  &:hover {
    color: ${props => props.theme.colors.secondary.main};
    
    &::after {
      transform: scaleX(1);
    }
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const LogoutButton = styled.button`
  background: transparent;
  color: ${props => props.theme.colors.neutral.gray300};
  border: 1px solid ${props => props.theme.colors.neutral.gray700};
  border-radius: ${props => props.theme.borders.radius.md};
  padding: ${props => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
  cursor: pointer;
  font-size: ${props => props.theme.typography.sizes.sm};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: ${props => props.theme.colors.neutral.white};
    border-color: ${props => props.theme.colors.neutral.gray600};
  }
`;

// Navbar component
const Navbar: React.FC<NavbarProps> = ({ 
  navItems, 
  onLogout, 
  appName = "TalentHub" 
}) => {
  const location = useLocation();
  
  return (
    <NavbarContainer>
      <Logo>
        <span>{appName}</span>
      </Logo>
      
      <NavMenu>
        {navItems.map(item => (
          <NavLink 
            key={item.path} 
            to={item.path}
            active={location.pathname.includes(item.path)}
          >
            {item.label}
          </NavLink>
        ))}
      </NavMenu>
      
      {onLogout && (
        <UserActions>
          <LogoutButton onClick={onLogout}>
            Sign Out
          </LogoutButton>
        </UserActions>
      )}
    </NavbarContainer>
  );
};

export default Navbar;