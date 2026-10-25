import styled from 'styled-components';

export const SectionTitle = styled.h2`
  font-size: clamp(1.9rem, 4.5vw, 3rem);
  max-width: 22ch;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;
