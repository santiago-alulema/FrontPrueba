import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";
import Tab from '@mui/material/Tab';
import Typography from "@mui/material/Typography";
import { PayButton } from 'components/pay-button';
import { useTransferAccounts } from 'hooks';
import React, { MouseEvent, useState } from "react";
import { FormattedMessage } from 'react-intl';
import { XpropsSuccessResponseDto } from 'types/cuaierPay/button';
import { GetTransferAccountDto } from "types/dtos";
import { TransferAccountEnum } from '../../enums/TransferAccountEnum';

type BankTransferInfoProps = {
  onPlaceOrder: (paymentInfo?: XpropsSuccessResponseDto) => void;
  terms: boolean;
}

export const BankTransferInfo = ({ onPlaceOrder, terms }: BankTransferInfoProps) => {
  const { data: accountsData } = useTransferAccounts({});

  const handlePayButton = (_e: MouseEvent<HTMLButtonElement>) => {
    onPlaceOrder()
  }

  return (
    <Box>
      {
        !accountsData ?
          <Box>
            <h1><Skeleton></Skeleton></h1>
            <h1><Skeleton></Skeleton></h1>
            <h2><Skeleton></Skeleton></h2>
            <h2><Skeleton></Skeleton></h2>
            <h3><Skeleton></Skeleton></h3>
            <h3><Skeleton></Skeleton></h3>
          </Box>

          :
          <Stack width="100%" textAlign="left">
            <BankTransferTabs accountsData={accountsData} />
            <PayButton
              onClick={handlePayButton}
              terms={terms}
            >
              <FormattedMessage
                id="finishOrder.button.text"
                defaultMessage="Finalizar compra"
              />
            </PayButton>
          </Stack>
      }
    </Box>
  )
}

type BankTransferTabsProps = {
  accountsData: GetTransferAccountDto[];
}

const BankTransferTabs = ({ accountsData }: BankTransferTabsProps) => {
  const [bankTabController, setBankTabController] = useState(accountsData[0].bankName);

  const handleChange = (_event: React.SyntheticEvent, newBank: string) => {
    setBankTabController(newBank);
  };

  return (
    <TabContext value={bankTabController}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange}>
          {accountsData.map((account, index) => (
            <Tab key={index} label={account.bankName} value={account.bankName} />
          ))}
        </TabList>
      </Box>
      {
        accountsData.map((account, index) => (
          <TabPanel key={index} value={account.bankName}>
            <Typography
              variant="h6"
              color='primary'
            >
              Nombre en la Empresa
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              {account.companyName}
            </Typography>
            <Typography
              variant="h6"
              color='primary'
            >
              Entidad Bancaria
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              {account.bankName}
            </Typography>
            <Typography
              variant="h6"
              color='primary'
            >
              Número de cuenta
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              {account.accountNumber}
            </Typography>
            <Typography
              variant="h6"
              color='primary'
            >
              Tipo de cuenta
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              {
                account.AccountType === TransferAccountEnum.AHORROS ?
                  <FormattedMessage
                    id="paymentWay.transfer.type.1"
                    defaultMessage="Ahorros"
                  />
                  :
                  <FormattedMessage
                    id="paymentWay.transfer.type.2"
                    defaultMessage="Corriente"
                  />
              }
            </Typography>
            <Typography
              variant="h6"
              color='primary'
            >
              Cedula
            </Typography>

            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              {account.identityCard}
            </Typography>
          </TabPanel>
        ))
      }
    </TabContext>
  );
}