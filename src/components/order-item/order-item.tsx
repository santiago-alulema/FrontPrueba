import { paymentNames, shippingNames } from "@constants";
import { Event, ExpandMore, LocalShipping, Payment } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Modal, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { OrderResumeDto } from "types/dtos";
import { CancelModalContent, OrderItemDetails } from ".";

export type OrderItemProps = {
  summary: OrderResumeDto;
}

export const OrderItem = ({
  summary: {
    id,
    number,
    date,
    itemCount,
    paymentType,
    total,
    shippingType,
  }
}: OrderItemProps) => {
  const [openCancel, setOpenCancel] = useState(false);

  const toggleCancelModal = () => {
    setOpenCancel(state => !state);
  }

  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      sx={{
        mx: 2
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`order-${number}-content`}
        id={`order-${number}-header`}
        sx={{
          '.MuiAccordionSummary-content': {
            alignItems: 'center',
            justifyContent: 'space-between',
            px: {
              xs: 1,
              sm: 2,
              md: 3,
            }
          }
        }}
      >
        <Grid item container xs={3} sm={2} direction="column" alignItems="center">
          <Stack direction="row" spacing={1}>
            <Typography variant="h6" color="secondary">
              #
            </Typography>
            <Typography
              variant="h6"
              component="strong"
              color="primary"
              fontWeight="bold"
            >
              {number}
            </Typography>
          </Stack>
          <Typography variant="caption" color="primary">
            <FormattedMessage
              id="orders.summary.itemCount"
              defaultMessage="{itemCount} Item(s)"
              values={{
                itemCount: (
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                  >
                    {itemCount}
                  </Typography>
                ),
              }}
            />
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={6}
          sm={7}
          md={8}
          justifyContent="center"
        >
          <Stack
            direction={{
              xs: "column",
              sm: "row"
            }}
            spacing={{
              xs: 0,
              sm: 1,
              lg: 2,
            }}
            justifyContent="center"
            width={{
              sm:"100%",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              component={Grid}
              item
              xs={12}
              md={4}
            >
              <Event color="secondary" fontSize="small" />
              <Typography variant="subtitle2" color="primary">
                {
                  dayjs(date).format("DD MMMM YYYY")
                }
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              component={Grid}
              item
              xs={12}
              md={4}
            >
              <Payment color="secondary" fontSize="small" />
              <Typography variant="subtitle2" color="primary">
                {
                  paymentNames[paymentType]
                }
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              component={Grid}
              item
              xs={12}
              md={4}
            >
              <LocalShipping color="secondary" fontSize="small" />
              <Typography variant="subtitle2" color="primary">
                {
                  shippingNames[shippingType]
                }
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs="auto"
        >
          <Typography
            variant="h6"
            component="strong"
            color="secondary"
            fontWeight="bold"
            noWrap
          >
            {
              `$ ${total.toFixed(2)}`
            }
          </Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          '&.MuiAccordionDetails-root': {
            textAlign: 'center',
            px: {
              xs: 3,
              sm: 4,
              md: 5,
            }
          }
        }}
      >
        <OrderItemDetails id={id} />
        <Stack
          direction="row"
          justifyContent="flex-end"
        >
          <Button
            variant="text"
            onClick={toggleCancelModal}
          >
            Cancelar
          </Button>
        </Stack>
        <Modal
          open={openCancel}
          onClose={toggleCancelModal}
          aria-labelledby="modal-cancel-order-title"
          aria-describedby="modal-cancel-order-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: {
                xs: '90%',
                md: '80%',
                lg: 'min(70%, 700px)',
              },
              bgcolor: 'background.paper',
              boxShadow: 24,
              pt: 2,
              px: 4,
              pb: 3,
            }}
          >
            <CancelModalContent
              id={id}
              number={number}
              closeHandler={toggleCancelModal}
            />
          </Box>
        </Modal>
      </AccordionDetails>
    </Accordion>
  );
}