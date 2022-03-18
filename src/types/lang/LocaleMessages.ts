import { MessageFormatElement } from "@formatjs/icu-messageformat-parser";
import { LocaleType } from ".";

export type LocaleMessagesType = {
  [key in LocaleType]?: Record<string, string> | Record<string, MessageFormatElement[]>;
};
