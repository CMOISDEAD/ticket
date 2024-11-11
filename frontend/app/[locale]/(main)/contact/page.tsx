import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const categories: { [key: string]: string[] } = {
  en: ["music", "sports", "arts", "family", "other"],
  es: ["música", "deportes", "arte", "familia", "otro"],
};

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            {t("title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">{t("name")}</Label>
              <Input id="name" placeholder={t("placeholder_name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("placeholder_email")}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-category">{t("select")}</Label>
            <Select>
              <SelectTrigger id="event-category">
                <SelectValue placeholder={t("placeholder_select")} />
              </SelectTrigger>
              <SelectContent>
                {categories[locale].map((category, i) => (
                  <SelectItem key={i} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t("message")}</Label>
            <Textarea
              id="message"
              placeholder={t("placeholder_message")}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">{t("send_message")}</Button>
          <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <span>support@queboleta.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>123 Ticket Street, Event City, EC 12345</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
