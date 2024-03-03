import React from "react";
import style from "./circle.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

type CircleProps = {
  icon: string;
  iconSize: number;
  circleSize: number;
  borderWidth: number;
  bottomShadowOffset: number;
  onSelect?: () => void;
  gradientStartColor: string;
  gradientEndColor: string;
  showWave?: boolean;
  waveWidth?: number;
};

const Circle = ({
  icon,
  iconSize,
  circleSize,
  borderWidth,
  bottomShadowOffset,
  gradientStartColor,
  gradientEndColor,
  onSelect,
  showWave,
  waveWidth = 70,
}: CircleProps) => {
  const circleStyle = {
    width: circleSize + "px",
    height: circleSize + "px",
    backgroundImage: `linear-gradient(to bottom, ${gradientStartColor}, ${gradientEndColor})`,
  };

  return (
    <div
      className={`${style.circle_button} flex justify-center items-center cursor-pointer relative`}
      style={circleStyle}
      onClick={onSelect}>
      <div
        className={`bg-white rounded-full`}
        style={{
          height: `${circleSize - borderWidth}px`,
          width: `${circleSize - borderWidth}px`,
        }}
      />
      <span className={`absolute z-10`}>
        <Image
          src={icon}
          alt="logo"
          height={iconSize}
          width={iconSize}
          className={`h-[${iconSize}px] w-[${iconSize}px] object-contain`}
        />
      </span>
      <style jsx>{`
        .${style.circle_button}::after {
          background-color: ${gradientEndColor};
          width: ${circleSize}px;
          height: ${circleSize}px;
          top: ${bottomShadowOffset}px;
        }
      `}</style>
      <style jsx>{`
        .${style.circle_button}::before {
          width: ${circleSize - borderWidth + 1}px;
          height: ${circleSize - borderWidth + 1}px;
        }
      `}</style>
      {showWave ? (
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          initial="hidden"
          animate="show"
          className="absolute size-[100px] cursor-default">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            className="absolute bg-red-100/[0.03] rounded-full left-[50%] bottom-[50%] translate-y-1/2 -translate-x-1/2"
            style={{
              height: `${circleSize + waveWidth}px`,
              width: `${circleSize + waveWidth}px`,
            }}
          />
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            className="absolute bg-red-100/[0.03] rounded-full left-[50%] bottom-[50%] translate-y-1/2 -translate-x-1/2"
            style={{
              height: `${circleSize + waveWidth * 2}px`,
              width: `${circleSize + waveWidth * 2}px`,
            }}
          />
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            className="absolute bg-red-100/[0.03] rounded-full left-[50%] bottom-[50%] translate-y-1/2 -translate-x-1/2"
            style={{
              height: `${circleSize + waveWidth * 3}px`,
              width: `${circleSize + waveWidth * 3}px`,
            }}
          />
        </motion.div>
      ) : null}
    </div>
  );
};

export default Circle;
