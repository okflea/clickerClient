import { atom } from "recoil";
import { User } from "./lib/types";

export const UserAtom = atom<User | null>({
  key: 'user',
  default: null
});

export const usersScoreAtom = atom<User[] | null>({
  key: 'usersScore',
  default: null
})
