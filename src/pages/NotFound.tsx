import styled from 'styled-components';
import { Link } from '../router';
import { labels } from '../data/rangePages';
import { Container, Section } from '../components/ui';
import { ArrowRightIcon } from '../components/icons';

const Wrap = styled(Section)`
  background: ${({ theme }) => theme.colors.background};
`;

const Inner = styled.div`
  max-width: 44ch;
`;

const Numeral = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(4rem, 12vw, 7rem);
  line-height: 1;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: 1rem;
`;

const Code = styled.p`
  font-size: 0.8125rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 1.5rem;
`;

const LinkList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
`;

const PageLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  font-weight: 600;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.plumpDeep};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.125rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focus};
  }
`;

export function NotFound() {
  return (
    <Wrap id="main-content" tabIndex={-1}>
      <Container>
        <Inner>
          <Numeral aria-hidden="true">404</Numeral>
          <Code>404</Code>
          <Title>This page is not here</Title>
          <Text>
            The address may be mistyped, or the page may have moved. The
            CleanMyFace homepage is one click away.
          </Text>
          <LinkList>
            <PageLink to="/">
              Back to CleanMyFace
              <ArrowRightIcon size={15} />
            </PageLink>
            <PageLink to="/ranges/plump-it-up">
              {labels.explorePlump}
              <ArrowRightIcon size={15} />
            </PageLink>
            <PageLink to="/ranges/stay-clear">
              {labels.exploreClear}
              <ArrowRightIcon size={15} />
            </PageLink>
          </LinkList>
        </Inner>
      </Container>
    </Wrap>
  );
}
