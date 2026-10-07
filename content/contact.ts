export type ContactCopy = {
  heading: string;
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
  heading: "Let's build something.",
  line: "Open to software engineering roles, and always happy to talk about products worth building.",
  form: {
    name: "Name",
    email: "Email",
    message: "What are you building?",
    submit: "Send message",
  },
};
