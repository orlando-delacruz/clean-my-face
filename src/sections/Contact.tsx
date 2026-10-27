import { useState } from 'react';
import type { FormEvent } from 'react';
import styled from 'styled-components';
import { closing } from '../data/content';
import { home } from '../data/home';
import { contactInfo, socialLinks } from '../data/site';
import {
  ArrowRightIcon,
  CheckIcon,
  EmailIcon,
  LocationIcon,
  PhoneIcon,
} from '../components/icons';
import { Container, Heading, Reveal, Text } from '../components/ui';
import { socialIcons } from '../components/icons';

const Band = styled.section`
  scroll-margin-top: 5rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding-block: ${({ theme }) => theme.spacing.sectionMobile};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.spacing.section};
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;
  align-items: start;

  > * {
    min-width: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    gap: 4rem;
    align-items: stretch;
  }
`;

const Intro = styled.div`
  display: grid;
  gap: 1.5rem;
  align-content: start;
`;

const Rule = styled.span`
  display: block;
  width: 3.5rem;
  height: 1px;
  background: ${({ theme }) => theme.colors.gold};
`;

const Lead = styled(Text)`
  max-width: 34rem;
`;

const ContactList = styled.ul`
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-height: 3.25rem;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: border-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 200ms cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    border-color: ${({ theme }) => theme.colors.plumpDeep};
    transform: translateY(-1px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const ContactIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  flex: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.plumpSoft};
  color: ${({ theme }) => theme.colors.plumpDeep};
`;

const ContactMeta = styled.div`
  display: grid;
  gap: 0.125rem;
  min-width: 0;
`;

const ContactLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const ContactValue = styled.p`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  overflow-wrap: anywhere;
`;

const SocialBlock = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const SocialLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const SocialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
`;

const SocialButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
    color 200ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 200ms cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    border-color: ${({ theme }) => theme.colors.plumpDeep};
    color: ${({ theme }) => theme.colors.plumpDeep};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.focus};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const FormCard = styled.form`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 28px 56px -28px ${({ theme }) => theme.colors.text25};
  padding: 1.75rem;
  display: grid;
  gap: 1.125rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 1.75rem;
    right: 1.75rem;
    height: 2px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.gold};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2.25rem;

    &::before {
      left: 2.25rem;
      right: 2.25rem;
    }
  }
`;

const Field = styled.div`
  display: grid;
  gap: 0.375rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  min-height: 3rem;
  padding: 0.625rem 0.875rem;
  font: inherit;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.plumpDeep};
    outline-offset: 1px;
    border-color: ${({ theme }) => theme.colors.plumpDeep};
  }
`;

const SelectWrap = styled.div`
  position: relative;
`;

const Select = styled.select`
  width: 100%;
  min-height: 3rem;
  padding: 0.625rem 2.75rem 0.625rem 0.875rem;
  font: inherit;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  appearance: none;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }
`;

const Chevron = styled.span`
  position: absolute;
  right: 0.875rem;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  display: inline-flex;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.muted};
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 6.5rem;
  padding: 0.625rem 0.875rem;
  font: inherit;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  resize: vertical;
`;

const Error = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.error};
  font-weight: 500;
`;

const Submit = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  min-height: 3.25rem;
  padding: 0.875rem 1.75rem;
  font: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  border: none;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.plumpDeep};
  color: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: transform 160ms ease, background-color 160ms ease,
    box-shadow 160ms ease;

  &:hover {
    transform: translateY(-1px);
    background: color-mix(
      in srgb,
      ${({ theme }) => theme.colors.plumpDeep} 82%,
      ${({ theme }) => theme.colors.text}
    );
    box-shadow: 0 14px 28px -18px ${({ theme }) => theme.colors.text70};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const SuccessCard = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 28px 56px -28px ${({ theme }) => theme.colors.text25};
  padding: 2.5rem 1.75rem;
  display: grid;
  gap: 1rem;
  justify-items: center;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 1.75rem;
    right: 1.75rem;
    height: 2px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.gold};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 3rem 2.25rem;

    &::before {
      left: 2.25rem;
      right: 2.25rem;
    }
  }
`;

const CheckCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.plumpDeep};
  color: ${({ theme }) => theme.colors.surface};
`;

const SuccessTitle = styled.h3`
  font-size: 1.5rem;
`;

const SuccessText = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 40ch;
`;

const AgainButton = styled.button`
  margin-top: 0.5rem;
  min-height: 3rem;
  padding: 0.75rem 1.75rem;
  font: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.colors.plumpDeep};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.plumpDeep};
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.plumpDeep};
    color: ${({ theme }) => theme.colors.surface};
  }
