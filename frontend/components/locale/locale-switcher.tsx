import { useLocale } from "next-intl";
import { LocaleSwitcherSelect } from "./locale-switcher-select";
import { locales } from "@/config";
import { SelectItem } from "../ui/select";

export const LocaleSwitcher = () => {
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      label={`${locale}_${locale.toUpperCase()}`}
    >
      {locales.map((locale) => (
        <SelectItem key={locale} value={locale}>
          {`${locale}_${locale.toUpperCase()}`}
        </SelectItem>
      ))}
    </LocaleSwitcherSelect>
  );
};
