import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { CircularProgress, Collapse, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material";
import { Box, Theme } from "@mui/system";
import { NoImage } from "assets/images";
import Image from "components/image/image";
import { PriceDetail } from "components/price-detail";
import { useAuth } from "context/auth/use-auth";
import NotFoundContent from "features/not-found-content/not-found-content";
import { initDecimal } from "hooks";
import { useOrderById } from "hooks/use-orders";
import React from "react";
import { PlacedOrderItem } from "types/dtos";

type OrderItemDetailsProps = {
  id: number;
}

export const OrderItemDetails = ({ id }: OrderItemDetailsProps) => {
  const { token } = useAuth();
  const { data, error, loading } = useOrderById({ id, key: token });

  return (
    loading ?
      <CircularProgress />
      :
      error ?
        <NotFoundContent />
        :
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="order details">
            <TableHead>
              <TableRow
                sx={{
                  'th': {
                    color: 'secondary.main',
                  },
                }}
              >
                <TableCell />
                <TableCell width="50%">Producto</TableCell>
                <TableCell align="right" color="secondary">Precio Unitario</TableCell>
                <TableCell align="right" color="secondary">Cantidad</TableCell>
                <TableCell align="right" color="secondary">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.items.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  )
}

type RowProps = {
  row: PlacedOrderItem;
}

function Row({ row: {
  url,
  name,
  unitAmount,
  discount,
  tax,
  quantity,
} }: RowProps) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const unitPrice = initDecimal(unitAmount).plus(tax.value).minus(discount.value);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          'td, th': {
            borderBottom: 'unset !important'
          },
        }}
      >
        <TableCell width={40}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            color="secondary"
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Stack
            direction="row"
            alignItems="center"
            spacing={{
              sm: 1,
              md: 2,
              lg: 3,
            }}
          >
            {
              !isMobile && (
                <Box
                  sx={{
                    position: 'relative',
                    height: 50,
                    width: 50,
                  }}
                >
                  <Image
                    src={url ?? NoImage}
                    alt={`${name} image`}
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
              )
            }
            <Typography variant="body1" flex={1}>
              {
                name
              }
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body1">
            {
              `$ ${unitPrice.toFixed(2)}`
            }
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body1">
            {
              quantity
            }
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography
            variant="body1"
            color="secondary"
            fontWeight="bold"
            noWrap
          >
            {
              `$ ${unitPrice.times(quantity).toFixed(2)}`
            }
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Stack direction="row" justifyContent="space-evenly" alignItems="center">
              {
                isMobile && (
                  <Box
                    sx={{
                      position: 'relative',
                      height: 100,
                      width: 100,
                    }}
                  >
                    <Image
                      src={url ?? NoImage}
                      alt={`${name} image`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </Box>
                )
              }
              <Stack
                px={2}
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={{
                  xs: 1,
                  sm: 2,
                }}
              >
                <PriceDetail
                  descriptionId="order.initialPrice.text"
                  descriptionDefault="Precio inicial"
                  value={unitAmount}
                />
                <PriceDetail
                  descriptionId="order.discount.text"
                  descriptionDefault="Descuento"
                  value={discount.value}
                />
                <PriceDetail
                  descriptionId="order.taxes.text"
                  descriptionDefault="Impuestos"
                  value={tax.value}
                />
              </Stack>
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}