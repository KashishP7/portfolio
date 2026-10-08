import type {
  ConnectXIllustration,
  DocSearchIllustration,
  ProjectIllustration,
  WaitingRoomIllustration,
} from "@/content/projects";

// The small drawing on the front of a project card. `kind` decides which one
// is drawn; inside each `case`, TypeScript knows exactly which fields exist.
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

// Shared frame. aria-hidden: the drawing is a visual example, and the card's
// summary already describes the product for screen readers.
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="flex min-h-52 flex-col justify-center rounded-2xl border border-border bg-inset p-4 text-sm sm:p-6"
    >
      {children}
    </div>
  );
}

function DocSearchArt({ art }: { art: DocSearchIllustration }) {
  return (
    <Panel>
      <p className="flex items-center gap-2 text-xs text-muted">
        <span className="h-4 w-3 rounded-[3px] border border-muted" />
        {art.file}
      </p>
      <p className="mt-4 max-w-[85%] self-end rounded-2xl rounded-br-md bg-card-hover px-4 py-2.5 text-text">
        {art.question}
      </p>
      <div className="mt-3 max-w-[90%] rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3">
        <p className="text-text-soft">{art.answer}</p>
        <p className="mt-2.5 w-fit rounded-full border border-accent/30 px-2.5 py-0.5 text-xs text-accent">
          {art.source}
        </p>
      </div>
    </Panel>
  );
}

function ConnectXArt({ art }: { art: ConnectXIllustration }) {
  return (
    <Panel>
      <p className="max-w-[90%] self-start rounded-2xl rounded-bl-md border border-border bg-card px-4 py-2.5 text-text-soft">
        {art.comment}
      </p>
      <p className="mt-3 max-w-[90%] self-end rounded-2xl rounded-br-md bg-accent/15 px-4 py-2.5 text-accent">
        {art.reply}
      </p>
      <p className="mt-4 flex items-center gap-2 text-xs text-muted">
        <span className="size-1.5 rounded-full bg-live" />
        {art.caption}
      </p>
    </Panel>
  );
}

function WaitingRoomArt({ art }: { art: WaitingRoomIllustration }) {
  return (
    <Panel>
      <div className="flex flex-col gap-2">
        {art.queue.map((row, index) => {
          const isNext = index === 0;
          return (
            <div
              key={row.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3"
            >
              <span className={isNext ? "text-text" : "text-text-soft"}>{row.label}</span>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  isNext ? "bg-accent/15 text-accent" : "bg-card-hover text-muted"
                }`}
              >
                {row.position}
              </span>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
