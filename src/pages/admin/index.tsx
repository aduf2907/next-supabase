import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { IMenu } from "@/types/menu";
import { useState, useEffect } from "react";
import supabase from "@/lib/db";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

const AdminPage = () => {
  const [menus, setMenus] = useState<IMenu[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const { data, error } = await supabase.from("menus").select("*");

      if (error) console.log("error: ", error);
      else setMenus(data);
    };

    fetchMenus();
  }, [supabase]);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 w-full justify-between">
        <div className="text-3xl font-bold">Menu</div>
        <Button className="font=bold">Add Menu</Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-neutral-500 font-bold">
                Product
              </TableHead>
              <TableHead className="text-neutral-500 font-bold">
                Description
              </TableHead>
              <TableHead className="text-neutral-500 font-bold">
                Category
              </TableHead>
              <TableHead className="text-neutral-500 font-bold">
                Price
              </TableHead>
              <TableHead className="text-neutral-500 font-bold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menus.map((menu: IMenu) => (
              <TableRow key={menu.id}>
                <TableCell className="flex gap-3 items-center w-full">
                  <Image
                    width={50}
                    height={50}
                    src={menu.image}
                    alt={menu.name}
                    className="aspect-square object-cover rounded-lg"
                  />
                  {menu.name}
                </TableCell>
                <TableCell>
                  {menu.description.split(" ").slice(0, 5).join(" ") + "..."}
                </TableCell>
                <TableCell>{menu.category}</TableCell>
                <TableCell>${menu.price},00</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel className="font-bold">
                        Action
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Update</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPage;
