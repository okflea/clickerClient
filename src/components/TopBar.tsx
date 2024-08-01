import { Button } from "./ui/button";
import { useAuth } from "@/provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useEffect, useState } from "react";
import LoaderIcon from "@/assets/Loading";
import { ConnectionState } from "./ConnectionState";
import { useRecoilState } from "recoil";
import { UserAtom } from "@/atoms";
import { User } from "@/lib/types";
import { ModeToggle } from "./ThemeToggle";

function TopBar() {
  const [user, setUser] = useRecoilState<User | null>(UserAtom)
  const { token, setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setIsLoading(true)
    try {
      setUser(null)
      setToken(null);
      navigate("/", { replace: true });
      toast.success("Logout success")
    } catch (err) {
      console.log(err)
      toast.error("something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (user === null && token) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/me`)
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

  }, [])
  const { pathname } = useLocation()

  return (
    <div className="w-full h-[50px] bg-gradient-to-b from-blue-400 to-blue-600 dark:from-blue-700 dark:to-blue-900 shadow-2xl flex justify-between items-center px-3 py-0 pr-0">
      <div className="flex ">
        <p className="text-3xl p-1 pr-3 cursor-default hover:animate-spin">
          {/* <ReaderIcon className="w-5 h-5 text-white" /> */}
          🍌
        </p>
        {token && (
          <>
            <Button
              className={`h-[50px] ${user?.isAdmin ? "" : "hidden"}`}
              variant={`${pathname === "/admin" ? "secondary" : "ghost"}`}
              disabled={pathname === "/admin"}
              onClick={() => navigate("/admin")}
            > Admin</Button>

            <Button
              className={`h-[50px]`}
              variant={`${pathname === "/" ? "secondary" : "ghost"}`}
              disabled={pathname === "/"}
              onClick={() => navigate("/")}
            > Play</Button>

            <Button
              className={`h-[50px]`}
              variant={`${pathname === "/rank" ? "secondary" : "ghost"}`}
              disabled={pathname === "/rank"}
              onClick={() => navigate("/rank")}
            > Rank</Button>

          </>
        )}
      </div>

      <div>
        {token && (
          <div className="flex flex-row items-center ">
            <ModeToggle />
            <ConnectionState />
            <Button
              className="h-[50px]"
              variant={"destructive"}
              onClick={handleLogout}
              disabled={isLoading}
            >{isLoading ?
              <LoaderIcon /> :
              "Logout"
              }</Button>
          </div>
        )}
        {!token && (

          <div className="flex flex-row items-center ">
            <ModeToggle />
            <Button
              className="h-[50px]"
              variant={pathname === "/login" ? "secondary" : "ghost"}
              disabled={pathname === "/login"}
              onClick={() => navigate("/login")}
            > Login</Button>
            <Button
              className="h-[50px]"
              variant={pathname === "/register" ? "secondary" : "ghost"}
              disabled={pathname === "/register"}
              onClick={() => navigate("/register")}
            >Signup</Button>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default TopBar
