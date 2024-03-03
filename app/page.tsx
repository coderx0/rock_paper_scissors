"use client";

import Image from "next/image";
import Circle from "@/components/Circle";
import rock from "../public/images/icon-rock.svg";
import paper from "../public/images/icon-paper.svg";
import scissors from "../public/images/icon-scissors.svg";
import triangle from "../public/images/bg-triangle.svg";
import { useCallback, useEffect, useState } from "react";
import Modal from "@/components/modal/Modal";
import Picks from "@/components/Picks/Picks";

export default function Home() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [score, setScore] = useState(0);
  const [userPicked, setUserPicked] = useState<number | null>(null);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const updateScore = useCallback((result: string) => {
    if (result === "win") {
      setScore((prev) => {
        localStorage.setItem("score", String(prev + 1));
        return prev + 1;
      });
    } else if (result === "lose") {
      setScore((prev) => {
        localStorage.setItem("score", String(prev - 1));
        return prev - 1;
      });
    }
  }, []);

  const playAgain = () => {
    setUserPicked(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedScore = localStorage.getItem("score");
      if (storedScore) setScore(Number(storedScore));
    }
  }, []);

  return (
    <main className="h-full relative w-full flex flex-col items-center py-8 px-2 overflow-hidden">
      <div className="flex w-[90%] md:w-[40%] md:min-w-[400px] max-w-[600px] justify-between bg-transparent rounded-md p-3 py-4 border-2 border-white">
        <div className=" text-white font-bold flex flex-col gap-0 justify-center text-xl md:text-2xl">
          <span className="leading-[1.1rem] md:leading-[1.3rem]">ROCK</span>
          <span className="leading-[1.1rem] md:leading-[1.3rem]">PAPER</span>
          <span className="leading-[1.1rem] md:leading-[1.3rem]">SCISSORS</span>
        </div>
        <div className="bg-white h-[80px] w-[30%] rounded-md flex flex-col justify-center items-center">
          <span className="text-[14px] text-[#2a46c0] font-bold">SCORE</span>
          <h2 className="text-3xl font-bold text-[#3b4363]">{score}</h2>
        </div>
      </div>
      {userPicked === null ? (
        <div className="flex justify-center items-center gap-4 w-[90%] max-w-[400px] h-[500px]">
          <div className="relative flex flex-col items-center w-full h-[80vw] max-h-[300px] ">
            <div className="absolute w-[60%] top-[18%] z-10 ">
              <Image
                src={triangle}
                alt="triangle"
                height={200}
                width={200}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex w-full justify-between z-20">
              <Circle
                iconSize={45}
                circleSize={120}
                borderWidth={30}
                bottomShadowOffset={5}
                icon={paper}
                onSelect={() => setUserPicked(1)}
                gradientStartColor="hsl(230, 89%, 62%)"
                gradientEndColor="hsl(230, 89%, 65%)"
              />
              <Circle
                iconSize={45}
                circleSize={120}
                borderWidth={30}
                bottomShadowOffset={5}
                icon={scissors}
                onSelect={() => setUserPicked(2)}
                gradientStartColor="hsl(39, 89%, 49%)"
                gradientEndColor="hsl(40, 84%, 53%)"
              />
            </div>
            <div className="absolute w-full flex justify-center bottom-[4%] sm:-bottom-[6%] z-20">
              <Circle
                iconSize={45}
                circleSize={120}
                borderWidth={30}
                bottomShadowOffset={5}
                icon={rock}
                onSelect={() => setUserPicked(0)}
                gradientStartColor="hsl(349, 71%, 52%)"
                gradientEndColor="hsl(349, 70%, 56%)"
              />
            </div>
          </div>
        </div>
      ) : (
        <Picks
          userPick={userPicked}
          updateScore={updateScore}
          playAgain={playAgain}
        />
      )}

      <button
        onClick={openModal}
        className="absolute bottom-[50px] md:bottom-[20px] right-[50%] md:right-[20px] transform translate-x-1/2 md:translate-x-0 bg-transparent border-2 p-2 px-8 rounded-md text-white">
        RULES
      </button>
      <Modal onClose={closeModal} isOpen={isOpenModal} />
    </main>
  );
}
