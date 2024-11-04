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

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        if (response.status === 401 || response.status === 403)
          throw new Error("Invalid credentials.");
        throw new Error(
          "An error occurred while logging in. Please try again later.",
        );
      }

      const data = await response.json();
      console.log(data);

      toast({
        title: "Success 🎉",
        description: "You have successfully logged in.",
      });
    } catch (error: any) {
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
            Login
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-4 w-full space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jhondoe@ibm.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Insert your user email.</FormDescription>
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Login
              </Button>
            </form>
          </Form>
          <div>
            <p className="text-center text-sm italic md:text-start">
              You dont have an account?
              <Button asChild variant="link">
                <Link href="/auth/register" className="not-italic">
                  register
                </Link>
              </Button>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center text-sm">
          <p className="text-muted-foreground">
            By loginin you agree to our{" "}
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
          alt="login"
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
