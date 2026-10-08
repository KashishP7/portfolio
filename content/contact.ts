export type ContactCopy = {
  // Two lines; the second is Newsreader italic in --accent.
  heading: { first: string; second: string };
  line: string;
  // Each form text is used as both the field's placeholder and its
  // (visually hidden) label.
  form: {
    name: string;
    email: string;
    message: string;
    submit: string;
  };
};

export const contact: ContactCopy = {
  heading: { first: "Let's build", second: "something." },
  line: "Open to software engineering roles, and always happy to talk about products worth building.",
  form: {
    name: "Name",
    email: "Email",
    message: "What are you building?",
    submit: "Send message",
  },
};
