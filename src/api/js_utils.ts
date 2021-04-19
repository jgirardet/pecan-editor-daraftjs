export function htmlId(prefix: string = "pecan") {
  return Math.random().toString(36).replace("0.", prefix);
}
