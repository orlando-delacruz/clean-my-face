import styled from 'styled-components';

export const SkipLink = styled.a`
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
  z-index: 1000;
  padding: 0.625rem 1rem;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentContrast};
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  transform: translateY(-150%);

  &:focus-visible {
    transform: none;
  }
`;
