import { useState } from 'react';
import styled from 'styled-components';
import { home } from '../data/home';
import { Container, Reveal, Section, SectionHeader } from '../components/ui';
import { ArrowRightIcon } from '../components/icons';

const List = styled.div`
  margin-top: 2.5rem;
  display: grid;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 3rem;
  }
`;

const Item = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const QuestionRow = styled.span`
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  min-width: 0;
`;

const IndexNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.muted};
  letter-spacing: 0.08em;
  flex: none;
  transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1);
`;

const QuestionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  width: 100%;
  min-height: 4rem;
  padding: 1.25rem 0;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focus};
    outline-offset: 4px;
  }

  &:hover ${IndexNumber} {
    color: ${({ theme }) => theme.colors.gold};
  }
`;

const Chevron = styled.span<{ $open: boolean }>`
  display: inline-flex;
  flex: none;
  color: ${({ theme }) => theme.colors.plumpDeep};
  transform: rotate(${({ $open }) => ($open ? -90 : 90)}deg);
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Answer = styled.div`
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition:
    grid-template-rows 320ms cubic-bezier(0.22, 1, 0.36, 1),
    visibility 0s linear 320ms;

  &[data-open='true'] {
    grid-template-rows: 1fr;
    visibility: visible;
    transition:
      grid-template-rows 320ms cubic-bezier(0.22, 1, 0.36, 1),
      visibility 0s;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const AnswerInner = styled.div`
  overflow: hidden;
  min-height: 0;
`;

const AnswerText = styled.p`
  padding-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 62ch;
`;

/**
 * Faq: accessible accordion answering routine questions.
 * Every answer is grounded in existing project copy and data.
 */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" aria-labelledby="faq-title">
      <Container>
        <Reveal>
          <SectionHeader heading={home.faq.heading} id="faq-title" />
        </Reveal>
        <Reveal>
          <List>
            {home.faq.items.map((item, index) => {
              const open = openIndex === index;
              const buttonId = `faq-button-${index}`;
              const panelId = `faq-panel-${index}`;
              return (
                <Item key={item.question}>
                  <h3>
                    <QuestionButton
                      type="button"
                      id={buttonId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                    >
                      <QuestionRow>
                        <IndexNumber aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </IndexNumber>
                        <span>{item.question}</span>
                      </QuestionRow>
                      <Chevron $open={open} aria-hidden="true">
                        <ArrowRightIcon size={18} />
                      </Chevron>
                    </QuestionButton>
                  </h3>
                  <Answer
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    data-open={open}
                  >
                    <AnswerInner>
                      <AnswerText>{item.answer}</AnswerText>
                    </AnswerInner>
                  </Answer>
                </Item>
              );
            })}
          </List>
        </Reveal>
      </Container>
    </Section>
  );
}