`;

interface FormErrors {
  name?: string;
  email?: string;
  concern?: string;
}

const contactItems = [
  {
    label: 'Email',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    icon: EmailIcon,
  },
  {
    label: 'Phone',
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
    icon: PhoneIcon,
  },
  {
    label: 'Visit',
    value: contactInfo.address,
    href: undefined,
    icon: LocationIcon,
  },
  {
    label: 'Hours',
    value: contactInfo.hours,
    href: undefined,
    icon: CheckIcon,
  },
];

export function Contact() {
  const { form } = closing;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [concern, setConcern] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: FormErrors = {};
    if (name.trim() === '') next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = 'Please enter a valid email address.';
    if (concern === '') next.concern = 'Please choose a skin concern.';
    setErrors(next);
    setSent(Object.keys(next).length === 0);
  }

  function handleReset() {
    setName('');
    setEmail('');
    setConcern('');
    setMessage('');
    setErrors({});
    setSent(false);
  }

  const firstName = name.trim().split(/\s+/)[0] ?? '';

  return (
    <Band id="contact" aria-labelledby="contact-title">
      <Container>
        <Grid>
          <Reveal>
            <Intro>
              <Rule aria-hidden="true" />
              <Heading as="h2" size="h2" id="contact-title">
                {home.contact.heading}
              </Heading>
              <Lead variant="bodyLg" tone="muted" balance>
                {home.contact.lead}
              </Lead>
              <ContactList>
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <ContactIcon aria-hidden="true">
                        <Icon size={18} />
                      </ContactIcon>
                      <ContactMeta>
                        <ContactLabel>{item.label}</ContactLabel>
                        <ContactValue>{item.value}</ContactValue>
                      </ContactMeta>
                    </>
                  );
                  return (
                    <li key={item.label}>
                      {item.href !== undefined ? (
                        <ContactItem as="a" href={item.href}>
                          {content}
                        </ContactItem>
                      ) : (
                        <ContactItem>{content}</ContactItem>
                      )}
                    </li>
                  );
                })}
              </ContactList>
              <SocialBlock>
                <SocialLabel>Follow along</SocialLabel>
                <SocialRow>
                  {socialLinks.map((social) => {
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
              </SocialBlock>
            </Intro>
          </Reveal>
          <Reveal>
            {sent ? (
              <SuccessCard role="status">
                <CheckCircle aria-hidden="true">
                  <CheckIcon size={24} />
                </CheckCircle>
                <SuccessTitle>
                  Thank you{firstName !== '' ? `, ${firstName}` : ''}!
                </SuccessTitle>
                <SuccessText>{form.previewNotice}</SuccessText>
                <AgainButton type="button" onClick={handleReset}>
                  Send another inquiry
                </AgainButton>
              </SuccessCard>
            ) : (
              <FormCard onSubmit={handleSubmit} noValidate>
                <Field>
                  <Label htmlFor="inquiry-name">{form.nameLabel}</Label>
                  <Input
                    id="inquiry-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={form.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={errors.name !== undefined}
                    aria-describedby={
                      errors.name !== undefined ? 'inquiry-name-error' : undefined
                    }
                  />
                  {errors.name !== undefined && (
                    <Error id="inquiry-name-error" role="alert">
                      {errors.name}
                    </Error>
                  )}
                </Field>
                <Field>
                  <Label htmlFor="inquiry-email">{form.emailLabel}</Label>
                  <Input
                    id="inquiry-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={form.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={errors.email !== undefined}
                    aria-describedby={
                      errors.email !== undefined ? 'inquiry-email-error' : undefined
                    }
                  />
                  {errors.email !== undefined && (
                    <Error id="inquiry-email-error" role="alert">
                      {errors.email}
                    </Error>
                  )}
                </Field>
                <Field>
                  <Label htmlFor="inquiry-concern">{form.concernLabel}</Label>
                  <SelectWrap>
                    <Select
                      id="inquiry-concern"
                      name="concern"
                      value={concern}
                      onChange={(e) => {
                        setConcern(e.target.value);
                      }}
                      aria-invalid={errors.concern !== undefined}
                      aria-describedby={
                        errors.concern !== undefined ? 'inquiry-concern-error' : undefined
                      }
                    >
                      <option value="">Select one…</option>
                      {form.concernOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <Chevron aria-hidden="true">
                      <ArrowRightIcon size={16} />
                    </Chevron>
                  </SelectWrap>
                  {errors.concern !== undefined && (
                    <Error id="inquiry-concern-error" role="alert">
                      {errors.concern}
                    </Error>
                  )}
                </Field>
                <Field>
                  <Label htmlFor="inquiry-message">{form.messageLabel}</Label>
                  <Textarea
                    id="inquiry-message"
                    name="message"
                    placeholder={form.messagePlaceholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Field>
                <Submit type="submit">
                  {form.submitLabel}
                  <ArrowRightIcon size={15} />
                </Submit>
              </FormCard>
            )}
          </Reveal>
        </Grid>
      </Container>
    </Band>
  );
}