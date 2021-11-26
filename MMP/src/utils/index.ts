import Decimal from "decimal.js";
import { nanoid } from "nanoid";

function isString(s) {
  return typeof s === "string" || s instanceof String;
}

export function fromDecimalValue(
  amount: number | string,
  decimals: number
): Decimal {
  const oldDecimal = new Decimal(amount);
  const newDecimal = oldDecimal.div(new Decimal(10).pow(decimals));
  return newDecimal;
}

export function toDecimalValue(
  amount: number | string,
  decimals: number
): Decimal {
  const oldDecimal = new Decimal(amount);
  const newDecimal = oldDecimal.mul(new Decimal(10).pow(decimals));

  return newDecimal;
}

export function isEthereumAddress(address: string) {
  return address.length === 42;
}

export function hideStr(str: string | number) {
  const newStr = str + "";
  if (newStr.length <= 10) {
    return str;
  }
  return newStr.substr(0, 6) + "..." + newStr.substr(-4);
}

export function unlessValue<T>(
  value,
  defaultValue: T,
  unlessValue: any = undefined
) {
  return value === unlessValue ? defaultValue : value;
}

export function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function fillUuid(data: { [key: string]: any }, key: string = "id") {
  if (!data[key]) {
    data[key] = nanoid();
  }

  return data;
}
