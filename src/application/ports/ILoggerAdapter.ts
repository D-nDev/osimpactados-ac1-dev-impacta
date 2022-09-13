export interface ILoggerAdapter {
  error: (msg: string, data: any) => void;
  info: (msg: string, data: any) => void;
  warn: (msg: string, data: any) => void;
  debug: (msg: string, data: any) => void;
}
