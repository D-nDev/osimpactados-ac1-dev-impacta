export interface IDateAdapter {
  toUTC: (date: any) => string;
  compareUTCDate: (date1: any, date2: any) => boolean;
  compareWithCurrentUTCDate: (date: any) => boolean;
  addHoursToUTCDate: (date: string, hours: number) => string;
}
