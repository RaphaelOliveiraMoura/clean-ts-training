export function removeProps(object: object, propsToRemove: string[] = []) {
  const draft = { ...object };
  propsToRemove.forEach((prop) => delete draft[prop]);
  return draft;
}
