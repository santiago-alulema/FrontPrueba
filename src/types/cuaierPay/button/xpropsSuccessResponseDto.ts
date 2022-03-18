import { TIPO_IDENTIFICACION_CLIENTE } from "../client";

export interface XpropsSuccessResponseDto {
    transactionID: string,
    registerDate: Date,
    reference: string,
    aditionalData: Object,
    clientTransactionId: string,
    paymentDate: Date,
    clientID: string,
    clientIdentification: string,
    clientIdentificationType: TIPO_IDENTIFICACION_CLIENTE,
    clientName: string,
    clientLastName: string,
    clientPhoneNumber: string,
    clientAddress: string,
    clientMail: string,
    voucherNumber: number,
    value: number,
    totalValue: number,
    authCode: string,
    batchNo: string,
    referenceNo: string,
    card: string,
    bank: string,
    last4Digits: string
}