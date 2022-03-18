import { SEO } from "components";
import NotFoundContent from "features/not-found-content/not-found-content";
import React, { Fragment } from "react";
import { useIntl } from "react-intl";

export default function Custom404Page() {
  const { formatMessage } = useIntl();

  return (
    <Fragment>
      <SEO title={formatMessage({ id: "notfound.text", defaultMessage: "Not found" })} description="" />
      <NotFoundContent />
    </Fragment>
  );
}