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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const schema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6),
    repeatPassword: z.string().min(6).optional(),
    adress: z.string(),
    dob: z.date(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match.",
    path: ["repeatPassword"],
  });

export default function Register() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      adress: "",
      dob: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    delete values.repeatPassword;
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        if (response.status === 400)
          throw new Error("Username or email already in use.");
        throw new Error(
          "An error occurred while registering. Please try again later.",
        );
      }

      const data = await response.json();
      console.log(data);

      toast({
        title: "Success 🎉",
        description:
          "You have beeen succesfully register, you will be redirect in a few seconds...",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error 😥",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-row justify-between">
      <div className="flex flex-1 flex-col content-center items-center justify-between p-5 md:p-20">
        <div className="w-full">
          <h1 className="text-foregound text-3xl font-bold capitalize">
            Register
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-4 w-full space-y-5"
            >
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input placeholder="Jhon" {...field} />
                      </FormControl>
                      <FormDescription>Your firstname.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormDescription>Your lastname.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="JonDoe" {...field} />
                    </FormControl>
                    <FormDescription>Your public username.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*******"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Type your password.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="repeatPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Repeat</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*******"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Repeat your password.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="adress"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Adress</FormLabel>
                    <FormControl>
                      <Input placeholder="Armenia, Colombia" {...field} />
                    </FormControl>
                    <FormDescription>Your adress.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Register
              </Button>
            </form>
          </Form>
          <p className="text-center text-sm italic md:text-start">
            Already have an account?
            <Link href="/auth/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
        <div className="flex flex-col items-center text-center text-sm">
          <p className="text-muted-foreground">
            By registering you agree to our{" "}
            <Link href="#" className="text-blue-500">
              terms and conditions
            </Link>
          </p>
          <p className="text-muted-foreground">
            Go back to{" "}
            <Link href="/" className="text-blue-500">
              home
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden w-2/3 md:flex">
        <Image
          src={concertImage}
          alt="Register"
          width={undefined}
          height={undefined}
          className="h-full w-full object-cover object-center"
        />
        <p className="absolute bottom-5 right-5 text-white">
          Get the best prices of tickets.
        </p>
      </div>
    </div>
  );
}
