export function valueToBoolean(value: any): boolean {
  if (typeof value  === "string") {
    return /^(true|1)$/i.test(value);
  }

  if (typeof value === "number") {
    return value === 1;
  }

  if (typeof value === "boolean") {
    return value;
  }

  return false;
}
