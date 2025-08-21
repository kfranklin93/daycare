import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import Button from '../components/Button';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const WelcomeSection = styled.section`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 1.5rem;
`;

const Dashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #4a90e2;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const CardTitle = styled.h3`
  color: #4a90e2;
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const CardContent = styled.div`
  margin-bottom: 1rem;
`;

function Home() {
  return (
    <HomeContainer>
      <WelcomeSection>
        <Title>Welcome to Daycare Management System</Title>
        <Subtitle>
          A comprehensive solution for managing your daycare operations, children, staff, and more.
        </Subtitle>
        <Button 
          title="Get Started" 
          onClick={() => console.log('Get started clicked')} 
          variant="primary"
          size="lg"
        />
      </WelcomeSection>

      <StatsGrid>
        <StatCard>
          <StatValue>45</StatValue>
          <StatLabel>Total Children</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>12</StatValue>
          <StatLabel>Staff Members</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>8</StatValue>
          <StatLabel>Classrooms</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>98%</StatValue>
          <StatLabel>Attendance Rate</StatLabel>
        </StatCard>
      </StatsGrid>
      
      <Dashboard>
        <Card>
          <CardTitle>Children Present</CardTitle>
          <CardContent>
            <p>Total children today: 15</p>
            <p>Expected later: 3</p>
          </CardContent>
          <Button 
            title="View Details" 
            onClick={() => console.log('View details clicked')} 
            variant="outline"
            size="sm"
          />
        </Card>
        
        <Card>
          <CardTitle>Staff on Duty</CardTitle>
          <CardContent>
            <p>Current staff: 4</p>
            <p>Next shift: 2</p>
          </CardContent>
          <Button 
            title="View Schedule" 
            onClick={() => console.log('View schedule clicked')} 
            variant="outline"
            size="sm"
          />
        </Card>
        
        <Card>
          <CardTitle>Today's Activities</CardTitle>
          <CardContent>
            <p>Morning: Arts & Crafts</p>
            <p>Afternoon: Outdoor Play</p>
          </CardContent>
          <Button 
            title="Plan Activities" 
            onClick={() => console.log('Plan activities clicked')} 
            variant="outline"
            size="sm"
          />
        </Card>
        
        <Card>
          <CardTitle>Announcements</CardTitle>
          <CardContent>
            <p>Parent-Teacher meeting next week</p>
            <p>Summer program registration open</p>
          </CardContent>
          <Button 
            title="Create Announcement" 
            onClick={() => console.log('Create announcement clicked')} 
            variant="outline"
            size="sm"
          />
        </Card>
      </Dashboard>
    </HomeContainer>
  );
}

export default Home;