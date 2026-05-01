import { useState } from "react";
import {
  contactDetails,
  gymGallery,
  gymHighlights,
  gymMembershipPlans
} from "../data/siteContent";
import { isApiConfigured, submitEnquiry } from "../services/api";
import AssetImage from "../components/ui/AssetImage";

const initialEnquiry = {
  name: "",
  phone: "",
  email: "",
  interest: "Membership",
  message: ""
};

export default function Gym() {
  const [form, setForm] = useState(initialEnquiry);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setFeedback("Name and phone are required for gym enquiries.");
      return;
    }

    setSubmitting(true);
    setFeedback("");

    try {
      if (isApiConfigured()) {
        await submitEnquiry(form);
        setFeedback("Enquiry sent successfully.");
      } else {
        setFeedback(
          "Frontend form is ready. Connect /api/enquiry to send live gym enquiries."
        );
      }
      setForm(initialEnquiry);
    } catch (error) {
      setFeedback(error.message || "Enquiry could not be submitted.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="page-shell">
      <div className="gym-hero">
        <div className="shell">
          <div className="gym-hero-layout">
            <div className="gym-hero-copy">
              <span className="section-kicker section-kicker-light">
                Fitness Fort
              </span>
              <h1>Part of the NUTRIRICH family</h1>
              <p>
                A community-first gym in Bibvewadi, Pune with strength, conditioning,
                and guided support for everyday members.
              </p>
              <div className="gym-meta">
                <span>Bibvewadi, Pune</span>
                <span>4.6 rating</span>
                <span>Open till 10 PM</span>
              </div>
            </div>

            <div className="gym-hero-media-shell">
              <AssetImage
                src="/gym/fitness-fort-hero.jpg"
                alt="Fitness Fort gym"
                className="gym-hero-image"
                fallback={
                  <div className="gym-hero-fallback">
                    <span>Fitness Fort</span>
                    <strong>Strength. Conditioning. Community.</strong>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="shell page-stack">
        <section className="content-card" id="overview">
          <h2>About Fitness Fort</h2>
          <p>
            Fitness Fort combines practical training spaces with an approachable
            environment. Members can move between supplement advice and training
            support without feeling sold to.
          </p>
          <div className="highlight-list">
            {gymHighlights.map((item) => (
              <div key={item} className="highlight-item">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="content-card" id="membership">
          <div className="section-heading shellless">
            <div>
              <span className="section-kicker">Membership</span>
              <h2>Choose a Fitness Fort membership</h2>
            </div>
          </div>
          <div className="membership-card">
            <div className="membership-card-head">
              <span>Gym Membership</span>
              <strong>Simple local pricing</strong>
            </div>
            <div className="membership-table">
              {gymMembershipPlans.map((plan) => (
                <div key={plan.label} className="membership-row">
                  <span>{plan.label}</span>
                  <strong>{plan.price}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="facilities">
          <div className="section-heading shellless">
            <div>
              <span className="section-kicker">Gallery</span>
              <h2>Spaces built for real training</h2>
            </div>
          </div>
          <div className="gym-gallery">
            {gymGallery.map((item, index) => (
              <article key={item} className="gallery-card">
                <AssetImage
                  src={`/gym/gym-photo-${index + 1}.jpg`}
                  alt={item}
                  className="gallery-image"
                  fallback={
                    <div className="gallery-image-fallback">
                      <span>0{index + 1}</span>
                      <strong>{item}</strong>
                    </div>
                  }
                />
                <div className="gallery-copy">
                  <span>0{index + 1}</span>
                  <strong>{item}</strong>
                  <p>Fitness Fort training environment.</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-card" id="location">
          <h2>Find us</h2>
          <div className="map-frame">
            <iframe
              title="Fitness Fort map"
              src={contactDetails.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className="content-card" id="enquiry">
          <div className="section-heading shellless">
            <div>
              <span className="section-kicker">Enquiry form</span>
              <h2>Ask about memberships or training</h2>
            </div>
          </div>
          <form className="gym-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Name *
                <input name="name" value={form.name} onChange={updateField} />
              </label>
              <label>
                Phone *
                <input name="phone" value={form.phone} onChange={updateField} />
              </label>
              <label>
                Email
                <input name="email" value={form.email} onChange={updateField} />
              </label>
              <label>
                Interest
                <select
                  name="interest"
                  value={form.interest}
                  onChange={updateField}
                >
                  <option>Membership</option>
                  <option>Personal training</option>
                  <option>CrossFit</option>
                  <option>Women&apos;s batch</option>
                </select>
              </label>
              <label className="full-span">
                Message
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={updateField}
                />
              </label>
            </div>
            {feedback ? <p className="form-feedback">{feedback}</p> : null}
            <div className="contact-actions">
              <button type="submit" className="button button-primary" disabled={submitting}>
                {submitting ? "Sending..." : "Send enquiry"}
              </button>
              <a
                className="button button-success"
                href={`https://wa.me/${contactDetails.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp us
              </a>
              <a className="button button-secondary" href={`tel:${contactDetails.phone}`}>
                Call now
              </a>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
}
