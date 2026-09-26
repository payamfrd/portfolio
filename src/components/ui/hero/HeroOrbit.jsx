"use client";

import { useEffect, useState } from "react";

import { FaReact, FaJsSquare, FaGitAlt, FaNetworkWired } from "react-icons/fa";

import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";

const ICONS = [
  {
    Icon: FaReact,
    color: "#61DAFB",
    angle: 0,
  },
  {
    Icon: RiNextjsFill,
    color: "#ffffff",
    angle: 60,
  },
  {
    Icon: FaJsSquare,
    color: "#F7DF1E",
    angle: 120,
  },
  {
    Icon: RiTailwindCssFill,
    color: "#38BDF8",
    angle: 180,
  },
  {
    Icon: FaGitAlt,
    color: "#F05032",
    angle: 240,
  },
  {
    Icon: FaNetworkWired,
    color: "#7C3AED",
    angle: 300,
  },
];

const DEFAULT_RADIUS = 260;

function getOrbitRadius(width) {
  if (width < 640) {
    return 85;
  }

  if (width < 1024) {
    return 155;
  }

  if (width < 1440) {
    return 230;
  }

  return 260;
}

export default function HeroOrbit() {
  const [radius, setRadius] = useState(DEFAULT_RADIUS);

  useEffect(() => {
    const updateRadius = () => {
      setRadius(getOrbitRadius(window.innerWidth));
    };

    updateRadius();

    window.addEventListener("resize", updateRadius);

    return () => {
      window.removeEventListener("resize", updateRadius);
    };
  }, []);

  return (
    <>
      <style>{`
        .hero-orbit {
          animation: hero-orbit-rotation 35s linear infinite;
          transform-origin: center center;
          will-change: transform;
        }

        .hero-orbit-icon {
          animation: hero-orbit-counter-rotation 35s linear infinite;
          will-change: transform;
        }

        @keyframes hero-orbit-rotation {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes hero-orbit-counter-rotation {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(-360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-orbit,
          .hero-orbit-icon {
            animation: none;
          }
        }
      `}</style>

      <div
        dir="ltr"
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          mx-auto
          block
          aspect-square
          w-full
          max-w-[700px]
          opacity-20
          sm:opacity-35
          md:opacity-50
          xl:opacity-60
        "
      >
        <div className="hero-orbit absolute inset-0">
          {ICONS.map(({ Icon, color, angle }) => {
            const radians = (angle * Math.PI) / 180;

            const x = Math.round(Math.cos(radians) * radius * 1000) / 1000;

            const y = Math.round(Math.sin(radians) * radius * 1000) / 1000;

            return (
              <div
                key={angle}
                className="
                  absolute
                  left-1/2
                  top-1/2
                "
                style={{
                  transform: `
                    translate(
                      calc(-50% + ${x}px),
                      calc(-50% + ${y}px)
                    )
                  `,
                }}
              >
                <div
                  className="
                    hero-orbit-icon
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--border)]
                    bg-[var(--card)]/80
                    shadow-lg
                    backdrop-blur-lg
                    md:h-12
                    md:w-12
                    lg:h-14
                    lg:w-14
                  "
                >
                  <Icon
                    className="
                      pointer-events-none
                      text-xl
                      drop-shadow-md
                      md:text-2xl
                    "
                    color={color}
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
