import styled from 'styled-components';
import { footer } from '../data/content';
import { Link } from '../router';
import { Container } from '../components/primitives';
import { socialIcons } from '../components/icons';

const Bar = styled.footer`
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
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
  text-wrap: balance;
`;

const Tagline = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  margin-block: 0.875rem 0;
`;

const BrandRule = styled.span`
  display: block;
  width: 2.5rem;
  height: 1px;
  background: ${({ theme }) => theme.colors.gold};
  opacity: 0.9;
  margin-block: 1.125rem;
`;

const Blurb = styled.p`
  font-size: 0.9375rem;
  line-height: 1.65;
  color: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.background} 80%,
    transparent
  );
  max-width: 36ch;
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
  border: 1px solid rgba(250, 247, 241, 0.28);
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.background};
  transition: color 160ms ease, border-color 160ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
    border-color: ${({ theme }) => theme.colors.gold};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
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
  color: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.background} 62%,
    transparent
  );
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
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }
`;

const Legal = styled(Container)`
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(250, 247, 241, 0.16);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 2rem;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.background} 70%,
    transparent
  );
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
    color: ${({ theme }) => theme.colors.background};
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.gold};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }
`;

export function Footer() {
  return (
    <Bar>
      <Grid>
        <BrandBlock>
          <BrandName>CleanMyFace</BrandName>
          <Tagline>{footer.tagline}</Tagline>
          <BrandRule aria-hidden="true" />
          <Blurb>{footer.blurb}</Blurb>
          <SocialRow aria-label="Social and contact links">
            {footer.socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <SocialButton key={social.label} to={social.href} aria-label={social.label}>
                  <Icon size={18} />
                </SocialButton>
              );
            })}
          </SocialRow>
        </BrandBlock>
        {footer.columns.map((column) => (
          <Nav key={column.title} aria-label={column.title}>
            <ColumnTitle>{column.title}</ColumnTitle>
            <LinkList>
              {column.links.map((link) => (
                <li key={link.label}>
                  <FooterLink to={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </LinkList>
          </Nav>
        ))}
      </Grid>
      <Legal>
        <span>{footer.legal}</span>
        <LegalLinks aria-label="Legal">
          {footer.legalLinks.map((link) => (
            <LegalLink key={link.href} to={link.href}>
              {link.label}
            </LegalLink>
          ))}
        </LegalLinks>
      </Legal>
    </Bar>
  );
}
