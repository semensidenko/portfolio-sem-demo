"use client";

import { useEffect, useState } from "react";
import { Button } from "../Button/Button";

/**
 * Кнопка запиту в шапці (комп'ютер). Якщо задано `revealAfterId`, вона з'являється,
 * лише коли елемент з цим id (кнопка першого екрана) прокручено вище екрана.
 * Без `revealAfterId` або якщо такого елемента немає — видна завжди.
 */
export function HeaderCta({ label, href, revealAfterId }: { label: string; href: string; revealAfterId?: string }) {
  const [visible, setVisible] = useState(!revealAfterId);

  useEffect(() => {
    if (!revealAfterId) return;
    const target = document.getElementById(revealAfterId);
    if (!target) {
      // Кнопки першого екрана на сторінці немає — показуємо кнопку шапки.
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [revealAfterId]);

  return (
    <div className={visible ? "hidden desk:block" : "hidden"}>
      <Button href={href}>{label}</Button>
    </div>
  );
}
