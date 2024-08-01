import { UserAtom } from "@/atoms";
import { Button } from "@/components/ui/button";
import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Play = () => {
  const [user, setUser] = useRecoilState(UserAtom)
  const [score, setScore] = useState<number>(user?.score || 0);
  const handleClick = () => {
    setScore(prev => prev + 1)
    setUser(prev => prev && { ...prev, score: prev.score + 1 })
    if (user) {
      socket.emit('updateScore', { userId: user.id });
    }
  };
  useEffect(() => {
    return () => {
    };
  }, []);
  return <>
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="border-2 border-yellow-400  shadow-lg p-20 flex flex-col gap-y-8">
        <h1 className="text-5xl font-semibold text-primary">
          Banana Clicker
        </h1>
        <Button
          className="text-2xl h-14  hover:animate-pulse"
          // variant={"secondary"}
          onClick={handleClick}>🍌</Button>
        <p className="text-3xl text-center text-primary light:text-black">Score: {score}</p>
      </div>
    </div>

  </>;
};

export default Play;
