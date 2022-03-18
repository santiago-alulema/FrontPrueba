import { OrderItem } from "components/order-item";
import { ParagraphSkeleton } from "components/paragraph-skeleton";
import { useAuth } from "context/auth/use-auth";
import NotFoundContent from "features/not-found-content/not-found-content";
import { useOrders } from "hooks/use-orders";
import React, { Fragment } from "react";

export type OrdersContentProps = {
}

export const OrdersContent = ({ }: OrdersContentProps) => {
  const { token } = useAuth();
  const { data } = useOrders({ key: token });

  return (
    data === undefined ?
      <ParagraphSkeleton />
      :
      data.length === 0 ?
        <NotFoundContent />
        :
        <Fragment>
          {
            data.map(o => (
              <OrderItem
                key={o.id}
                summary={o}
              />
            ))
          }
        </Fragment>
  );
}
