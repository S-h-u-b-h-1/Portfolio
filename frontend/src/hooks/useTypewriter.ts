import { useState, useEffect } from "react";

export function useTypewriter(texts: string[], speed = 100, pause = 2000) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleType = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];

      setText((current) =>
        isDeleting ? fullText.substring(0, current.length - 1) : fullText.substring(0, current.length + 1)
      );

      setTypingSpeed(isDeleting ? speed / 2 : speed);

      if (!isDeleting && text === fullText) {
        timer = setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = setTimeout(() => {}, 500); // tiny pause before typing next
      } else {
        timer = setTimeout(handleType, typingSpeed);
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, speed, pause, texts, typingSpeed]);

  return text;
}
