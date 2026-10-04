import styled from 'styled-components';
import { theme } from '../theme';
import { img } from '../data/images';
import type { ProductContent } from '../data/content';
import { Link } from '../router';
import { ArrowRightIcon } from './icons';

const CardLink = styled(Link)<{ $tone: 'light' | 'dark' }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ $tone, theme }) =>
    $tone === 'dark' ? 'rgba(255, 253, 248, 0.03)' : theme.colors.surface};
  border: 1px solid
    ${({ $tone, theme }) =>
      $tone === 'dark' ? 'rgba(201, 169, 106, 0.32)' : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition:
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ $tone, theme }) =>
      $tone === 'dark' ? 'rgba(201, 169, 106, 0.68)' : theme.colors.text};
    background: ${({ $tone, theme }) =>
      $tone === 'dark' ? 'rgba(255, 253, 248, 0.05)' : theme.colors.surface};
    box-shadow: ${({ $tone }) =>
      $tone === 'dark'
        ? '0 28px 56px -24px rgba(0, 0, 0, 0.6)'
        : '0 26px 54px -26px rgba(33, 26, 19, 0.35)'};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }
`;

const ImageWrap = styled.div<{ $tone: 'light' | 'dark' }>`
  position: relative;
  padding: 2rem 2rem 1.5rem;
  text-align: center;
  background: ${({ $tone, theme }) =>
    $tone === 'dark' ? theme.colors.surface : theme.colors.background};
  border-bottom: 1px solid
    ${({ $tone, theme }) =>
      $tone === 'dark' ? 'rgba(201, 169, 106, 0.28)' : theme.colors.border};
`;

const GhostStep = styled.span`
  position: absolute;
  top: 0.65rem;
  right: 1rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 2.5rem;
  line-height: 1;
  color: rgba(33, 26, 19, 0.12);
  pointer-events: none;
  user-select: none;
`;

const ProductImage = styled.img`
  height: 11rem;
  width: auto;
  max-width: 100%;
  margin-inline: auto;
  object-fit: contain;
  transition: transform 480ms cubic-bezier(0.22, 1, 0.36, 1);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 12.5rem;
  }

  ${CardLink}:hover & {
    transform: scale(1.035);
  }
`;

const Body = styled.div`
  padding: 1.5rem 1.5rem 1.625rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
`;

const Meta = styled.p<{ $ink: string; $tone: 'light' | 'dark' }>`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ $ink, $tone, theme }) =>
    $tone === 'dark' ? theme.colors.gold : $ink};
`;

const TintMark = styled.span<{ $tint: string }>`
  width: 7px;
  height: 7px;
  flex: none;
  transform: rotate(45deg);
  background: ${({ $tint }) => $tint};
`;

const Title = styled.h3<{ $tone: 'light' | 'dark' }>`
  font-size: 1.375rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${({ $tone }) => ($tone === 'dark' ? '#FFFDF8' : 'inherit')};
`;

const Text = styled.p<{ $tone: 'light' | 'dark' }>`
  font-size: 0.9375rem;
  line-height: 1.6;
  flex: 1;
  color: ${({ $tone, theme }) =>
    $tone === 'dark' ? 'rgba(255, 253, 248, 0.82)' : theme.colors.muted};
`;

const Foot = styled.span<{ $tone: 'light' | 'dark' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.85rem;
  padding-top: 0.9rem;
  border-top: 1px solid
    ${({ $tone, theme }) =>
      $tone === 'dark' ? 'rgba(255, 253, 248, 0.14)' : theme.colors.border};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ $tone, theme }) =>
    $tone === 'dark' ? '#FFFDF8' : theme.colors.text};

  ${CardLink}:hover & {
    color: ${({ $tone, theme }) =>
      $tone === 'dark' ? theme.colors.gold : theme.colors.text};
  }
`;

const CircleArrow = styled.span<{ $arrow: string; $tone: 'light' | 'dark' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  flex: none;
  border-radius: 50%;
  border: 1px solid
    ${({ $tone, theme }) => ($tone === 'dark' ? theme.colors.gold : theme.colors.text)};
  color: ${({ $arrow }) => $arrow};
  transition:
    background-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
    color 220ms ease,
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1);

  ${CardLink}:hover & {
    background: ${({ $tone, theme }) =>
      $tone === 'dark' ? theme.colors.gold : theme.colors.text};
    color: ${({ $tone }) => ($tone === 'dark' ? '#211A13' : '#FFFDF8')};
    transform: translateX(3px);
  }
`;

export function ProductCard({
  product,
  rangeName,
  tone = 'light',
}: {
  product: ProductContent;
  rangeName: string;
  tone?: 'light' | 'dark';
}) {
  const src = img(product.image);
  const ink = product.rangeId === 'plump' ? theme.colors.plumpDeep : theme.colors.clearDeep;
  const tint = product.rangeId === 'plump' ? theme.colors.plumpTint : theme.colors.clearTint;
  const arrow = tone === 'dark' ? theme.colors.gold : ink;
  return (
    <CardLink
      to={`/products/${product.slug}`}
      aria-label={`${product.name}, ${rangeName}, step ${product.step}`}
      $tone={tone}
    >
      <ImageWrap $tone={tone}>
        <GhostStep aria-hidden="true">{product.step}</GhostStep>
        {src !== '' && (
          <ProductImage
            src={src}
            alt={`${product.name} from the ${rangeName} range`}
            loading="lazy"
            decoding="async"
          />
        )}
      </ImageWrap>
      <Body>
        <Meta $ink={ink} $tone={tone}>
          <TintMark $tint={tint} aria-hidden="true" />
          {rangeName} · Step {product.step}
        </Meta>
        <Title $tone={tone}>{product.name}</Title>
        <Text $tone={tone}>{product.tagline}</Text>
        <Foot $tone={tone} aria-hidden="true">
          View product
          <CircleArrow $arrow={arrow} $tone={tone}>
            <ArrowRightIcon size={14} />
          </CircleArrow>
        </Foot>
      </Body>
    </CardLink>
  );
}
