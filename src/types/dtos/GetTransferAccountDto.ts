import { TransferAccountEnum } from 'enums/TransferAccountEnum';

export type GetTransferAccountDto = {
  companyName: string;
  bankName: string;
  accountNumber: string;
  AccountType: TransferAccountEnum;
  identityCard: string;
};
