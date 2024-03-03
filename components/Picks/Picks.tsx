import React, { useEffect, useState } from "react";
import Circle from "../Circle";
import paper from "../../public/images/icon-paper.svg";
import scissors from "../../public/images/icon-scissors.svg";
import rock from "../../public/images/icon-rock.svg";
import { motion } from "framer-motion";

const PICKS = [
  {
    label: "rock",
    icon: rock,
    circleColor: "red",
    gradientStartColor: "hsl(349, 71%, 52%)",
    gradientEndColor: "hsl(349, 70%, 56%)",
  },
  {
    label: "paper",
    icon: paper,
    circleColor: "cyan",
    gradientStartColor: "hsl(230, 89%, 62%)",
    gradientEndColor: "hsl(230, 89%, 65%)",
  },
  {
    label: "scissor",
    icon: scissors,
    circleColor: "orange",
    gradientStartColor: "hsl(39, 89%, 49%)",
    gradientEndColor: "hsl(40, 84%, 53%)",
  },
];

const WIN_CONDITIONS = ["0b2", "1b0", "2b1"];

type PicksProps = {
  userPick: number;
  updateScore: (resut: string) => void;
  playAgain: () => void;
};
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const Picks = ({ userPick, updateScore, playAgain }: PicksProps) => {
  const [housePick, setHouserPick] = useState<number | null>(null);
  const [matchResult, setMatchResult] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const number = getRandomNumber(0, 2);
      if (userPick === number) {
        setMatchResult("Draw");
      } else if (WIN_CONDITIONS.includes(`${userPick}b${number}`)) {
        setMatchResult("YOU WIN");
        updateScore("win");
      } else {
        setMatchResult("YOU LOSE");
        updateScore("lose");
      }
      setHouserPick(number);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [updateScore, userPick]);

  return (
    <>
      <div className="flex justify-around gap-4 w-[90%] max-w-[750px] items-center text-white text-[12px] md:text-lg mt-16 md:mt-24 h-fit">
        <div className=" flex flex-col h-full items-start md:min-w-[180px] ">
          <div className="flex flex-col md:flex-col-reverse gap-8 md:gap-12 items-center ">
            <span className="md:hidden">
              <Circle
                iconSize={45}
                circleSize={120}
                borderWidth={25}
                bottomShadowOffset={5}
                icon={PICKS[userPick].icon}
                gradientStartColor={PICKS[userPick].gradientStartColor}
                gradientEndColor={PICKS[userPick].gradientEndColor}
                showWave={matchResult === "YOU WIN"}
                waveWidth={50}
              />
            </span>
            <span className="hidden md:block">
              <Circle
                iconSize={55}
                circleSize={160}
                borderWidth={35}
                bottomShadowOffset={8}
                icon={PICKS[userPick].icon}
                gradientStartColor={PICKS[userPick].gradientStartColor}
                gradientEndColor={PICKS[userPick].gradientEndColor}
                showWave={matchResult === "YOU WIN"}
                waveWidth={150}
              />
            </span>
            <h2>YOU PICKED</h2>
          </div>
        </div>
        {matchResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-[90%] mt-24 z-40 hidden md:block">
            <h3 className="text-white text-center text-5xl font-extrabold">
              {matchResult}
            </h3>
            <div className="flex w-full justify-center mt-4  px-4 ">
              <button
                onClick={() => {
                  playAgain();
                  setMatchResult(null);
                }}
                className="w-[200px] bg-white rounded-lg text-[#2a46c0] py-3 hover:text-[#dd405d]">
                PLAY AGAIN
              </button>
            </div>
          </motion.div>
        ) : null}
        <div className=" flex flex-col h-full items-end md:min-w-[180px] ">
          <div className="flex flex-col md:flex-col-reverse gap-8 md:gap-12 items-center ">
            {housePick !== null ? (
              <>
                <span className="md:hidden">
                  <Circle
                    iconSize={45}
                    circleSize={120}
                    borderWidth={25}
                    bottomShadowOffset={5}
                    icon={PICKS[housePick].icon}
                    gradientStartColor={PICKS[housePick].gradientStartColor}
                    gradientEndColor={PICKS[housePick].gradientEndColor}
                    showWave={matchResult === "YOU LOSE"}
                    waveWidth={50}
                  />
                </span>
                <span className="hidden md:block">
                  <Circle
                    iconSize={55}
                    circleSize={160}
                    borderWidth={35}
                    bottomShadowOffset={8}
                    icon={PICKS[housePick].icon}
                    gradientStartColor={PICKS[housePick].gradientStartColor}
                    gradientEndColor={PICKS[housePick].gradientEndColor}
                    showWave={matchResult === "YOU LOSE"}
                    waveWidth={150}
                  />
                </span>
              </>
            ) : (
              <div className="flex items-center h-[120px] md:h-[160px] animate-ping">
                <div className="size-[120px] bg-black/20 rounded-full" />
              </div>
            )}
            <h2>THE HOUSE PICKED</h2>
          </div>
        </div>
      </div>
      {matchResult ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="w-[90%] mt-16 z-40 md:hidden">
          <h3 className="text-white text-center text-5xl font-extrabold">
            {matchResult}
          </h3>
          <div className="flex w-full justify-center mt-4  px-4 ">
            <button
              onClick={() => {
                playAgain();
                setMatchResult(null);
              }}
              className="w-[200px] bg-white rounded-lg text-[#2a46c0] py-3 hover:text-[#dd405d]">
              PLAY AGAIN
            </button>
          </div>
        </motion.div>
      ) : null}
    </>
  );
};

export default Picks;
