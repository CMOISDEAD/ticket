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
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { axiosClient } from "@/lib/axiosClient";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { EventList } from "@/components/dashboard/EventList";
import { useTranslations } from "next-intl";

const schema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  city: z.string().min(3),
  address: z.string().min(10),
  type: z.string().min(3),
  poster: z.string().min(3),
  images: z.array(z.string().url()),
  date: z.string(),
  price: z
    .string()
    .min(1)
    .transform((v) => {
      if (!v) return 0;
      return parseFloat(v);
    }),
});

export default function Events() {
  const [loading, setLoading] = useState(false);
  const t = useTranslations("dashboard.events");
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      city: "",
      address: "",
      type: "",
      poster: "",
      images: [],
      date: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      const response = await axiosClient.post("/events", values);
      console.log(response);
      toast({
        title: "Success 🎉",
        description: "Event created successfully.",
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
                    name="city"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t("form.inputs.city.label")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("form.inputs.city.placeholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {t("form.inputs.city.description")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t("form.inputs.address.label")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("form.inputs.address.placeholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {t("form.inputs.address.description")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t("form.inputs.type.label")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("form.inputs.type.placeholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {t("form.inputs.type.description")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="poster"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t("form.inputs.poster.label")}</FormLabel>
                        <FormControl>
                          <CldUploadWidget
                            uploadPreset="ml_default"
                            onSuccess={(result, { widget }) => {
                              // @ts-ignore
                              form.setValue("poster", result?.info?.secure_url);
                            }}
                          >
                            {({ open }) => {
                              function handleOnClick() {
                                form.setValue("poster", "");
                                open();
                              }
                              return (
                                <Button onClick={handleOnClick}>
                                  Upload an Image
                                </Button>
                              );
                            }}
                          </CldUploadWidget>
                        </FormControl>
                        <FormDescription>
                          {t("form.inputs.poster.description")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t("form.inputs.price.label")}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder={t("form.inputs.price.placeholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {t("form.inputs.price.description")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="date"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t("form.inputs.date.label")}</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>
                          {t("form.inputs.date.description")}
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
        <EventList />
      </div>
    </div>
  );
}
