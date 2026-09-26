import React, { useState } from 'react';
import { BRAND_LOGO } from '../data/mockData';

interface ContactPageProps {
  onSendMessage: (msg: { name: string; email: string; phone: string; subject: string; message: string }) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onSendMessage }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('sizing');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onSendMessage({
        name: fullName,
        email,
        phone,
        subject:
          purpose === 'order'
            ? 'Order Status & Tracking'
            : purpose === 'sizing'
            ? 'Bespoke Fit & Sizing Guidance'
            : purpose === 'exchange'
            ? 'Exchange or Return Request'
            : 'General Boutique Inquiry',
        message: note,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setNote('');
    }, 700);
  };

  const faqs = [
    {
      q: 'How can I place an order?',
      a: 'You may purchase directly through our catalog collection on this application, or arrange an assisted styling order over WhatsApp with our private concierge team.',
    },
    {
      q: 'How do I choose my correct size?',
      a: 'Every piece has an editorial fit guide attached to its detail view. Our silhouettes are designed with relaxed, breathable Indian textiles. For custom measurements, click "WhatsApp Concierge" for live fitting guidance.',
    },
    {
      q: 'How do exchanges and returns work?',
      a: 'We offer complimentary reverse pickups across India within 7 days of delivery. Items must retain boutique tags and remain unworn. Simply select "Exchange/Return" in our form or chat via WhatsApp.',
    },
    {
      q: 'Do you deliver internationally?',
      a: 'Yes, we dispatch worldwide via DHL Express. International orders typically reach doors within 5–8 working days with end-to-end tracking provided upon dispatch.',
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 pb-16">
      
      {/* Editorial Intro & Botanical Emblem Header */}
      <section className="text-center flex flex-col items-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#D8C8AE] bg-[#FCFAF6] overflow-hidden shadow-xs mb-3 flex items-center justify-center p-0.5">
          <img
            src={BRAND_LOGO}
            alt="Simply Styld"
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6nU6SILkXaRsg2r4K04zrch0bHJvpK2eBDhEN1aDAhPQP1Z4FhOA53Qu-IqLhlVt_nZPAR2g2mxitYgIC9haLcAqlVaQiH_Pav3ecw_c1MmfFaYx7FhUXoLRy3Qa4S7Kzck7G74A5NLTcHcn9wY824xgI_zM-SGtrSiOZwf2mX-7n0LEro3xuqzCwwlytbHw-_Tec-UvpoPRLDb4rnFDV8TGxggk9ABBYeQGm4nGoUvDzjIQru4uktVJ9zCS-zH1MY3o';
            }}
          />
        </div>
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#745a2f] font-semibold mb-1">
          Boutique Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#171513]">Let’s Talk</h1>
        <p className="text-xs sm:text-sm text-[#4c4640] max-w-xs mt-1">
          Have a question about a product, size or order? We’re happy to help.
        </p>

        {/* Ornamental Divider */}
        <div className="flex items-center justify-center gap-2 w-32 mt-3 opacity-60">
          <div className="h-px bg-[#D8C8AE] flex-1"></div>
          <span className="text-[#745a2f] text-[10px]">✦</span>
          <div className="h-px bg-[#D8C8AE] flex-1"></div>
        </div>
      </section>

      {/* Quick Connect Boutique Cards */}
      <section className="space-y-2.5">
        
        {/* WhatsApp */}
        <a
          href="https://wa.me/919820145890?text=Hello%20Simply%20Styld"
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-[#FCFAF6] rounded-xl p-4 border border-[#D8C8AE]/60 hover:bg-[#EDE4D6] transition-all duration-300 shadow-xs"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#f8f3ea] flex items-center justify-center text-[#745a2f] shrink-0 group-hover:bg-[#171513] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm font-semibold text-[#171513]">WhatsApp Concierge</h3>
                <span className="text-[10px] text-[#745a2f] uppercase font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  Open <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </span>
              </div>
              <p className="text-xs text-[#8C827A] mt-0.5">
                Chat with us directly for instant fit &amp; fabric questions
              </p>
            </div>
          </div>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-[#FCFAF6] rounded-xl p-4 border border-[#D8C8AE]/60 hover:bg-[#EDE4D6] transition-all duration-300 shadow-xs"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#f8f3ea] flex items-center justify-center text-[#745a2f] shrink-0 group-hover:bg-[#171513] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm font-semibold text-[#171513]">Instagram</h3>
                <span className="text-[10px] text-[#745a2f] uppercase font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  View <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </span>
              </div>
              <p className="text-xs text-[#8C827A] mt-0.5">
                @simplystyld — Follow our daily styling reels &amp; drops
              </p>
            </div>
          </div>
        </a>

        {/* Telephone */}
        <a
          href="tel:+919820145890"
          className="group block bg-[#FCFAF6] rounded-xl p-4 border border-[#D8C8AE]/60 hover:bg-[#EDE4D6] transition-all duration-300 shadow-xs"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#f8f3ea] flex items-center justify-center text-[#745a2f] shrink-0 group-hover:bg-[#171513] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[20px]">call</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm font-semibold text-[#171513]">Direct Telephone</h3>
                <span className="text-[10px] text-[#745a2f] uppercase font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  Call Now <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </span>
              </div>
              <p className="text-xs text-[#8C827A] mt-0.5">
                +91 98201 45890 — Mon–Sat, 10 AM to 7 PM IST
              </p>
            </div>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:care@simplystyld.com"
          className="group block bg-[#FCFAF6] rounded-xl p-4 border border-[#D8C8AE]/60 hover:bg-[#EDE4D6] transition-all duration-300 shadow-xs"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#f8f3ea] flex items-center justify-center text-[#745a2f] shrink-0 group-hover:bg-[#171513] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm font-semibold text-[#171513]">Client Care</h3>
                <span className="text-[10px] text-[#745a2f] uppercase font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  Send Mail <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </span>
              </div>
              <p className="text-xs text-[#8C827A] mt-0.5">
                care@simplystyld.com — Inquiries &amp; custom orders
              </p>
            </div>
          </div>
        </a>

      </section>

      {/* Visual Editorial Lookbook Strip */}
      <section className="relative w-full rounded-2xl overflow-hidden shadow-sm bg-[#f2ede4] border border-[#D8C8AE]/50">
        <div
          className="h-44 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-Yw3Uny04BEWiEGM0GtXAPcKKjdfGHUvfuXT3c7EO9BIsvkHEBJMiSHChevVBGOqyuql6v3HU2gpMb68lhZ_Qqh3TWFV9erS3HloXD2oEztlFIgDXlvfwe9GCrz65NNqY6TnbDK5XO2VdH0KbWOBEUC3fy7cLeSEl_aefP1XXQpcUZisg8uLyjl5z2GUETikGynxqOR9qz0nBGb7IMXhBkL0n1TkdFf7g38nhFLXUbok7lJfUuv7QRw')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/85 via-[#171513]/30 to-transparent flex flex-col justify-end p-4 text-white">
          <span className="text-[10px] uppercase tracking-widest text-[#fedaa4] font-semibold">
            Atelier Visit
          </span>
          <p className="font-serif text-base sm:text-lg font-normal mt-0.5">
            Crafted with care, tailored for you
          </p>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="bg-[#FCFAF6] rounded-2xl p-5 sm:p-6 border border-[#D8C8AE]/60 shadow-xs">
        <div className="mb-4">
          <span className="text-[10px] uppercase tracking-widest text-[#745a2f] font-semibold">
            Inquiry Form
          </span>
          <h2 className="font-serif text-xl sm:text-2xl text-[#171513] mt-0.5">
            Write to Our Stylists
          </h2>
          <p className="text-xs text-[#8C827A] mt-0.5">Expect a reply within 4 business hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Radhika Sharma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#f8f3ea] p-2.5 rounded-lg border border-[#D8C8AE]/50 text-[#171513] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="radhika@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f8f3ea] p-2.5 rounded-lg border border-[#D8C8AE]/50 text-[#171513] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+91 98000 00000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#f8f3ea] p-2.5 rounded-lg border border-[#D8C8AE]/50 text-[#171513] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
              Inquiry Purpose
            </label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full bg-[#f8f3ea] p-2.5 rounded-lg border border-[#D8C8AE]/50 text-[#171513] focus:outline-none"
            >
              <option value="order">Order Status &amp; Tracking</option>
              <option value="sizing">Bespoke Fit &amp; Sizing Guidance</option>
              <option value="exchange">Exchange or Return Request</option>
              <option value="general">General Boutique Inquiry</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
              Your Note
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tell us how we can assist you today..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-[#f8f3ea] p-2.5 rounded-lg border border-[#D8C8AE]/50 text-[#171513] focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#171513] text-white rounded-xl text-xs font-semibold uppercase tracking-widest hover:bg-[#745a2f] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            {isSubmitting ? (
              <span>Sending note...</span>
            ) : (
              <>
                <span>Send Message</span>
                <span className="text-[#fedaa4]">✦</span>
              </>
            )}
          </button>

        </form>

        {isSubmitted && (
          <div className="mt-4 p-4 bg-[#f8f3ea] rounded-xl border border-[#D8C8AE] text-center space-y-1 animate-in fade-in">
            <span className="material-symbols-outlined text-[24px] text-[#745a2f]">check_circle</span>
            <h4 className="font-serif text-sm font-semibold text-[#171513]">Message Received</h4>
            <p className="text-xs text-[#4c4640]">
              Thank you for reaching out. A Simply Styld personal shopper will be in touch shortly.
            </p>
          </div>
        )}
      </section>

      {/* Flagship Studio */}
      <section className="bg-[#f8f3ea] rounded-2xl p-5 sm:p-6 border border-[#D8C8AE]/60 space-y-3">
        <div className="flex items-center gap-2 text-[#745a2f]">
          <span className="material-symbols-outlined text-[20px]">storefront</span>
          <span className="text-[10px] uppercase tracking-widest font-semibold">Flagship Studio</span>
        </div>
        <h3 className="font-serif text-xl text-[#171513]">Khar Atelier</h3>

        <div className="space-y-2 text-xs text-[#4c4640]">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[17px] text-[#745a2f] shrink-0 mt-0.5">location_on</span>
            <p>42, Heritage Boulevard, Khar West, Mumbai — 400052</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[17px] text-[#745a2f] shrink-0 mt-0.5">schedule</span>
            <div>
              <p className="font-medium text-[#171513]">Visiting Hours</p>
              <p>Monday to Saturday: 10:00 AM – 7:00 PM IST</p>
              <p className="text-[#8C827A]">Sunday: Closed (Private Bookings Only)</p>
            </div>
          </div>
        </div>

        {/* Map Preview */}
        <div className="relative rounded-xl overflow-hidden shadow-xs border border-[#D8C8AE]/50 mt-2">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMKALru2dY8f-yc8j0PI6BDT9ZcnIjo7vtQfJzK-6TQz7McyIxyABruLs1PxIvvXiNV7POQI4hsdagrAGIvlSCag1YKqS5AOuW4JegYFBn7h9k4aacvS5WynV-cqWQkGR5uV-o_HIm_0IpBPUb9I8nwO-Fo_SQX7ksYA0f_J7bhNuyyASJhBdVO-vxAoqidqdLzRMTwR0shPS4ouWPIbSkUauuie1YBWx0_AOZts6VRc5eamIA342SYw"
            alt="Studio Location Khar Mumbai"
            className="w-full h-36 object-cover"
          />
          <a
            href="https://maps.google.com/?q=Khar+West+Mumbai"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 bg-[#171513]/90 hover:bg-[#171513] text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm backdrop-blur-xs transition-colors"
          >
            <span>Directions</span>
            <span className="material-symbols-outlined text-[14px]">near_me</span>
          </a>
        </div>
      </section>

      {/* Frequently Asked Accordion */}
      <section className="space-y-3">
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-widest text-[#745a2f] font-semibold">
            Self Service
          </span>
          <h2 className="font-serif text-2xl text-[#171513] mt-0.5">Frequently Asked</h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#FCFAF6] rounded-xl overflow-hidden border border-[#D8C8AE]/50 shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs font-semibold text-[#171513]"
              >
                <span>{faq.q}</span>
                <span className="material-symbols-outlined text-[18px] text-[#745a2f]">
                  {openFaq === idx ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-[#4c4640] leading-relaxed border-t border-[#D8C8AE]/30 pt-2 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
