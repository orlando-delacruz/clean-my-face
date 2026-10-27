import styled from 'styled-components';
import { brand, contactInfo, footerGroups, legalLinks, socialLinks } from '../../../data/site';
import { Link } from '../../../router';
import { Container } from '../../ui';
import {
  ArrowRightIcon,
  EmailIcon,
  LocationIcon,
  PhoneIcon,
  socialIcons,
} from '../../icons';

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
    grid-template-columns: 1.5fr 1.2fr 1fr 1fr;
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

const SocialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-top: 1.5rem;
`;

const SocialButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.625rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.borderInverse};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.textInverse};
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  transition: color 160ms ease, border-color 160ms ease,
    transform 160ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
    border-color: ${({ theme }) => theme.colors.gold};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focusInverse};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const Column = styled.nav`
  margin: 0;
`;

const ColumnTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.mutedInverse};
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderInverse};
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

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
`;

const ContactItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 2.25rem;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.textInverse};
`;

const ContactIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  flex: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.textInverse05};
  color: ${({ theme }) => theme.colors.gold};
`;

const ContactLink = styled.a`
  color: inherit;
  text-decoration: none;
  overflow-wrap: anywhere;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
    text-decoration: underline;
    text-underline-offset: 0.2em;
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

const BackToTop = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  margin-left: auto;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.mutedInverse};
  transition: color 160ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
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
          {realSocials.length > 0 && (
            <SocialRow aria-label="Social and contact links">
              {realSocials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <SocialButton
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                    {social.label}
                  </SocialButton>
                );
              })}
            </SocialRow>
          )}
        </BrandBlock>

        <Column aria-label="Contact">
          <ColumnTitle>Contact</ColumnTitle>
          <ContactList>
            <ContactItem>
              <ContactIcon aria-hidden="true">
                <EmailIcon size={16} />
              </ContactIcon>
              <ContactLink href={`mailto:${contactInfo.email}`}>
                {contactInfo.email}
              </ContactLink>
            </ContactItem>
            <ContactItem>
              <ContactIcon aria-hidden="true">
                <PhoneIcon size={16} />
              </ContactIcon>
              <ContactLink href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>
                {contactInfo.phone}
              </ContactLink>
            </ContactItem>
            <ContactItem>
              <ContactIcon aria-hidden="true">
                <LocationIcon size={16} />
              </ContactIcon>
              <span>{contactInfo.address}</span>
            </ContactItem>
          </ContactList>
        </Column>

        {footerGroups.map((group) => (
          <Column key={group.title} aria-label={group.title}>
            <ColumnTitle>{group.title}</ColumnTitle>
            <LinkList>
              {group.links.map((link) => (
                <li key={link.href}>
                  <FooterLink to={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </LinkList>
          </Column>
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
        <BackToTop to="#top">
          Back to top
          <ArrowRightIcon size={13} style={{ transform: 'rotate(-90deg)' }} />
        </BackToTop>
      </Legal>
    </Bar>
  );
}