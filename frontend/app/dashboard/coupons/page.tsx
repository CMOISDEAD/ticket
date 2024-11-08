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
import { axiosClient } from "@/lib/axiosClient";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { EventList } from "@/components/dashboard/EventList";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppUserType } from "@/types/global.types";

// TODO: work on global coupons, reedemable by a code
// TODO: separate this file into smaller components
// FIX: userId should not be empty
const schema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  userId: z.string(),
  discount: z
    .string()
    .min(1)
    .max(100)
    .transform((v) => {
      if (!v) return 0;
      return parseFloat(v);
    }),
  isUsed: z.boolean(),
  isExpired: z.boolean(),
  isGlobal: z.boolean(),
  usedDate: z.string(),
  expiryDate: z.string(),
});

export default function Coupons() {
  const [users, setUsers] = useState<AppUserType[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      userId: "",
      discount: 0,
      isUsed: false,
      isExpired: false,
      isGlobal: false,
      usedDate: "",
      expiryDate: "",
    },
  });

  useEffect(() => {
    axiosClient
      .get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    console.log(values);
    return;
    try {
      setLoading(true);
      const response = await axiosClient.post("/coupons", values);
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
      <h1 className="mb-4 text-5xl font-bold">Coupons</h1>
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="h-fit md:w-1/3">
          <CardHeader>
            <CardTitle>Create an Coupon</CardTitle>
            <CardDescription>
              Fill out the form below to create a Coupon.
            </CardDescription>
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
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Event Name" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the name of the coupon.
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
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Description" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the description of the coupon.
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
                        <FormLabel>Select user:</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select user to add coupon" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {users.length ? (
                              users.map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                  {user.email}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="">No users found</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Enter the user to give the coupon to.
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
                        <FormLabel>Expiration Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the expiration date of the coupon.
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
                        <FormLabel>Discount</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the expiration date of the coupon.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="isGlobal"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Is Global</FormLabel>
                      <FormDescription>
                        Select if the coupon is global.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  Create Coupon
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
