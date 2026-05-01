import { useState } from "react";
import { contactDetails } from "../data/siteContent";

const initialContact = {
  name: "",
  email: "",
  message: ""
};

export default function Contact() {
  const [form, setForm] = useState(initialContact);
  const [submitted, setSubmitted] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialContact);
  }

  return (
    <section className="page-shell shell page-stack">
      <div className="page-intro">
        <span className="section-kicker">Contact</span>
        <h1>Reach the store, gym, or partnership team</h1>
        <p>
          This page is frontend-ready for a future backend contact workflow, but
          the current build already includes direct call and WhatsApp actions.
        </p>
      </div>

      <div className="two-column-copy">
        <article className="content-card">
          <h2>Storefront</h2>
          <p>{contactDetails.address}</p>
          <p>{contactDetails.phone}</p>
          <p>{contactDetails.email}</p>
        </article>

        <article className="content-card">
          <h2>Quick actions</h2>
          <div className="contact-actions">
            <a className="button button-primary" href={`tel:${contactDetails.phone}`}>
              Call the team
            </a>
            <a
              className="button button-success"
              href={`https://wa.me/${contactDetails.whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </article>
      </div>

      <section className="content-card">
        <h2>Send a message</h2>
        <form className="gym-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Name
              <input name="name" value={form.name} onChange={updateField} />
            </label>
            <label>
              Email
              <input name="email" value={form.email} onChange={updateField} />
            </label>
            <label className="full-span">
              Message
              <textarea
                rows="5"
                name="message"
                value={form.message}
                onChange={updateField}
              />
            </label>
          </div>
          {submitted ? (
            <p className="form-feedback">
              Message captured in frontend preview mode. Wire this to your
              backend contact endpoint when ready.
            </p>
          ) : null}
          <button className="button button-primary" type="submit">
            Send message
          </button>
        </form>
      </section>
    </section>
  );
}
