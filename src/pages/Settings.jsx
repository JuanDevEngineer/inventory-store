import styled from 'styled-components';
import { SettingsTemplate } from '../index';

export function Settings() {
  return (
    <Container>
      <SettingsTemplate />
    </Container>
  );
}
const Container = styled.main`
  height: 100vh;
`;
