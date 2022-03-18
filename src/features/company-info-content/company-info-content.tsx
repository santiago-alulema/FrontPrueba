import { Box } from '@mui/material';
import { Markdown } from 'components/markdown';
import NoResultFound from "components/no-result/no-result";
import { ParagraphSkeleton } from "components/paragraph-skeleton";
import React from "react";
import { CompanyInfoDto } from "types/dtos";

type CompanyInfoContentProps = {
  data?: CompanyInfoDto | null;
}

export default function CompanyInfoContent({ data }: CompanyInfoContentProps) {
  return (
    data === null ?
      <NoResultFound />
      :
      data === undefined ?
        <ParagraphSkeleton />
        :
        <Box
          width="100%"
        >
          <Markdown>
            {data.info}
          </Markdown>
        </Box>
  )
}
