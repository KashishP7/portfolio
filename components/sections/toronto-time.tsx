"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Toronto",
  hour: "numeric",
  minute: "2-digit",
});

// Ask React to re-read the time every second. React only re-renders when
// the text actually changes, so this updates once a minute in practice.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

function getTime() {
  return formatter.format(new Date());
}

// The page is pre-rendered at build time, so the server can't know the
// current time. It renders nothing and the browser fills it in.
function getServerTime() {
  return null;
}

export function TorontoTime() {
  const time = useSyncExternalStore(subscribe, getTime, getServerTime);
  return <span className="tabular-nums">{time}</span>;
}
