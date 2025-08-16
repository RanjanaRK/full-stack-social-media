"use client";

import getAllUser from "@/actions/profile/getAllUser.action";
import { SearchFormSchemaType, searchUser } from "@/lib/types";
import { searchFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const SearchBar = () => {
  const [result, setResult] = useState<searchUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<SearchFormSchemaType>({
    defaultValues: {
      text: "",
    },
    resolver: zodResolver(searchFormSchema),
  });

  const handleSearch = async (q: SearchFormSchemaType) => {
    const query = q.text.trim();

    if (!query) {
      setResult([]);
      return;
    }
    setLoading(true);
    try {
      const { success, data } = await getAllUser(query);

      if (!success) {
        setResult([]);
        return;
      }

      setResult(data || []);
      setLoading(false);
    } catch (err) {
      console.error("Unexpected:", err);
      setResult([]);
    }
  };

  return (
    <>
      <div className="">
        <Drawer direction="left">
          <DrawerTrigger className="dark:hover:text-accent-foreground dark:hover:bg-accent/50 hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 cursor-pointer items-center justify-start gap-4 rounded-md px-2 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 lg:w-full [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <span className="text-xl">
              <Search size={16} />
            </span>
            <span className="hidden lg:inline">Search</span>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Search </DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSearch)}>
                <div className="flex gap-2 p-4">
                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input placeholder="Search here..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button size={"icon"} className="" type="submit">
                    <Search />
                  </Button>
                </div>
              </form>
            </Form>

            <div className="max-h-72 space-y-3 overflow-y-auto p-4">
              {loading && <p>Searching...</p>}

              {!loading && result.length === 0 && (
                <p className="text-muted-foreground">No result found.</p>
              )}

              {result?.map((user) => (
                <div
                  key={user.id}
                  className="hover:bg-muted flex items-center gap-3 rounded p-4"
                >
                  <Link
                    href={`/profile/${user.id}`}
                    className="flex items-center gap-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.image || ""} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user?.name}</span>
                  </Link>
                </div>
              ))}
            </div>

            <DrawerFooter>
              <DrawerClose></DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default SearchBar;
