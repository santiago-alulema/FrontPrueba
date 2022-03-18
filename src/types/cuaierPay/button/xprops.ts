import { ClientesDto } from "../client";
import { XpropsErrorResponseDto } from "./xpropsErrorResponseDto";
import { XpropsSuccessResponseDto } from "./xpropsSuccessResponseDto";

export interface Xprops {
    env: string,
    clientTransactionId: string,
    merchantId: string,
    amountWithTax: number,
    amountWithoutTax: number,
    taxAmount: number,
    reference: string,
    aditionalData: object,
    clientID: string,
    clientInfo: ClientesDto,
    skipCheckout: boolean,
    onSuccess: (response: XpropsSuccessResponseDto) => void,
    onError: (response: XpropsErrorResponseDto) => void,
    close?: () => void
}