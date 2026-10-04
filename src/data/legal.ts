/**
 * Draft legal copy for the CleanMyFace concept preview.
 *
 * STATUS: draft. Written to be reviewed and approved by Peerpharm before any
 * public use. Values in [square brackets] are placeholders the client must
 * confirm. This is not legal advice.
 */

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalDocument {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  draftNotice: string;
  sections: LegalSection[];
  contact: string;
}

export const privacyPolicy: LegalDocument = {
  slug: '/privacy-policy',
  title: 'Privacy Policy',
  summary:
    'How Peerpharm would handle personal information collected through the CleanMyFace website.',
  updated: 'Last updated: [effective date to be confirmed]',
  draftNotice:
    'This is a draft prepared for the CleanMyFace concept preview. Placeholders in square brackets and the policy as a whole are pending review and approval by Peerpharm.',
  contact:
    'Questions about this policy can be sent to the Peerpharm Data Protection Officer at [privacy contact email] or [registered business address].',
  sections: [
    {
      heading: 'Who we are',
      paragraphs: [
        'CleanMyFace is a dermocosmetics brand of Peerpharm, a company registered in the Republic of the Philippines. Peerpharm is the personal information controller for the data described in this policy, and it handles that data in line with the Data Privacy Act of 2012 (Republic Act No. 10173) and the issuances of the National Privacy Commission.',
        'This website is a concept preview. It is presented to demonstrate a proposed design and does not yet operate as a live store, account system, or customer service channel.',
      ],
    },
    {
      heading: 'Information we collect',
      paragraphs: [
        'The inquiry form on the home page is a visual demonstration. It does not transmit, store, or forward anything you type. Because the form is not connected, no personal information is collected by this preview.',
        'If the form is connected in a later version, the information submitted would be limited to what the form asks for: your name, your email address, your main skin concern, and any optional note you choose to add.',
      ],
    },
    {
      heading: 'How information would be used',
      paragraphs: [
        'If an inquiry form is enabled, the information would be used to answer your message, suggest a product range that may suit the concern you described, and keep a record of the request for support purposes.',
        'We would not sell your personal information, and we would not use it for automated decisions that produce legal or similarly significant effects.',
      ],
      list: [
        'To respond to your inquiry and provide the information you asked for.',
        'To improve the website, its content, and its forms.',
        'To meet legal, accounting, and regulatory obligations.',
      ],
    },
    {
      heading: 'Cookies and analytics',
      paragraphs: [
        'This preview does not set advertising or analytics cookies. If measurement tools are added later, this policy will be updated before they go live, and any non-essential cookies will be introduced with an appropriate consent mechanism.',
      ],
    },
    {
      heading: 'Sharing information',
      paragraphs: [
        'Peerpharm would share personal information only with service providers that help run the website and respond to inquiries, and only to the extent they need it. Those providers are required to protect the information and to use it solely for the agreed purpose.',
        'Information may also be disclosed where required by law, regulation, or a valid order from a competent authority.',
      ],
    },
    {
      heading: 'Retention',
      paragraphs: [
        'Personal information would be kept only for as long as it is needed for the purpose it was collected for, or for as long as the law requires. When it is no longer needed, it would be securely deleted or anonymized.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'Under the Data Privacy Act of 2012, you have the right to be informed, to object, to access, to correct, to have your data erased or blocked, to damages for violations, and to data portability. You may also lodge a complaint with the National Privacy Commission.',
        'To exercise any of these rights, contact the Peerpharm Data Protection Officer using the details below. We would respond within the period required by law.',
      ],
    },
    {
      heading: 'Security',
      paragraphs: [
        'Peerpharm would use reasonable organizational, physical, and technical measures to protect personal information against loss, misuse, and unauthorized access. No method of transmission or storage is completely secure, so absolute security cannot be guaranteed.',
      ],
    },
    {
      heading: 'Children',
      paragraphs: [
        'The website is not directed at children, and we do not knowingly collect personal information from children. If a parent or guardian believes a child has provided personal information, they may contact us so the information can be removed.',
      ],
    },
    {
      heading: 'Changes to this policy',
      paragraphs: [
        'This policy may be updated as the website and its forms change. The current version would always be available on this page, with the effective date shown at the top.',
      ],
    },
  ],
};

export const termsConditions: LegalDocument = {
  slug: '/terms-and-conditions',
  title: 'Terms and Conditions',
  summary:
    'The terms that would govern your use of the CleanMyFace website and its content.',
  updated: 'Last updated: [effective date to be confirmed]',
  draftNotice:
    'This is a draft prepared for the CleanMyFace concept preview. Placeholders in square brackets and the terms as a whole are pending review and approval by Peerpharm.',
  contact:
    'Questions about these terms can be sent to Peerpharm at [general contact email] or [registered business address].',
  sections: [
    {
      heading: 'Acceptance of these terms',
      paragraphs: [
        'By using this website, you agree to these terms. If you do not agree, please do not use the site. These terms apply together with any policy published on this website, including the Privacy Policy.',
      ],
    },
    {
      heading: 'About this website',
      paragraphs: [
        'This website is a concept preview created to demonstrate a proposed CleanMyFace design. It is provided for general information. It is not a store, and it does not offer products for sale, take payments, or process orders.',
      ],
    },
    {
      heading: 'Use of the site',
      paragraphs: [
        'You agree to use the website lawfully and not to interfere with its operation or with other visitors. You may not copy, scrape, or republish the site content except as allowed below or as permitted by law.',
      ],
    },
    {
      heading: 'Product information',
      paragraphs: [
        'Product names, descriptions, benefits, ingredients, textures, and usage notes shown here are illustrative for this preview and are subject to change. Nothing on this website is a promise of a specific result, and product information should be confirmed against final packaging and official product literature before purchase.',
        'This website does not provide medical advice. It does not diagnose, treat, or cure any condition. For persistent or severe skin concerns, and before combining active ingredients, consult a licensed dermatologist or physician.',
      ],
    },
    {
      heading: 'Intellectual property',
      paragraphs: [
        'The CleanMyFace name, the Peerpharm brand, the site design, and the text and imagery on this website are owned by Peerpharm or its licensors and are protected by applicable intellectual property laws. You may view the site for personal, non-commercial use. Any other use requires prior written permission.',
      ],
    },
    {
      heading: 'Third-party links',
      paragraphs: [
        'The website may link to third-party sites for convenience. Peerpharm does not control those sites and is not responsible for their content, products, or privacy practices.',
      ],
    },
    {
      heading: 'Availability and changes',
      paragraphs: [
        'The website may be changed, interrupted, or withdrawn at any time, including after this concept preview ends. Features and content shown here are not guaranteed to appear in a final version.',
      ],
    },
    {
      heading: 'Limitation of liability',
      paragraphs: [
        'To the extent permitted by law, Peerpharm is not liable for indirect or consequential loss arising from your use of, or reliance on, this website or its content. Nothing in these terms limits liability that cannot be limited under Philippine law.',
      ],
    },
    {
      heading: 'Governing law',
      paragraphs: [
        'These terms are governed by the laws of the Republic of the Philippines. Disputes arising from them are subject to the exclusive jurisdiction of the courts of [city], Philippines.',
      ],
    },
    {
      heading: 'Changes to these terms',
      paragraphs: [
        'These terms may be updated from time to time. The current version would always be available on this page, with the effective date shown at the top. Continued use of the website after an update means you accept the revised terms.',
      ],
    },
  ],
};
