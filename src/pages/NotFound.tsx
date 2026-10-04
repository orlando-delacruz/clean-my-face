import styled from 'styled-components';
import { Link } from '../router';
import { Container, Section } from '../components/primitives';
import { ArrowRightIcon } from '../components/icons';

const Wrap = styled.div`
  max-width: 44ch;
`;

const Code = styled.p`
  font-size: 0.8125rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 1.5rem;
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.plumpDeep};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.125rem;
`;

export function NotFound() {
  return (
    <Section id="main-content">
      <Container>
        <Wrap>
          <Code>404</Code>
          <Title>This page is not here</Title>
          <Text>
            The address may be mistyped, or the page may have moved. The
            CleanMyFace homepage is one click away.
          </Text>
          <HomeLink to="/">
            Back to CleanMyFace
            <ArrowRightIcon size={15} />
          </HomeLink>
        </Wrap>
      </Container>
    </Section>
  );
}
