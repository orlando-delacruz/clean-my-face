import styled from 'styled-components';
import { skinNeeds } from '../data/content';
import { img } from '../data/images';
import { Link } from '../router';
import { ArrowRightIcon, LayersIcon } from '../components/icons';
import {
  Container,
  EyebrowRow,
  Lead,
  Reveal,
  Section,
  SectionRule,
  SectionTitle,
  TextAction,
} from '../components/primitives';

const Header = styled.div`
  max-width: 44rem;
  margin-inline: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenteredLead = styled(Lead)`
  max-width: 58ch;
`;

const Cards = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 3.5rem;
  }
`;

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 220ms ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.gold};
    box-shadow: 0 28px 56px -28px rgba(33, 26, 19, 0.32);
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;

const Media = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.75rem;
  }
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: contain;
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);

  ${Card}:hover & {
    transform: scale(1.015);
  }
`;

const CardBody = styled.div`
  padding: 1.75rem 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  flex: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2.25rem 2.25rem 2.5rem;
  }
`;

const SkinType = styled.p<{ $range: 'plump' | 'clear' }>`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme, $range }) =>
    $range === 'plump' ? theme.colors.plumpDeep : theme.colors.clearDeep};

  &::before {
    content: '';
    width: 1.5rem;
    height: 1px;
    background: currentColor;
    flex: none;
  }
`;

const CardTitle = styled.h3`
  font-size: clamp(1.75rem, 2.5vw, 2.25rem);
  letter-spacing: -0.01em;
  text-wrap: balance;
`;

const Promise = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Divider = styled.span`
  display: block;
  width: 2.5rem;
  height: 1px;
  background: ${({ theme }) => theme.colors.gold};
  margin-block: 0.5rem 0.25rem;
`;

const CardText = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
  line-height: 1.7;
  flex: 1;
`;

const CardAction = styled.div`
  margin-top: 1rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export function SkinNeeds() {
  return (
    <Section id="ranges" aria-labelledby="ranges-title">
      <Container>
        <Reveal>
          <Header>
            <EyebrowRow>
              <LayersIcon size={14} aria-hidden="true" />
              {skinNeeds.eyebrow}
            </EyebrowRow>
            <SectionTitle id="ranges-title">{skinNeeds.title}</SectionTitle>
            <SectionRule aria-hidden="true" />
            <CenteredLead>{skinNeeds.lead}</CenteredLead>
          </Header>
          <Cards>
            {skinNeeds.cards.map((card) => (
              <Card key={card.rangeId}>
                <Media>
                  <CardImage
                    src={img(card.image)}
                    alt={card.imageAlt}
                    loading="lazy"
                    decoding="async"
                  />
                </Media>
                <CardBody>
                  <SkinType $range={card.rangeId}>{card.skinType}</SkinType>
                  <CardTitle>{card.title}</CardTitle>
                  <Promise>{card.promise}</Promise>
                  <Divider aria-hidden="true" />
                  <CardText>{card.text}</CardText>
                  <CardAction>
                    <TextAction as={Link} to={`/#range-${card.rangeId}`}>
                      Explore {card.title}
                      <ArrowRightIcon size={15} />
                    </TextAction>
                  </CardAction>
                </CardBody>
              </Card>
            ))}
          </Cards>
        </Reveal>
      </Container>
    </Section>
  );
}
