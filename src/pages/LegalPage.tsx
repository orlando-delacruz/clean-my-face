import styled from 'styled-components';
import type { LegalDocument } from '../data/legal';
import { Link } from '../router';
import { Container, Section } from '../components/primitives';
import { ArrowRightIcon } from '../components/icons';

const Article = styled.article`
  max-width: 68ch;
`;

const Updated = styled.p`
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.25rem);
  margin-bottom: 1rem;
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

const SectionHeading = styled.h2`
  font-size: 1.375rem;
  margin-bottom: 0.75rem;
`;

const Block = styled.section`
  margin-top: 2.75rem;
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
  margin-top: 2rem;
  font-weight: 600;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.plumpDeep};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.125rem;
`;

export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <Section id="main-content" aria-labelledby="legal-title">
      <Container>
        <Article>
          <Updated>{doc.updated}</Updated>
          <Title id="legal-title">{doc.title}</Title>
          <Summary>{doc.summary}</Summary>
          <Notice>{doc.draftNotice}</Notice>
          {doc.sections.map((section) => (
            <Block key={section.heading}>
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
      </Container>
    </Section>
  );
}
