import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.header`
  background-color: #4a90e2;
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)<{ active?: boolean }>`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-weight: ${props => props.active ? '600' : '400'};
  background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <NavbarContainer>
      <NavContent>
        <Logo>Daycare Management System</Logo>
        <NavLinks>
          <NavLink to="/" active={isActive('/')}>Dashboard</NavLink>
          <NavLink to="/children" active={isActive('/children')}>Children</NavLink>
          <NavLink to="/staff" active={isActive('/staff')}>Staff</NavLink>
          <NavLink to="/schedule" active={isActive('/schedule')}>Schedule</NavLink>
          <NavLink to="/reports" active={isActive('/reports')}>Reports</NavLink>
          <NavLink to="/ats-demo" active={isActive('/ats-demo')}>ATS Demo</NavLink>
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
}