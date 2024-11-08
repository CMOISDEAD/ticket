import {
  Users,
  Calendar,
  DollarSign,
  Tickets,
  Option,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

interface EventsProps {
  name: string;
  image: string;
  year: number;
  seats: number;
  category: string;
  price: number;
}

export default function Component({ events = [] }: { events?: EventsProps[] }) {
  // Sample data if no cars are provided
  const sample: EventsProps[] = [
    {
      name: "UFC: 308",
      image: "https:/placehold.co/40x64",
      year: 2024,
      seats: 2,
      category: "Sport",
      price: 150,
    },
  ];

  const displayEvents = events.length > 0 ? events : sample;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-6 lg:flex-row">
        <Card className="w-full lg:w-1/3">
          <CardHeader>
            <CardTitle>Events Car</CardTitle>
            <CardDescription>
              General details about your current car.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>number of events: 3</span>
              </li>
              <li className="flex items-center gap-2">
                <Tickets className="h-4 w-4" />
                <span>number of tickets: 4</span>
              </li>
              <li className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>total price: $ 50.000</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Purchase</Button>
          </CardFooter>
        </Card>
        <div className="w-full lg:w-2/3">
          <h2 className="mb-4 text-2xl font-bold">Items</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayEvents.map((car, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="h-10 w-16 rounded object-cover"
                      />
                      <div>
                        <div className="font-bold">{car.name}</div>
                        <div className="text-sm text-gray-500">
                          Year: {car.year}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="mr-2">
                      <Users className="mr-1 h-3 w-3" />
                      {car.seats} seats
                    </Badge>
                    <Badge variant="secondary">
                      <Option className="mr-1 h-3 w-3" />
                      {car.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold">${car.price}</div>
                  </TableCell>
                  <TableCell>
                    <Button size="icon" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
