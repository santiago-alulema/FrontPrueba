import { Backdrop, CircularProgress } from "@mui/material";
import { SEO } from "components";
import { useAuth } from "context/auth/use-auth";
import NotFoundContent from "features/not-found-content/not-found-content";
import OrderReceivedContent from "features/order-received-content/order-received-content";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { ordersRepository } from "repository";
import { ApiErrorDto, PlacedOrderDto } from "types/dtos";
import { firstIfArray } from "utils";

export default function OrderReceived() {
  const [orderInfo, setOrderInfo] = useState<PlacedOrderDto | null>();
  const { token } = useAuth();
  const { query: { id }, isReady } = useRouter();

  const loadOrderInfo = () => {
    ordersRepository.getOrderById({
      key: token,
      id: firstIfArray(id)
    })
      .then(order => {
        //TODO: remove this conversion when 404 response is fixed
        if ((order as unknown as ApiErrorDto).message) {
          setOrderInfo(null);
        } else {
          setOrderInfo(order);
        }
      })
      .catch(_e => setOrderInfo(null));
  }

  useEffect(() => {
    if (isReady && token) {
      loadOrderInfo();
    }
  }, [isReady, token]);

  return (
    <Fragment>
      <SEO title="Orden recibida" description="" />
      {
        orderInfo === undefined ?
          <Backdrop
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1
            }}
            open
          >
            <CircularProgress color="secondary" />
          </Backdrop>
          :
          orderInfo !== null ?
            <OrderReceivedContent orderInfo={orderInfo} />
            :
            <NotFoundContent />

      }
    </Fragment>
  )
}
