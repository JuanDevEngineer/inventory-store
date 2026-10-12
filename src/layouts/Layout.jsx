import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { Sidebar } from '../components/organisms/sidebar/Sidebar';
import { MobileMenu } from '../components/organisms/MobileMenu';
import { SpinnerLoader } from '../components/molecules/SpinnerLoader';
import { Device } from '../styles/breakpoints';

import { usePermissionsStore } from '../store/PermissionsStore';
import { useCompanyStore } from '../store/CompanyStore';
import { useUsersStore } from '../store/UsersStore';

export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { fetchUser, userData } = useUsersStore();
  const { fetchCompany } = useCompanyStore();
  const { fetchPermissions } = usePermissionsStore();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['fetch user'],
    queryFn: () => fetchUser(),
  });

  useQuery({
    queryKey: ['fetch company', { userId: userData?.id }],
    queryFn: () => fetchCompany({ userId: userData?.id }),
    enabled: !!user,
  });

  useQuery({
    queryKey: ['fetch permissions', { user_id: userData?.id }],
    queryFn: () => fetchPermissions({ user_id: userData?.id }),
    enabled: !!user,
  });

  if (isLoading == true) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <h1>Error..</h1>;
  }

  return (
    <Container className={sidebarOpen ? 'active' : ''}>
      <div className="ContentSidebar">
        <Sidebar state={sidebarOpen} setState={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className="ContentMobileMenu">
        <MobileMenu />
      </div>

      <ContainerBody>{children}</ContainerBody>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.2s ease-in-out;

  .ContentSidebar {
    display: none;
  }
  .ContentMobileMenu {
    display: block;
    position: absolute;
    left: 20px;
  }
  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .ContentSidebar {
      display: initial;
    }
    .ContentMobileMenu {
      display: none;
    }
  }
`;
const ContainerBody = styled.div`
  grid-column: 1;
  width: 100%;
  @media ${Device.tablet} {
    grid-column: 2;
  }
`;
