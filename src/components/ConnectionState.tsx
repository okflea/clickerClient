import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { UserAtom } from "@/atoms";
import { AvatarIcon, GlobeIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { socket } from "@/socket";


export function ConnectionState() {
  const [user, _] = useRecoilState(UserAtom);

  useEffect(() => {
    function onConnect() {
      console.log('Connected!'); // Debug log
    }

    function onDisconnect() {
      console.log('Disconnected!'); // Debug log
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Attempt to connect if not connected
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="border border-slate-50 rounded-2xl p-2 flex flex-row items-center gap-2"
          >
            {socket.connected && <GlobeIcon className="w-5 h-5 text-emerald-400" />}
            {!socket.connected && <AvatarIcon className="w-5 h-5 text-rose-300" />}
            <p>
              {user?.name}</p>
            {/* <Switch */}
            {/*   checked={isConnected} */}
            {/*   onCheckedChange={handleCheckedChange} /> */}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          socket connection
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
