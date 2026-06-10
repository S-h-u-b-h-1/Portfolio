import { useEffect, useRef } from "react";

export function InteractiveCursor() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outerX = mouseX;
    let outerY = mouseY;
    let animationFrameId: number;

    const o = outer as HTMLDivElement;
    const i = inner as HTMLDivElement;

    // Set initial position immediately
    o.style.transform = `translate3d(${outerX}px, ${outerY}px, 0)`;
    i.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      i.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }

    function render() {
      // Lerp logic for smooth lag effect
      outerX += (mouseX - outerX) * 0.15;
      outerY += (mouseY - outerY) * 0.15;
      
      // We don't need translate(-50%, -50%) here because the inner shape will handle centering
      o.style.transform = `translate3d(${outerX}px, ${outerY}px, 0)`;
      
      animationFrameId = requestAnimationFrame(render);
    }
    render();

    function onPointerEnter() {
      o.classList.add("cursor-active");
      i.classList.add("cursor-active-inner");
    }

    function onPointerLeave() {
      o.classList.remove("cursor-active");
      i.classList.remove("cursor-active-inner");
    }

    function onOver(e: Event) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName?.toLowerCase();
      if (tag === "a" || target.closest("button") || target.getAttribute("role") === "button") {
        o.classList.add("cursor-hover");
        i.classList.add("cursor-hover-inner");
      }
    }

    function onOut(e: Event) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.tagName?.toLowerCase() === "a" || target.closest("button") || target.getAttribute("role") === "button") {
        o.classList.remove("cursor-hover");
        i.classList.remove("cursor-hover-inner");
      }
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("pointerenter", onPointerEnter);
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointerenter", onPointerEnter);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="custom-cursor-outer" aria-hidden>
        <div className="custom-cursor-outer-shape" />
      </div>
      <div ref={innerRef} className="custom-cursor-inner" aria-hidden />
    </>
  );
}

export default InteractiveCursor;
