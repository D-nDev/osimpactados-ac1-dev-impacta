export interface IMemoryCacheAdapter {
  get: (key: string) => Promise<string | null>;
  getJson: <T>(key: string) => Promise<Awaited<T> | null>;
  set: (key: string, value: any, extime?: number) => Promise<boolean>;
  deleteKey: (key: string) => Promise<boolean>;
  getTTL: (key: string) => Promise<number>;
}
