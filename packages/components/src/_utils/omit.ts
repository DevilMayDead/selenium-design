export default function omit<T extends object, K extends keyof T>(
  obj: T,
  fields: K[],
): Omit<T, K> {
  const shallowCopy = { ...obj };
  for (let i = 0; i < fields.length; i++) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
}
