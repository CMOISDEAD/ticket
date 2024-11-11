"use client";

import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from "../ui/select";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export const LocaleSwitcherSelect = ({
  children,
  defaultValue,
  label,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const onSelectChange = (value: string) => {
    startTransition(() => {
      router.replace(
        // @ts-ignore
        { pathname, params },
        { locale: value },
      );
    });
  };

  return (
    <Select
      disabled={isPending}
      onValueChange={onSelectChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger>{label}</SelectTrigger>
      <SelectContent>
        <SelectGroup>{children}</SelectGroup>
      </SelectContent>
    </Select>
  );
};
