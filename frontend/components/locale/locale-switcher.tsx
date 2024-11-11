import { useLocale, useTranslations } from "next-intl";
import { LocaleSwitcherSelect } from "./locale-switcher-select";
import { locales } from "@/config";
import { SelectItem } from "../ui/select";

export const LocaleSwitcher = () => {
  const t = useTranslations("locale-switcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      {locales.map((locale) => (
        <SelectItem key={locale} value={locale}>
          {t("locale", { locale })}
        </SelectItem>
      ))}
    </LocaleSwitcherSelect>
  );
};
