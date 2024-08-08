import { UserAtom } from "@/atoms";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { calculateUpgradeBenefit, calculateUpgradeCost } from "@/lib/utils";
import { socket } from "@/socket";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "sonner";

const BASEMONKEYCOST = 100;
const BASEMONKEYBENEFIT = 1;
const BASELABCOST = 50;
const BASELABBENEFIT = 2;
const GROWTHFACTOR = 1.2;

const Play = () => {
  const [user, setUser] = useRecoilState(UserAtom)
  const [bananas, setBananas] = useState<number>(user?.bananas || 0);
  const [clickIncrement, setClickIncrement] = useState<number>(1);
  const { data, isPending, refetch } = useQuery({
    queryKey: ["upgrades"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/upgrade`)
      return response.data
    }
  })
  const handleClick = () => {
    setBananas(prev => prev + clickIncrement)
    setUser(prev => prev && {
      ...prev,
      bananas: prev.bananas + clickIncrement,
      score: prev.score + clickIncrement
    })
    if (user) {
      socket.emit('updateScore', { userId: user.id, inc: clickIncrement });
    }
  };
  const handleUpgrade = async (upgradeId: string, upgradeType: string, currentLevel: number) => {
    const cost = calculateUpgradeCost(upgradeType === "MONKEY" ? BASEMONKEYCOST : BASELABCOST, currentLevel, GROWTHFACTOR);
    if (bananas < cost) {
      toast.error("Not enough bananas");
      return;
    }
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/upgrade/${upgradeId}`);
      if (response.status === 200) {
        toast.success("Upgrade purchased");
        setBananas(prev => prev - cost);
        refetch();
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    return () => {
    };
  }, []);
  return <>
    <div className="flex items-center justify-center p-10">
      {/* container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-[1500px] w-full">
        {/* box */}
        <div className="h-[300px] border-2 border-primary shadow-lg p-10 flex flex-col gap-y-8 max-w-[500px] w-full mx-auto">
          <h1 className="text-5xl font-semibold text-primary dark:gradient-heading">
            Banana Bonanza
          </h1>
          <Button
            className="text-2xl h-14 bg-gradient-to-r from-secondary to-secondary/90 transition duration-150 ease-in-out active:scale-95 active:from-primary active:to-primary/50"
            onClick={handleClick}>🍌</Button>
          <p className="text-3xl font-bold text-center text-primary light:text-black">Bananas : {bananas}</p>
        </div>

        {isPending && (
          <>
            <Skeleton className=" shadow-lg h-[300px] max-w-[500px] w-full mx-auto" />
            <Skeleton className=" shadow-lg h-[300px] max-w-[500px] w-full mx-auto" />
          </>
        )}
        {!isPending && data && data.map((upgrade: { id: string; type: string; level: number }) => {
          const cost = calculateUpgradeCost(upgrade.type === "MONKEY" ? BASEMONKEYCOST : BASELABCOST, upgrade.level, GROWTHFACTOR);
          const benefit = calculateUpgradeBenefit(upgrade.type === "MONKEY" ? BASEMONKEYBENEFIT : BASELABBENEFIT, upgrade.level + 1);

          return (
            <div
              key={upgrade.id}
              className={`border-2 border-primary shadow-lg p-20 h-[300px] max-w-[500px] w-full mx-auto ${upgrade.level === 0 && "border-dashed opacity-30"}`}
            >
              <h1 className={`text-2xl font-semibold ${upgrade.type === "MONKEY" ? "text-orange-900" : "text-green-600"}`}>
                {upgrade.type === "MONKEY" ? "Monkey Business 🐒" : "Banana Steroid Lab 💪🏾"}
              </h1>
              {upgrade.level > 0 && (
                <p className="font-semibold text-blue-400">Level {upgrade.level} {upgrade.type === "MONKEY" ? "Monkey" : "Lab"}</p>
              )}
              <br />
              <Button
                className="mt-4 w-full"
                disabled={bananas < cost}
                onClick={() => handleUpgrade(upgrade.id, upgrade.type, upgrade.level)}
              >
                {bananas < cost ? `Unlocks after ${cost} bananas` : `Upgrade for ${cost} bananas`}
              </Button>
              <p className="font-light">
                {upgrade.type === "MONKEY" ? `Hires ${benefit} monkey${benefit > 1 ? "s" : ""} to collect 1 banana per second` : `Injects bananas with growth hormones. ${benefit} bananas per click`}</p>
            </div>
          );
        })}
      </div>
    </div>

  </>;
};

export default Play;
