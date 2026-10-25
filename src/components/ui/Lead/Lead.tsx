import styled from 'styled-components';

export const Lead = styled.p`
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 62ch;
`;
