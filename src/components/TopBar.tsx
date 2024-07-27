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

function TopBar() {
  const [user, setUser] = useRecoilState<User | null>(UserAtom)
  const { token, setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/logout`);
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
    <div className="w-full h-[50px] bg-gradient-to-b from-blue-400 to-blue-600 shadow-2xl flex justify-between items-center px-4    ">
      <div className="flex gap-2">
        <p className="text-3xl">
          {/* <ReaderIcon className="w-5 h-5 text-white" /> */}
          🍌
        </p>
        {token && (
          <>
            <Button
              className={`${user?.isAdmin ? "" : "hidden"}`}
              variant={`${pathname === "/admin" ? "secondary" : "ghost"}`}
              disabled={pathname === "/admin"}
              onClick={() => navigate("/admin")}
            > Admin</Button>

            <Button
              className={``}
              variant={`${pathname === "/" ? "secondary" : "ghost"}`}
              disabled={pathname === "/"}
              onClick={() => navigate("/")}
            > Play</Button>

            <Button
              className={``}
              variant={`${pathname === "/rank" ? "secondary" : "ghost"}`}
              disabled={pathname === "/rank"}
              onClick={() => navigate("/rank")}
            > Rank</Button>

          </>
        )}
      </div>

      <div>
        {token && (
          <div className="flex flex-row items-center gap-2">
            <ConnectionState />
            <Button
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

          <div className="space-x-2">
            <Button
              variant={pathname === "/login" ? "ghost" : "secondary"}
              disabled={pathname === "/login"}
              onClick={() => navigate("/login")}
            > Login</Button>
            <Button
              variant={pathname === "/register" ? "ghost" : "secondary"}
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
