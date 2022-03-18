import { LinkProps } from "next/link";
import { ReactNode } from "react";

export type MenuItemType = {
  id: string | number,
  icon?: ReactNode;
  intl: string,
  defaultMessage: string,
  href: LinkProps['href'],
}