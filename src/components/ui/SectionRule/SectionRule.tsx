import styled from 'styled-components';

export const SectionRule = styled.span`
  display: block;
  width: 3.5rem;
  height: 2px;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.gold};
  margin-block: 1.5rem;
`;
