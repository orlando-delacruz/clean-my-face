import styled from 'styled-components';

export const EyebrowRow = styled.p<{
  $color?: string;
  $iconColor?: string;
  $onDark?: boolean;
  $tight?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme, $color, $onDark }) =>
    $color ?? ($onDark ? theme.colors.gold : theme.colors.muted)};
  margin: ${({ theme, $tight }) => ($tight ? '0' : `0 0 ${theme.spacing.sm}`)};

  svg {
    flex: none;
    color: ${({ theme, $iconColor, $onDark }) =>
      $iconColor ?? ($onDark ? theme.colors.gold : theme.colors.plumpDeep)};
  }
`;
