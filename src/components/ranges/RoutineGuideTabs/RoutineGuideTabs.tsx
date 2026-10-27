import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { routineGuide } from '../../../data/content';
import type { RangeRoutine } from '../../../data/content';
import { Container, Reveal, Section, SectionHeader } from '../../ui';
import { labels } from '../../../data/rangePages';

const TabsWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;

const TabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

const Tab = styled.button<{ $active: boolean }>`
  appearance: none;
  min-height: 2.75rem;
  padding: 0.625rem 1.25rem;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.range.deep : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme, $active }) =>
    $active ? theme.range.deep : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.textInverse : theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 180ms ease, color 180ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.range.deep};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.range.deep};
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
  padding: 1.75rem 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2.5rem 2.5rem 2.75rem;
  }
`;

const PanelInner = styled.div`
  animation: ${fadeUp} 320ms cubic-bezier(0.22, 1, 0.36, 1);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const GroupTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  letter-spacing: -0.01em;
  text-wrap: balance;
`;

const GroupText = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 0.5rem;
  margin-bottom: 1.25rem;
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
    background: ${({ theme }) => theme.range.deep};
  }
`;

const Message = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  line-height: 1.5;
  text-wrap: balance;
  text-align: center;
  max-width: 40ch;
  margin-inline: auto;
  margin-top: 2.5rem;
`;

/**
 * RoutineGuideTabs: the range's routine groups as tabs. Tab behavior moved
 * from the old RoutineGuide section: tablist/tab/tabpanel roles,
 * aria-selected, aria-controls, and Left/Right/Home/End keys with focus
 * following selection. The page chooses the range; tabs switch its groups.
 */
export function RoutineGuideTabs({ routine }: { routine: RangeRoutine }) {
  const groups = routine.groups;
  const [activeTitle, setActiveTitle] = useState(groups[0]?.title ?? '');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = Math.max(
    0,
    groups.findIndex((group) => group.title === activeTitle),
  );
  const active = groups[activeIndex] ?? groups[0];

  function focusTab(index: number) {
    const total = groups.length;
    const next = (index + total) % total;
    const group = groups[next];
    if (group) {
      setActiveTitle(group.title);
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
      focusTab(groups.length - 1);
    }
  }

  if (!active) return null;

  return (
    <Section aria-labelledby="routine-title">
      <Container>
        <Reveal>
          <SectionHeader heading={labels.yourRoutine} id="routine-title" />
          <TabsWrap>
            <TabList role="tablist" aria-label={`${routine.rangeName} routine`}>
              {groups.map((group, index) => {
                const selected = group.title === active.title;
                return (
                  <Tab
                    key={group.title}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    role="tab"
                    id={`routine-tab-${index}`}
                    aria-selected={selected}
                    aria-controls={`routine-panel-${index}`}
                    tabIndex={selected ? 0 : -1}
                    $active={selected}
                    onClick={() => setActiveTitle(group.title)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                  >
                    {group.title}
                  </Tab>
                );
              })}
            </TabList>
          </TabsWrap>
          <Panel>
            <PanelInner
              key={active.title}
              role="tabpanel"
              id={`routine-panel-${activeIndex}`}
              aria-labelledby={`routine-tab-${activeIndex}`}
            >
              <GroupTitle>{active.title}</GroupTitle>
              <GroupText>{active.text}</GroupText>
              <ItemList>
                {active.items.map((item) => (
                  <Item key={item}>{item}</Item>
                ))}
              </ItemList>
            </PanelInner>
          </Panel>
          <Message>{routineGuide.message}</Message>
        </Reveal>
      </Container>
    </Section>
  );
}
