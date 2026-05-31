import { useEffect, useRef } from "react";

type KeyboardShortcutHandlers = {
  onHome: () => void;
  onProjects: () => void;
  onAskAI: () => void;
  onContact: () => void;
  onCommandPalette: () => void;
  onShortcuts: () => void;
};

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();
  return tagName === "input" || tagName === "textarea" || tagName === "select" || target.isContentEditable;
}

export function useKeyboardShortcuts({
  onHome,
  onProjects,
  onAskAI,
  onContact,
  onCommandPalette,
  onShortcuts
}: KeyboardShortcutHandlers) {
  const sequenceRef = useRef("");
  const resetTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const resetSequence = () => {
      sequenceRef.current = "";
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }

      const key = event.key.toLowerCase();

      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        resetSequence();
        onCommandPalette();
        return;
      }

      if (event.key === "?") {
        event.preventDefault();
        resetSequence();
        onShortcuts();
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (key === "g") {
        event.preventDefault();
        sequenceRef.current = "g";
        if (resetTimerRef.current) {
          window.clearTimeout(resetTimerRef.current);
        }
        resetTimerRef.current = window.setTimeout(resetSequence, 1200);
        return;
      }

      if (sequenceRef.current === "g") {
        const shortcutMap: Record<string, () => void> = {
          h: onHome,
          p: onProjects,
          a: onAskAI,
          c: onContact
        };

        const action = shortcutMap[key];
        if (action) {
          event.preventDefault();
          action();
        }
        resetSequence();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, [onAskAI, onCommandPalette, onContact, onHome, onProjects, onShortcuts]);
}

