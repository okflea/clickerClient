import { UserAtom, usersScoreAtom } from "@/atoms";
import { Button } from "@/components/ui/button";
import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Play = () => {
  const [user, __] = useRecoilState(UserAtom)
  const [_, setUsersScore] = useRecoilState(usersScoreAtom)
  const [score, setScore] = useState(user?.score);
  const handleClick = () => {
    if (user) {
      socket.emit('bananaClick', { userId: user.id });
    }
  };
  useEffect(() => {
    // listen for highscores
    socket.on('highScoresUpdate', (
      scores:
        any
    ) => {
      // console.log("High scores updated:", scores);
      setUsersScore(scores)
    })
    // Listen for score updates from the server
    socket.on('scoreUpdate', (updatedScore: number) => {
      console.log("Score updated:", updatedScore);
      setScore(updatedScore);
    });

    return () => {
      socket.off('scoreUpdate');
    };
  }, []);
  return <>
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="border-2 border-yellow-400 rounded-2xl shadow-lg p-20 flex flex-col gap-y-8">
        <h1 className="text-5xl font-semibold">
          Banana Clicker
        </h1>
        <Button
          className="text-2xl h-14 bg-blue-400 hover:bg-blue-600 hover:animate-pulse"
          variant={"secondary"}
          onClick={handleClick}>🍌</Button>
        <p className="text-3xl text-center">Score: {score}</p>
      </div>
    </div>

  </>;
};

export default Play;
