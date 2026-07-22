import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact information, address, and directions for i-NEXT at IIT Patna.',
};

export default function ContactPage() {
  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Reach out for research collaborations, student inquiries, or general information.</p>
        </div>
      </div>

      <main className="main-content" id="main">
        <div className="container">
          <div className="contact-grid">

            {/* Contact details */}
            <div className="contact-info">
              <h2>Lab Address</h2>
              <address>
                <strong>i-NEXT Research Lab</strong><br />
                304-A, Block 2, Department of Computer Science<br />
                Indian Institute of Technology Patna<br />
                Bihta, Patna – 801106<br />
                Bihar, India
              </address>

              <h2 className="mt-3">Get in Touch</h2>
              <address>
                <strong>Lead</strong><br />
                Dr. Arijit Roy<br />
                <a href="mailto:arijitroy@iitp.ac.in">arijitroy@iitp.ac.in</a>
                <br /><br />
                <strong>Lab Email</strong><br />
                <a href="mailto:inextiitpatna@gmail.com">inextiitpatna@gmail.com</a>
                <br /><br />
                <strong>Phone</strong><br />
                +91-9475364212
              </address>

              <h2 className="mt-3">Prospective Students</h2>
              <address>
                Interested in joining i-NEXT as a PhD scholar, M.Tech student, or research intern?
                Please email your CV and a brief research statement to{' '}
                <a href="mailto:inextiitpatna@gmail.com">inextiitpatna@gmail.com</a>{' '}
                with the subject line <em>&quot;Lab Inquiry – [Your Name]&quot;</em>.
              </address>

              <h2 className="mt-3">Quick Links</h2>
              <address>
                <a href="https://www.iitp.ac.in/index.php/en-us/departments/computer-science-engineering" target="_blank" rel="noopener">
                  Dept. of CSE, IIT Patna
                </a><br />
                <Link href="/members">Lab Members</Link><br />
                <Link href="/publications">Publications</Link><br />
                <Link href="/projects">Research Projects</Link>
              </address>
            </div>

            {/* Map */}
            <div className="contact-map">
              <h2>Location</h2>
              {/*
                Replace the src with your actual Google Maps embed URL.
                Maps → search your institute → Share → Embed a map → copy iframe src.
              */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.9!2d84.83383!3d25.57148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2a5e0e80f03a7%3A0x7d90a2bae3f2a5b0!2sIndian%20Institute%20of%20Technology%20Patna!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="360"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map showing location of IIT Patna"
              />
              <p className="mt-1" style={{ fontSize: '0.85rem', color: 'var(--color-accent)' }}>
                IIT Patna, Bihta, Patna, Bihar – 801106, India.{' '}
                <a
                  href="https://maps.app.goo.gl/4MRH2ZpRqai7U3sbA"
                  target="_blank"
                  rel="noopener"
                >
                  Open in Google Maps →
                </a>
              </p>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
