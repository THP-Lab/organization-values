"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import ArrowIcon from "../icons/ArrowIcon";

import styles from "./carousel.module.scss";

// Définir l'interface pour les props du Carousel
interface CarouselProps {
  children: ReactNode;
  className?: string;
}

const Carousel = ({ children, className }: CarouselProps) => {
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef(null);

  const updateNav = () => {
    if (!trackRef.current || !carouselRef.current) {
      return;
    }
    const track = trackRef.current;

    const inViewElements = track.querySelectorAll("[data-in-view='true']");
    if (!inViewElements.length) {
      setNextDisabled(true);
      setPrevDisabled(true);
      return;
    }
    const firstInViewElement = inViewElements[0];
    const lastInViewElement = inViewElements[inViewElements.length - 1];

    setPrevDisabled(!firstInViewElement.previousElementSibling);
    setNextDisabled(!lastInViewElement.nextElementSibling);
  };

  useEffect(() => {
    if (!trackRef.current || !carouselRef.current) {
      return;
    }

    const track = trackRef.current;
    const carousel = carouselRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in-view", "true");
          } else {
            entry.target.setAttribute("data-in-view", "false");
          }
        });
        updateNav();
      },
      {
        root: carousel,
        threshold: 0.5,
      }
    );

    Array.from(track.children).forEach((child) => observer.observe(child));

    return () => {
      observer.disconnect();
    };
  }, [children]);

  const next = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const inViewElements = track.querySelectorAll("[data-in-view='true']");
    if (!inViewElements.length) {
      return;
    }

    const lastInViewElement = inViewElements[inViewElements.length - 1];
    const nextElement = lastInViewElement.nextElementSibling;

    if (nextElement) {
      nextElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const previous = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const inViewElements = track.querySelectorAll("[data-in-view='true']");
    if (!inViewElements.length) {
      return;
    }

    const firstInViewElement = inViewElements[0];
    const prevElement = firstInViewElement.previousElementSibling;

    if (prevElement) {
      prevElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div className={`${styles.carouselWrapper} ${className}`}>
      <div className={styles.carousel} ref={carouselRef}>
        <div className={styles.track} ref={trackRef}>
          {children}
        </div>
      </div>
      <div className={`${styles.navigation}`}>
        <button
          className={`${styles.prev} ${prevDisabled ? styles.disabled : ""}`}
          onClick={previous}
          disabled={prevDisabled}
        >
          <ArrowIcon />
        </button>
        <button
          className={`${styles.next} ${nextDisabled ? styles.disabled : ""}`}
          onClick={next}
          disabled={nextDisabled}
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
