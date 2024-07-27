import { useEffect, useState } from "react";
import { Switch } from "./ui/switch"
import { useRecoilState } from "recoil";
import { UserAtom } from "@/atoms";
import { AvatarIcon, GlobeIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";


export function ConnectionState() {
  const [isConnected, setIsConnected] = useState(false);
  const [user, _] = useRecoilState(UserAtom)
  const handleCheckedChange = () => {
    setIsConnected(!isConnected)
  }
  useEffect(() => {

  }, [])
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="border border-slate-50 rounded-2xl p-2 flex flex-row items-center gap-2"
          >
            <Switch
              checked={isConnected}
              onCheckedChange={handleCheckedChange} />
            {isConnected && <GlobeIcon className="w-5 h-5 text-emerald-400" />}
            {!isConnected && <AvatarIcon className="w-5 h-5 text-rose-300" />}
            <p>
              {user?.name}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          socket connection
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
