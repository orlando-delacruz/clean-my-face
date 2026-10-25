import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 72rem;
  margin-inline: auto;
  padding-inline: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-inline: 2rem;
  }
`;
