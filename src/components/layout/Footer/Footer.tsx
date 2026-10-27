import styled from 'styled-components';
import { brand, footerGroups, legalLinks, socialLinks } from '../../../data/site';
import { Link } from '../../../router';
import { Container } from '../../ui';
import { socialIcons } from '../../icons';

// Placeholder "#" links are never rendered; only real profile URLs qualify.
const realSocials = socialLinks.filter(
  (social) => social.href !== '' && social.href !== '#',
);

const Bar = styled.footer`
  background: ${({ theme }) => theme.colors.surfaceInverse};
  color: ${({ theme }) => theme.colors.textInverse};
  border-top: 1px solid ${({ theme }) => theme.colors.gold};
  padding-block: 4rem 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: 5rem 2.5rem;
  }
`;

const Grid = styled(Container)`
  display: grid;
  gap: 2.75rem;
  align-items: start;

  > * {
    min-width: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1.6fr 1fr 1fr;
    gap: 3rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: 4rem;
  }
`;

const BrandBlock = styled.div`
  max-width: 26rem;
`;

const BrandName = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.75rem, 1.4rem + 1.2vw, 2.125rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.08;
`;

const BrandSub = styled.p`
  margin-top: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.mutedInverse};
`;

const Statement = styled.p`
  margin-top: 1.25rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.5rem, 1.25rem + 1vw, 2rem);
  font-weight: 500;
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.textInverse};
  text-wrap: balance;
`;

const SocialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-top: 1.5rem;
`;

const SocialButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid ${({ theme }) => theme.colors.borderInverse};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.textInverse};
  transition: color 160ms ease, border-color 160ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
    border-color: ${({ theme }) => theme.colors.gold};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focusInverse};
  }
`;

const Nav = styled.nav`
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: 0.375rem;
  }
`;

const ColumnTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.mutedInverse};
  margin-bottom: 1rem;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.125rem;
`;

const FooterLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  text-decoration: none;
  text-underline-offset: 0.3em;
  text-decoration-thickness: 1px;
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: color 160ms ease, text-decoration-color 160ms ease;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.gold};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focusInverse};
  }
`;

const Legal = styled(Container)`
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.borderInverse};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem 2rem;
  font-size: 0.8125rem;
  line-height: 1.6;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-end;
  }
`;

const LegalLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 1.75rem;
`;

const LegalLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  text-decoration: none;
  text-underline-offset: 0.3em;
  text-decoration-thickness: 1px;
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: color 160ms ease, text-decoration-color 160ms ease;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.gold};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focusInverse};
  }
`;

export function Footer() {
  return (
    <Bar>
      <Grid>
        <BrandBlock>
          <BrandName>{brand.name}</BrandName>
          <BrandSub>{brand.sub}</BrandSub>
          <Statement>{brand.statement}</Statement>
          {realSocials.length > 0 && (
            <SocialRow aria-label="Social and contact links">
              {realSocials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <SocialButton
                    key={social.label}
                    to={social.href}
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </SocialButton>
                );
              })}
            </SocialRow>
          )}
        </BrandBlock>
        {footerGroups.map((group) => (
          <Nav key={group.title} aria-label={group.title}>
            <ColumnTitle>{group.title}</ColumnTitle>
            <LinkList>
              {group.links.map((link) => (
                <li key={link.href}>
                  <FooterLink to={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </LinkList>
          </Nav>
        ))}
      </Grid>
      <Legal>
        <LegalLinks aria-label="Legal">
          {legalLinks.map((link) => (
            <LegalLink key={link.href} to={link.href}>
              {link.label}
            </LegalLink>
          ))}
        </LegalLinks>
      </Legal>
    </Bar>
  );
}
