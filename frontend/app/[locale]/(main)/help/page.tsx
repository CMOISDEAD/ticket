import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HelpPage() {
  const categories = [
    { title: "Buying Tickets", icon: "🎟️" },
    { title: "My Account", icon: "👤" },
    { title: "Event Information", icon: "📅" },
    { title: "Refunds & Exchanges", icon: "💱" },
  ];

  const faqs = [
    {
      question: "How do I purchase tickets?",
      answer:
        "You can purchase tickets by selecting an event and choosing your desired seats. Follow the checkout process to complete your purchase.",
    },
    {
      question: "Can I get a refund for my tickets?",
      answer:
        "Refund policies vary by event. Please check the specific event's terms and conditions or contact our support team for assistance.",
    },
    {
      question: "How do I access my tickets?",
      answer:
        "Your tickets can be accessed in the 'My Tickets' section of your account. You can display them on your mobile device or print them for entry.",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6 text-foreground md:p-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Help Center</h1>
          <p className="text-xl text-muted-foreground">
            How can we assist you today?
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for help..."
            className="w-full py-6 pl-10 text-lg"
          />
        </div>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Popular Topics</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {categories.map((category) => (
              <Card
                key={category.title}
                className="transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <span className="mr-2 text-2xl">{category.icon}</span>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Find answers related to {category.title.toLowerCase()}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Still need help?</CardTitle>
              <CardDescription>
                Our support team is here to assist you with any questions or
                concerns.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 sm:flex-row">
              <Button className="flex-1 py-6 text-lg">Chat with Us</Button>
              <Button variant="outline" className="flex-1 py-6 text-lg">
                Send an Email
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
