"use client";

import Image from "next/image";
import concertImage from "@/public/images/concert.webp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const schema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(6),
  repeatPassword: z.string().min(6),
  adress: z.string(),
  dob: z.date(),
});

export default function Login() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
  };

  return (
    <div className="flex h-screen flex-row justify-between">
      <div className="flex flex-1 flex-col content-center items-center">
        <div className="w-full p-20">
          <h1 className="text-foregound text-3xl font-bold capitalize text-white">
            Login
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-4 w-full space-y-8"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="jhondoe" {...field} />
                    </FormControl>
                    <FormDescription>Insert our username.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="*********"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
          <div>
            <p className="text-sm italic">
              You dont have an account?{" "}
              <Link href="/auth/register" className="not-italic">
                register
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="relative w-2/3">
        <Image
          src={concertImage}
          alt="login"
          width={undefined}
          height={undefined}
          className="h-full w-full object-cover object-center"
        />
        <p className="absolute bottom-5 right-5">
          Get the best prices of tickets.
        </p>
      </div>
    </div>
  );
}
