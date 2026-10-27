import styled from 'styled-components';
import type { LegalDocument } from '../data/legal';
import { Link } from '../router';
import { Container, Section } from '../components/ui';
import { ArrowRightIcon } from '../components/icons';

const Narrow = styled(Container)`
  max-width: ${({ theme }) => theme.layout.container.narrow};
`;

const Layout = styled.div`
  display: grid;
  gap: 2.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(0, 1fr) 12rem;
    gap: 4rem;
    align-items: start;
  }
`;

const Article = styled.article`
  max-width: 68ch;
  min-width: 0;
`;

const Updated = styled.p`
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.display};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacings.heading};
  margin-bottom: 1rem;
  text-wrap: balance;
`;

const Summary = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 60ch;
`;

const Notice = styled.p`
  margin-top: 2rem;
  padding: 1.25rem 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const Block = styled.section`
  margin-top: 3rem;
  scroll-margin-top: 6rem;
`;

const SectionNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const SectionHeading = styled.h2`
  font-size: 1.375rem;
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

const Text = styled.p`
  & + & {
    margin-top: 0.875rem;
  }
`;

const List = styled.ul`
  margin: 0.875rem 0 0;
  padding-left: 1.25rem;
  display: grid;
  gap: 0.5rem;

  li {
    padding-left: 0.25rem;
  }
`;

const Contact = styled.p`
  margin-top: 2.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  margin-top: 2rem;
  font-weight: 600;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.plumpDeep};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.125rem;

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focus};
  }
`;

const SideNav = styled.nav`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    position: sticky;
    top: 5.5rem;
  }
`;

const SideTitle = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 0.75rem;
`;

const SideList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.125rem;
`;

const SideLink = styled(Link)`
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  min-height: 2.25rem;
  padding-block: 0.375rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focus};
  }
`;

export function LegalPage({ doc }: { doc: LegalDocument }) {
  const showIndex = doc.sections.length >= 4;

  return (
    <Section id="main-content" tabIndex={-1} aria-labelledby="legal-title">
      <Narrow>
        <Layout>
          <Article>
            <Updated>{doc.updated}</Updated>
            <Title id="legal-title">{doc.title}</Title>
            <Summary>{doc.summary}</Summary>
            <Notice>{doc.draftNotice}</Notice>
            {doc.sections.map((section, index) => (
              <Block key={section.heading} id={`legal-section-${index}`}>
                <SectionNumber aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </SectionNumber>
                <SectionHeading>{section.heading}</SectionHeading>
                {section.paragraphs.map((paragraph) => (
                  <Text key={paragraph}>{paragraph}</Text>
                ))}
                {section.list !== undefined && (
                  <List>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </List>
                )}
              </Block>
            ))}
            <Contact>{doc.contact}</Contact>
            <Back to="/">
              <ArrowRightIcon size={15} style={{ transform: 'rotate(180deg)' }} />
              Back to CleanMyFace
            </Back>
          </Article>
          {showIndex && (
            <SideNav aria-label="On this page">
              <SideTitle>On this page</SideTitle>
              <SideList>
                {doc.sections.map((section, index) => (
                  <li key={section.heading}>
                    <SideLink to={`#legal-section-${index}`}>
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {section.heading}
                    </SideLink>
                  </li>
                ))}
              </SideList>
            </SideNav>
          )}
        </Layout>
      </Narrow>
    </Section>
  );
}
