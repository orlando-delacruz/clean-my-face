import { useState } from 'react';
import type { FormEvent } from 'react';
import styled from 'styled-components';
import { closing, footer, skinNeeds } from '../data/content';
import { img } from '../data/images';
import { Link } from '../router';
import { ArrowRightIcon, ChatIcon, CheckIcon, socialIcons } from '../components/icons';
import {
  Container,
  Emblem,
  Eyebrow,
  Lead,
  Reveal,
  Section,
  SectionTitle,
} from '../components/primitives';

const ClosingSection = styled(Section)<{ $bg: string }>`
  background-color: ${({ theme }) => theme.colors.background};
  ${({ theme, $bg }) =>
    $bg !== '' &&
    `
    background-image: linear-gradient(color-mix(in srgb, ${theme.colors.background} 86%, transparent), color-mix(in srgb, ${theme.colors.background} 86%, transparent)), url("${$bg}");
    background-size: cover;
    background-position: center;
    `};
  color: ${({ theme }) => theme.colors.text};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
`;

const Intro = styled.div`
  max-width: 34rem;
`;

const InkEyebrow = styled(Eyebrow)`
  color: ${({ theme }) => theme.colors.plumpDeep};
`;

const ClosingTitle = styled(SectionTitle)`
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  line-height: 1.08;
  letter-spacing: -0.015em;
  text-wrap: balance;
`;

const Rule = styled.span`
  display: block;
  width: 3.5rem;
  height: 2px;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.gold};
  margin-block: 1.5rem;
`;

const ClosingLead = styled(Lead)`
  color: ${({ theme }) => theme.colors.muted};
  max-width: 46ch;
`;

const Assurance = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const Figure = styled.figure`
  margin: 0;
  flex: none;
  width: 8.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 11rem;
  }
`;

const SmallImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 24px 48px -28px rgba(33, 26, 19, 0.4);
`;

const Cues = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.875rem;
`;

const Cue = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.625rem;
  align-items: start;
`;

const Tick = styled.span`
  width: 7px;
  height: 7px;
  flex: none;
  margin-top: 0.45em;
  background: ${({ theme }) => theme.colors.gold};
  transform: rotate(45deg);
`;

const CueName = styled.p`
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

const CueSkin = styled.p`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
  margin-top: 0.125rem;
`;

const SocialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-top: 1.75rem;
`;

const SocialButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  transition: color 160ms ease, border-color 160ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.plumpDeep};
    border-color: ${({ theme }) => theme.colors.plumpDeep};
  }
`;

const FormCard = styled.form`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 28px 56px -28px rgba(33, 26, 19, 0.25);
  padding: 1.75rem;
  display: grid;
  gap: 1.125rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2.25rem;
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
  color: #9c2b2b;
  font-weight: 500;
`;

const Submit = styled.button`
  width: 100%;
  min-height: 3.25rem;
  padding: 0.875rem 1.75rem;
  font: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
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
    box-shadow: 0 14px 28px -18px rgba(33, 26, 19, 0.7);
  }
`;

const SuccessCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 28px 56px -28px rgba(33, 26, 19, 0.25);
  padding: 2.5rem 1.75rem;
  display: grid;
  gap: 1rem;
  justify-items: center;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 3rem 2.25rem;
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

/**
 * Visual-only inquiry mock. No network, no email service, no data capture.
 * Submit only reveals a preview notice, never a success confirmation.
 */
export function Closing() {
  const { form } = closing;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [concern, setConcern] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const imageSrc = img(closing.image);
  const bg = img('bg-mage-1.jpg');

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
    <ClosingSection id="contact" aria-labelledby="contact-title" $bg={bg}>
      <Container>
        <Reveal>
          <Grid>
            <Intro>
              <Emblem aria-hidden="true">
                <ChatIcon size={18} />
              </Emblem>
              <InkEyebrow>{closing.eyebrow}</InkEyebrow>
              <ClosingTitle id="contact-title">{closing.title}</ClosingTitle>
              <Rule aria-hidden="true" />
              <ClosingLead>{closing.lead}</ClosingLead>
              <Assurance>
                {imageSrc !== '' && (
                  <Figure>
                    <SmallImage
                      src={imageSrc}
                      alt={closing.imageAlt}
                      loading="lazy"
                      decoding="async"
                    />
                  </Figure>
                )}
                <Cues aria-label="Skin need paths">
                  {skinNeeds.cards.map((card) => (
                    <Cue key={card.rangeId}>
                      <Tick aria-hidden="true" />
                      <span>
                        <CueName>{card.title}</CueName>
                        <CueSkin>{card.skinType}</CueSkin>
                      </span>
                    </Cue>
                  ))}
                </Cues>
              </Assurance>
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
            </Intro>
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
                  aria-describedby={errors.name !== undefined ? 'inquiry-name-error' : undefined}
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
                  aria-describedby={errors.email !== undefined ? 'inquiry-email-error' : undefined}
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
                    aria-describedby={errors.concern !== undefined ? 'inquiry-concern-error' : undefined}
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
              <Submit type="submit">{form.submitLabel}</Submit>
            </FormCard>
            )}
          </Grid>
        </Reveal>
      </Container>
    </ClosingSection>
  );
}
