import {
  ArrowRight,
  ReceiptJapaneseYen,
  TicketCheck,
  UserCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex h-full items-center justify-center gap-4">
      <Card className="max-w-xs">
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>Events Dashboard</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <TicketCheck className="size-10" />
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/dashboard/events">
              <ArrowRight className="size-6" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Card className="max-w-xs">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Users Dashboard</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <UserCheck className="size-10" />
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/dashboard/users">
              <ArrowRight className="size-6" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Card className="max-w-xs">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Orders Dashboard</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ReceiptJapaneseYen className="size-10" />
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/dashboard/orders">
              <ArrowRight className="size-6" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
