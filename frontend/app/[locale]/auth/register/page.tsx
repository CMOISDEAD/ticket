"use client";

import Image from "next/image";
import concertImage from "@/public/images/concert.jpg";
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
import { Link, useRouter } from "@/navigation";
import { useState } from "react";
import { Loader2, Ticket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PasswordInput } from "@/components/ui/password-input";
import { axiosClient } from "@/lib/axiosClient";
import { useTranslations } from "next-intl";

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
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations("register");

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
      const response = await axiosClient.post("/auth/register", values);
      console.log(response);

      toast({
        title: "Success 🎉",
        description:
          "You have beeen succesfully register, you will be redirect in a few seconds...",
      });
      setTimeout(() => router.push("/auth/login"), 1500);
    } catch (error: any) {
      const codes = [400, 401, 403];
      const isBadRequest = codes.includes(error.response.status);

      toast({
        variant: "destructive",
        title: isBadRequest ? "Verify your data 🧐" : "Error",
        description: isBadRequest
          ? "username or email already in use."
          : error.message,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-row justify-between">
      <div className="flex flex-1 flex-col content-center items-center justify-between p-5 md:p-20">
        <div className="w-full">
          <h1 className="text-foregound text-3xl font-bold capitalize">
            {t("title")}
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
                      <FormLabel>{t("inputs.firstname.label")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("inputs.firstname.placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("inputs.firstname.description")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t("inputs.lastname.label")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("inputs.lastname.placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("inputs.lastname.description")}
                      </FormDescription>
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
                    <FormLabel>{t("inputs.username.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("inputs.username.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t("inputs.username.description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("inputs.email.label")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("inputs.email.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t("inputs.email.description")}
                    </FormDescription>
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
                      <FormLabel>{t("inputs.password.label")}</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder={t("inputs.password.placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("inputs.password.description")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="repeatPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t("inputs.repeat.label")}</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder={t("inputs.repeat.placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("inputs.repeat.description")}
                      </FormDescription>
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
                    <FormLabel>{t("inputs.address.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("inputs.address.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t("inputs.address.description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {t("submit")}
              </Button>
            </form>
          </Form>
          <p className="text-center text-sm italic md:text-start">
            {t("question")}{" "}
            <Link href="/auth/login" className="not-italic text-blue-500">
              {t("login")}
            </Link>
          </p>
        </div>
        <div className="flex flex-col items-center text-center text-sm">
          <p className="text-muted-foreground">
            {t("by_continue")}{" "}
            <Link href="#" className="text-blue-500">
              {t("terms")}
            </Link>
          </p>
          <p className="text-muted-foreground">
            {t("go_back")}{" "}
            <Link href="/" className="text-blue-500">
              {t("home")}
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden w-2/3 p-5 md:flex">
        <Image
          src={concertImage}
          alt="login"
          width={undefined}
          height={undefined}
          className="h-full w-full rounded-lg object-cover object-center"
        />
        <div className="absolute left-10 top-10 max-w-sm text-white">
          <div className="flex items-center gap-2">
            <Ticket className="h-14 w-14" />
            <h1 className="text-4xl font-bold">QueBoleta</h1>
          </div>
          <p className="text-sm italic">{t("quote")}</p>
        </div>
        <p className="absolute bottom-10 right-10 text-white">
          Rap Festival 2024.
        </p>
      </div>
    </div>
  );
}
