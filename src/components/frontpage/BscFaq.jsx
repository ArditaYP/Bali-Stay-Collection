import React from 'react';
import { FAQS_DATA } from '../../data/bscVillasData';

/**
 * Komponen BscFaq
 * Menampilkan seksi tanya jawab umum 'Before you book'
 * dengan format accordion interaktif sesuai desain bsc-frontpage_1.html.
 * 
 * @returns {React.JSX.Element} Elemen JSX FAQ
 */
export default function BscFaq() {
  const faqs = FAQS_DATA || [
    {
      q: 'Why are there no star ratings yet?',
      a: 'We are a new brand and only show reviews from verified BSC guests. Until they come in, every villa shows our inspection notes and the date it was last checked.'
    },
    {
      q: 'Is the price shown the final price?',
      a: 'The total shown includes taxes, cleaning, and service fees. Anything extra, like transfers or a chef, is quoted separately before you pay.'
    },
    {
      q: 'What is your cancellation policy?',
      a: 'Each villa shows its policy on the card and on the villa page. Free reschedule up to 7 days before check-in on selected villas.'
    },
    {
      q: 'How do I pay, and is it secure?',
      a: 'We accept major credit cards and bank transfers through secure encrypted channels. You receive a written confirmation right after booking.'
    },
    {
      q: 'Who do I contact during my stay?',
      a: 'Our on-call local team. You get their direct phone numbers and WhatsApp in your booking confirmation.'
    }
  ];

  return (
    <section className="sec" id="faq">
      <div className="wrap faq" style={{ maxWidth: '860px' }}>
        <div className="sec-head">
          <div className="eyebrow">Questions</div>
          <h2>Before you book</h2>
        </div>

        {faqs.map((faq, idx) => (
          <details key={idx}>
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
