import { Box, Skeleton, Typography, TypographyProps } from "@mui/material";

const variants = [
  'h1',
  'h3',
  'body1',
  'caption',
  'h4',
  'body1',
  'caption',
] as readonly TypographyProps['variant'][];

export const ParagraphSkeleton = () => {
  return (
    <Box width="100%">
      {variants.map((variant, index) => (
        <Typography component="div" key={index} variant={variant}>
          <Skeleton />
        </Typography>
      ))}
    </Box>
  );
}
