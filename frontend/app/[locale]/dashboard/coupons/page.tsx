"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/axiosClient";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppUserType } from "@/types/global.types";
import { useTranslations } from "next-intl";
import { CouponList } from "@/components/dashboard/CouponList";

// TODO: separate this file into smaller components.
const schema = z.object({
  code: z.string().max(6).min(6),
  name: z.string().min(3),
  description: z.string().min(10),
  userId: z.string().optional(),
  discount: z
    .string()
    .min(1)
    .max(100)
    .transform((v) => {
      if (!v) return 0;
      return parseFloat(v);
    }),
  expiryDate: z.string(),
});

export default function Coupons() {
  const t = useTranslations("dashboard.coupons");
  const [users, setUsers] = useState<AppUserType[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      userId: "",
      discount: 0,
      expiryDate: "",
    },
  });

  useEffect(() => {
    api("/users")
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    console.log(values);
    try {
      setLoading(true);
      const response = await api("/coupons", { method: "POST", data: values });
      console.log(response);
      toast({
        title: "Success 🎉",
        description: "Coupon created successfully.",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-5xl font-bold">{t("title")}</h1>
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="h-fit md:w-1/3">
          <CardHeader>
            <CardTitle>{t("form.title")}</CardTitle>
            <CardDescription>{t("form.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="my-4 w-full space-y-4"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t("form.inputs.code.label")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form.inputs.code.placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("form.inputs.code.description")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-4 md:flex-row">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t("form.inputs.name.label")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("form.inputs.name.placeholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {t("form.inputs.name.description")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          {t("form.inputs.description.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t(
                              "form.inputs.description.placeholder",
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {t("form.inputs.description.description")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                  <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t("form.inputs.userId.label")}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t(
                                  "form.inputs.userId.placeholder",
                                )}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {users.length
                              ? users.map((user) => (
                                  <SelectItem key={user.id} value={user.id}>
                                    {user.email}
                                  </SelectItem>
                                ))
                              : null}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {t("form.inputs.userId.description")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          {t("form.inputs.expiryDate.label")}
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>
                          {t("form.inputs.expiryDate.description")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t("form.inputs.discount.label")}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          {t("form.inputs.discount.description")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  {t("form.submit")}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <CouponList />
      </div>
    </div>
  );
}
