import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { routineGuide } from '../data/content';
import { img } from '../data/images';
import { ListIcon } from '../components/icons';
import {
  Container,
  EyebrowRow,
  Lead,
  Reveal,
  Section,
  SectionRule,
  SectionTitle,
} from '../components/primitives';

type RangeId = 'plump' | 'clear';

const Header = styled.div`
  max-width: 52rem;
  margin-inline: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenteredTitle = styled(SectionTitle)`
  margin-inline: auto;
  text-wrap: balance;
`;

const CenteredLead = styled(Lead)`
  margin-inline: auto;
  text-align: center;
  max-width: 58ch;
`;



const TabsWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;

const TabList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
  width: 100%;
  max-width: 34rem;
  padding: 0.25rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
`;

const Tab = styled.button<{ $active: boolean }>`
  appearance: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.125rem;
  min-height: 3.5rem;
  padding: 0.625rem 1rem;
  border: 1px solid transparent;
  border-radius: 999px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.text : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.background : theme.colors.muted};
  font-family: ${({ theme }) => theme.fonts.body};
  cursor: pointer;
  transition: background-color 180ms ease, color 180ms ease;

  &:hover {
    color: ${({ theme, $active }) =>
      $active ? theme.colors.background : theme.colors.text};
  }
`;

const TabLabel = styled.span`
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.3;
`;

const TabSub = styled.span`
  display: none;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1.4;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const Panel = styled.div`
  margin-top: 1.75rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 28px 56px -28px rgba(33, 26, 19, 0.22);
  padding: 1.75rem 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2.75rem 2.75rem 3rem;
  }
`;

const PanelInner = styled.div`
  animation: ${fadeUp} 320ms cubic-bezier(0.22, 1, 0.36, 1);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const RangeSkin = styled.p<{ $range: RangeId }>`
  display: none;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme, $range }) =>
    $range === 'plump' ? theme.colors.plumpDeep : theme.colors.clearDeep};
  margin-bottom: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const RangeName = styled.h3`
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  letter-spacing: -0.01em;
  text-wrap: balance;
`;

const PanelRule = styled.span`
  display: block;
  width: 3rem;
  height: 2px;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.gold};
  margin-top: 1.125rem;
`;

const Groups = styled.div<{ $count: number }>`
  display: grid;
  gap: 2.25rem;
  margin-top: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: ${({ $count }) =>
      $count > 2 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'};
  }
`;

const Group = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 1.25rem;
`;

const GroupHead = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 0.375rem;
`;

const Tick = styled.span`
  width: 8px;
  height: 8px;
  flex: none;
  background: ${({ theme }) => theme.colors.gold};
  transform: rotate(45deg);
`;

const GroupTitle = styled.h4`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.0625rem;
  font-weight: 600;
  letter-spacing: 0.005em;
`;

const GroupText = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 0.875rem;
`;

const ItemList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.625rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

const Item = styled.li`
  position: relative;
  padding-left: 1.25rem;

  &::before {
    content: '';
    position: absolute;
    left: 2px;
    top: 0.62em;
    width: 6px;
    height: 6px;
    transform: rotate(45deg);
    background: ${({ theme }) => theme.colors.gold};
  }
`;

const Closing = styled.div`
  margin-top: 2.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 2rem;
  display: grid;
  gap: 1.5rem;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 240px 1fr;
    gap: 2.25rem;
  }
`;

const Figure = styled.figure`
  margin: 0;
  width: 100%;
  max-width: 17.5rem;
  justify-self: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-self: start;
    max-width: 15rem;
  }
`;

const GuideImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 18px 36px -20px rgba(33, 26, 19, 0.35);
`;

const MessageWrap = styled.div`
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: left;
  }
`;

const MessageRule = styled.span`
  display: block;
  width: 2.5rem;
  height: 2px;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.gold};
  margin-bottom: 1rem;
  margin-inline: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-inline: 0;
  }
`;

const Message = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  line-height: 1.5;
  text-wrap: balance;
  max-width: 34ch;
  margin-inline: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-inline: 0;
  }
`;

export function RoutineGuide() {
  const routines = routineGuide.routines;
  const [activeId, setActiveId] = useState<RangeId>(routines[0]?.rangeId ?? 'plump');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = Math.max(
    0,
    routines.findIndex((routine) => routine.rangeId === activeId),
  );
  const active = routines[activeIndex] ?? routines[0];
  const imageSrc = img(routineGuide.image);

  function focusTab(index: number) {
    const total = routines.length;
    const next = (index + total) % total;
    const routine = routines[next];
    if (routine) {
      setActiveId(routine.rangeId);
      tabRefs.current[next]?.focus();
    }
  }

  function onTabKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusTab(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusTab(index - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusTab(routines.length - 1);
    }
  }

  if (!active) return null;

  return (
    <Section id="routine" aria-labelledby="routine-title">
      <Container>
        <Reveal>
          <Header>
            <EyebrowRow>
              <ListIcon size={14} aria-hidden="true" />
              {routineGuide.eyebrow}
            </EyebrowRow>
            <CenteredTitle id="routine-title">
              {routineGuide.title}
            </CenteredTitle>
            <SectionRule aria-hidden="true" />
            <CenteredLead>{routineGuide.lead}</CenteredLead>
          </Header>
          <TabsWrap>
            <TabList role="tablist" aria-label="Routine by range">
              {routines.map((routine, index) => {
                const selected = routine.rangeId === active.rangeId;
                return (
                  <Tab
                    key={routine.rangeId}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    role="tab"
                    id={`routine-tab-${routine.rangeId}`}
                    aria-selected={selected}
                    aria-controls={`routine-panel-${routine.rangeId}`}
                    tabIndex={selected ? 0 : -1}
                    $active={selected}
                    onClick={() => setActiveId(routine.rangeId)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                  >
                    <TabLabel>{routine.rangeName}</TabLabel>
                    <TabSub>{routine.skinType}</TabSub>
                  </Tab>
                );
              })}
            </TabList>
          </TabsWrap>
          <Panel>
            <PanelInner
              key={active.rangeId}
              role="tabpanel"
              id={`routine-panel-${active.rangeId}`}
              aria-labelledby={`routine-tab-${active.rangeId}`}
            >
              <RangeSkin $range={active.rangeId}>
                {active.skinType}
              </RangeSkin>
              <RangeName>{active.rangeName}</RangeName>
              <PanelRule aria-hidden="true" />
              <Groups $count={active.groups.length}>
                {active.groups.map((group) => (
                  <Group key={group.title}>
                    <GroupHead>
                      <Tick aria-hidden="true" />
                      <GroupTitle>{group.title}</GroupTitle>
                    </GroupHead>
                    <GroupText>{group.text}</GroupText>
                    <ItemList>
                      {group.items.map((item) => (
                        <Item key={item}>{item}</Item>
                      ))}
                    </ItemList>
                  </Group>
                ))}
              </Groups>
            </PanelInner>
          </Panel>
          <Closing>
            {imageSrc !== '' && (
              <Figure>
                <GuideImage
                  src={imageSrc}
                  alt={routineGuide.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </Figure>
            )}
            <MessageWrap>
              <MessageRule aria-hidden="true" />
              <Message>{routineGuide.message}</Message>
            </MessageWrap>
          </Closing>
        </Reveal>
      </Container>
    </Section>
  );
}
