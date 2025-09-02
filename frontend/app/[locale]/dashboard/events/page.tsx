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
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { EventList } from "@/components/dashboard/EventList";
import { useTranslations } from "next-intl";

const schema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  date: z.string(),
  category: z.string(),
  venueId: z.string(),
  vipAvailable: z.coerce.number().int(),
  vipCapacity: z.coerce.number().int(),
  vipPrice: z.coerce.number(),
  regularCapacity: z.coerce.number().int(),
  regularAvailable: z.coerce.number().int(),
  regularPrice: z.coerce.number(),
  logo: z.string().url(),
  poster: z.string().url(),
  images: z.array(z.string().url()).default([]),
});

export default function Events() {
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const t = useTranslations("dashboard.events");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      date: "",
      category: "",
      venueId: "",
      vipCapacity: 0,
      vipPrice: 0,
      vipAvailable: 0,
      regularCapacity: 0,
      regularPrice: 0,
      regularAvailable: 0,
      logo: "",
      poster: "",
      images: [],
    },
  });

  useEffect(() => {
    if (!editingId) return;
    axiosClient.get(`/events/${editingId}`).then((res) => {
      form.reset(res.data);
    });
  }, [editingId]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      values.date = new Date(values.date).toISOString();
      console.log(values);
      if (editingId) {
        await axiosClient.patch(`/events/${editingId}`, values);
        toast({ title: "Updated 🎉", description: "Event updated." });
      } else {
        await axiosClient.post("/events", values);
        toast({ title: "Created 🎉", description: "Event created." });
      }
      form.reset();
      setEditingId(null);
    } catch (error: any) {
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
            <CardTitle>{editingId ? "Edit Event" : "New Event"}</CardTitle>
            <CardDescription>
              {editingId ? "Update the selected event" : "Create a new event"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="venueId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="vipCapacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VIP Capacity</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vipPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VIP Price</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="regularCapacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Regular Capacity</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="regularPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Regular Price</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="regularAvailable"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Regular Available</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vipAvailable"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VipAvailable</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="gap- flex">
                  <FormField
                    control={form.control}
                    name="poster"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Poster</FormLabel>
                        <FormControl>
                          <CldUploadWidget
                            uploadPreset="ml_default"
                            onSuccess={(result, { widget }) => {
                              // @ts-ignore
                              form.setValue("poster", result?.info?.secure_url);
                            }}
                          >
                            {({ open }) => (
                              <Button type="button" onClick={() => open()}>
                                Upload
                              </Button>
                            )}
                          </CldUploadWidget>
                        </FormControl>
                        {field.value && (
                          <img src={field.value} className="mt-2 h-24" />
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo</FormLabel>
                        <FormControl>
                          <CldUploadWidget
                            uploadPreset="ml_default"
                            onSuccess={(result, { widget }) => {
                              // @ts-ignore
                              form.setValue("logo", result?.info?.secure_url);
                            }}
                          >
                            {({ open }) => (
                              <Button type="button" onClick={() => open()}>
                                Upload
                              </Button>
                            )}
                          </CldUploadWidget>
                        </FormControl>
                        {field.value && (
                          <img src={field.value} className="mt-2 h-24" />
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  {editingId ? "Update" : "Create"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <EventList onEdit={setEditingId} />
      </div>
    </div>
  );
}
