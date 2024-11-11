import { CalendarDays, DollarSign, Tag, Ticket } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Coupons Redeemed
            </CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Tickets Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Summer Music Festival
                  </TableCell>
                  <TableCell>2023-07-15</TableCell>
                  <TableCell>1,234</TableCell>
                  <TableCell className="text-right">$24,680</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Tech Conference 2023
                  </TableCell>
                  <TableCell>2023-08-22</TableCell>
                  <TableCell>987</TableCell>
                  <TableCell className="text-right">$49,350</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Food & Wine Expo
                  </TableCell>
                  <TableCell>2023-09-10</TableCell>
                  <TableCell>2,156</TableCell>
                  <TableCell className="text-right">$32,340</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Startup Pitch Night
                  </TableCell>
                  <TableCell>2023-10-05</TableCell>
                  <TableCell>543</TableCell>
                  <TableCell className="text-right">$10,860</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Selling Tickets</CardTitle>
            <CardDescription>
              Top 5 best selling ticket types this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">VIP Pass</p>
                  <p className="text-sm text-muted-foreground">
                    Summer Music Festival
                  </p>
                </div>
                <div className="ml-auto font-medium">+$12,234</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Early Bird Ticket
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tech Conference 2023
                  </p>
                </div>
                <div className="ml-auto font-medium">+$9,872</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Weekend Pass
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Food & Wine Expo
                  </p>
                </div>
                <div className="ml-auto font-medium">+$8,142</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    General Admission
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Startup Pitch Night
                  </p>
                </div>
                <div className="ml-auto font-medium">+$6,218</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Meet & Greet Package
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Summer Music Festival
                  </p>
                </div>
                <div className="ml-auto font-medium">+$4,890</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
