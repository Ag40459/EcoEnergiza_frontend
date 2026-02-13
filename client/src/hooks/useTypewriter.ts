import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  messages: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
}

export function useTypewriter({
  messages,
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseAfterType = 3000,
  pauseAfterDelete = 500,
}: UseTypewriterOptions) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentMessage = messages[currentMessageIndex];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping && !isDeleting) {
      if (displayedText.length < currentMessage.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentMessage.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
          setIsTyping(false);
        }, pauseAfterType);
      }
    } else if (isDeleting) {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deletingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setIsTyping(true);
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }, pauseAfterDelete);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isTyping,
    isDeleting,
    currentMessage,
    messages.length,
    typingSpeed,
    deletingSpeed,
    pauseAfterType,
    pauseAfterDelete,
  ]);

  return { displayedText, isTyping: isTyping || isDeleting };
}
