import { contact } from "@/content/contact";

const fieldClasses =
  "w-full rounded-xl border border-border bg-inset px-4 py-3 text-text placeholder:text-muted transition-colors hover:border-border-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// Form UI only. Sending comes in M8: the button is type="button" so it
// can't submit (or reload the page) yet. With no submit button, pressing
// Enter in a field doesn't submit either.
export function ContactForm() {
  const { form } = contact;

  return (
    <form className="flex flex-col gap-4">
      {/* Each field has a label for screen readers (sr-only hides it
          visually); the placeholder shows the same text on screen. */}
      <label htmlFor="contact-name" className="sr-only">
        {form.name}
      </label>
      <input
        id="contact-name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder={form.name}
        className={fieldClasses}
      />

      <label htmlFor="contact-email" className="sr-only">
        {form.email}
      </label>
      <input
        id="contact-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder={form.email}
        className={fieldClasses}
      />

      <label htmlFor="contact-message" className="sr-only">
        {form.message}
      </label>
      <textarea
        id="contact-message"
        name="message"
        rows={5}
        placeholder={form.message}
        className={`${fieldClasses} resize-y`}
      />

      <button
        type="button"
        className="mt-2 self-start rounded-full bg-accent px-6 py-3 font-semibold text-bg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {form.submit}
      </button>
    </form>
  );
}
