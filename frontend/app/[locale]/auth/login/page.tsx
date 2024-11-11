"use client";

import Image from "next/image";
import concertImage from "@/public/images/concert.jpg";
import githubLogo from "@/public/github.svg";
import googleLogo from "@/public/google.svg";
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
import { ButtonGroup } from "@/components/ui/button-group";
import { axiosClient } from "@/lib/axiosClient";
import { useTicketStore } from "@/store/useTicketStore";
import { useTranslations } from "next-intl";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const { setIsAuth } = useTicketStore((state) => state);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations("login");

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
      const response = await axiosClient.post("/auth/login", values);
      console.log(response);

      toast({
        title: "Success 🎉",
        description: "You have successfully logged in.",
      });

      setIsAuth(true);
      router.push("/");
    } catch (error: any) {
      const codes = [400, 401, 403];
      const isBadRequest = codes.includes(error.response.status);

      toast({
        variant: "destructive",
        title: isBadRequest ? "Email or password incorrect 😵" : "Error",
        description: isBadRequest
          ? "Please check your credentials."
          : error.message,
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
            {t("title")}
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {t("submit")}
              </Button>
            </form>
          </Form>
          <div>
            <p className="text-center text-sm italic md:text-start">
              {t("question")}{" "}
              <Link href="/auth/register" className="not-italic text-blue-500">
                {t("register")}
              </Link>
            </p>
          </div>
          <div className="my-4 w-full">
            <SocialLogin />
          </div>
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

const SocialLogin = () => {
  return (
    <ButtonGroup>
      <Button className="w-full" size="lg">
        <Image
          src={githubLogo}
          alt="github"
          width={20}
          height={20}
          className="dark:invert"
        />
      </Button>
      <Button className="w-full" size="lg">
        <Image src={googleLogo} alt="google" width={20} height={20} />
      </Button>
    </ButtonGroup>
  );
};
