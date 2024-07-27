import { usersScoreAtom } from '@/atoms';
import { User } from '@/lib/types';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function Rank() {
  const [usersHighscores, setUsersHighscores] = useRecoilState<User[] | null>(usersScoreAtom);
  return (
    <div>

      <div
        className="overflow-x-auto p-10 mt-20 m-4 border-2 border-yellow-400 rounded-lg shadow-lg">
        <Table>
          <TableCaption className="gap-2">
            <p> Top 10 High Scores </p>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {usersHighscores && usersHighscores?.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={"outline"}
                    className={`${user.status === "ONLINE" ? "text-emerald-600" : "text-rose-700"} p-2 rounded-full font-light`}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{user.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>Total 🍌 </TableCell>
              <TableCell className="text-right">{
                usersHighscores?.reduce((acc, user) => acc + (user.score || 0), 0)
              }</TableCell>
            </TableRow>
          </TableFooter>
        </Table>

      </div>
    </div>
  );
}
