import { Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import React from "react";
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";

const MarkdownHeading = (props: any) => {
  let variant;
  switch (props.level) {
    case 1:
      variant = "h1";
      break;
    case 2:
      variant = "h2";
      break;
    case 3:
      variant = "h3";
      break;
    case 4:
      variant = "h4";
      break;
    case 5:
      variant = "h5";
      break;
    case 6:
      variant = "h6";
      break;
  }
  return (
    <Typography gutterBottom variant={variant as Variant} color="secondary">{props.children}</Typography>
  );
}

export type MarkdownProps = ReactMarkdownOptions & {

}

export const Markdown = ({ children }: MarkdownProps) => {

  return (
    <ReactMarkdown
      components={{
        h1: MarkdownHeading,
        h2: MarkdownHeading,
        h3: MarkdownHeading,
        h4: MarkdownHeading,
        h5: MarkdownHeading,
        h6: MarkdownHeading,
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
