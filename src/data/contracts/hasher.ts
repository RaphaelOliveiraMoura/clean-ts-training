export interface Hasher {
  encode: (data: any) => Promise<string>;
}
