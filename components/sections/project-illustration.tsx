import type {
  ConnectXIllustration,
  DocSearchIllustration,
  ProjectIllustration,
  WaitingRoomIllustration,
} from "@/content/projects";

// The small animated drawing on the front of a project card. `kind` decides
// which one is drawn; inside each `case`, TypeScript knows exactly which
// fields exist. The loops are CSS keyframes ("Living project cards" in
// globals.css). Each element's normal, unanimated style is its final state,
// so reduced motion (animations off) simply shows the finished picture.
export function Illustration({ illustration }: { illustration: ProjectIllustration }) {
  switch (illustration.kind) {
    case "docsearch":
      return <DocSearchArt art={illustration} />;
    case "connectx":
      return <ConnectXArt art={illustration} />;
    case "waiting-room":
      return <WaitingRoomArt art={illustration} />;
  }
}

// Shared frame, the same minimum height for every project so the panels
// line up side by side (content is centered inside). aria-hidden: the drawing is a visual example, and the card's
// summary already describes the product for screen readers. data-loop lets
// LoopPlayer pause the animations while the card is off screen.
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      data-loop
      className="flex min-h-64 flex-col justify-center rounded-2xl border border-border bg-inset p-4 text-sm sm:p-6"
    >
      {children}
    </div>
  );
}

const TYPE_START = 500; // ms before the question starts typing
const TYPE_SPEED = 25; // ms per character

// ~9s loop: question types out, typing dots, answer slides up, source pops.
function DocSearchArt({ art }: { art: DocSearchIllustration }) {
  return (
    <Panel>
      <p className="flex items-center gap-2 text-xs text-muted">
        <span className="h-4 w-3 rounded-[3px] border border-muted" />
        {art.file}
      </p>
      <p className="ds-question mt-4 max-w-[85%] self-end rounded-2xl rounded-br-md bg-card-hover px-4 py-2.5 text-text">
        {[...art.question].map((char, index) => (
          <span
            key={index}
            className="ds-char"
            style={{ animationDelay: `${TYPE_START + index * TYPE_SPEED}ms` }}
          >
            {char}
          </span>
        ))}
      </p>
      {/* The typing dots and the answer share one grid cell, so swapping
          them doesn't move anything. */}
      <div className="mt-3 grid">
        <div className="ds-typing flex w-fit gap-1 self-start rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3 [grid-area:1/1]">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="ds-dot size-1.5 rounded-full bg-muted"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
        <div className="ds-answer max-w-[90%] rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3 [grid-area:1/1]">
          <p className="text-text-soft">{art.answer}</p>
          <p className="ds-source mt-2.5 w-fit rounded-full border border-accent/30 px-2.5 py-0.5 text-xs text-accent">
            {art.source}
          </p>
        </div>
      </div>
    </Panel>
  );
}

// ~7s loop: comment, keyword chip, reply from the right, "replied" line.
function ConnectXArt({ art }: { art: ConnectXIllustration }) {
  return (
    <Panel>
      <p className="cx-comment max-w-[90%] self-start rounded-2xl rounded-bl-md border border-border bg-card px-4 py-2.5 text-text-soft">
        {art.comment}
      </p>
      <p className="cx-keyword mt-3 w-fit self-center rounded-full border border-dashed border-accent/60 px-3 py-1 text-xs text-accent">
        {art.keyword}
      </p>
      <p className="cx-reply mt-3 max-w-[90%] self-end rounded-2xl rounded-br-md bg-accent/15 px-4 py-2.5 text-accent">
        {art.reply}
      </p>
      <p className="cx-caption mt-4 flex items-center gap-2 text-xs text-muted">
        <span className="size-1.5 rounded-full bg-live" />
        {art.caption}
      </p>
    </Panel>
  );
}

// ~6s loop: an urgent patient arrives at the bottom and moves to the front
// while the two waiting patients shift down. Rows move between three fixed
// slots (--slot apart); the position labels on the right never move.
function WaitingRoomArt({ art }: { art: WaitingRoomIllustration }) {
  const row =
    "absolute inset-x-0 top-0 flex h-11 items-center rounded-xl border bg-card pr-20 pl-4";
  return (
    <Panel>
      <div className="relative h-[calc(var(--slot)*2+2.75rem)] [--slot:3.25rem]">
        <div className={`wr-first ${row} border-border text-text-soft`}>{art.waiting[0]}</div>
        <div className={`wr-second ${row} border-border text-text-soft`}>{art.waiting[1]}</div>
        <div className={`wr-urgent ${row} border-accent/60 text-text`}>{art.arrival}</div>

        {art.positions.map((position, slot) => (
          <span
            key={position}
            className="absolute right-4 flex h-11 items-center"
            style={{ top: `calc(var(--slot) * ${slot})` }}
          >
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                slot === 0 ? "bg-live/15 text-live" : "bg-card-hover text-muted"
              }`}
            >
              {position}
            </span>
          </span>
        ))}
      </div>
    </Panel>
  );
}
