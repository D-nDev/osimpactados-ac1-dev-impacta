import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { IDateAdapter } from '@application/ports/IDateAdapter';
import moment from 'moment-timezone';

@singleton()
export default class MomentAdapter implements IDateAdapter {
  private readonly dateProvider = moment;

  public toUTC(date: any) {
    const utcdate = this.dateProvider.tz(date, 'UTC').format();
    return utcdate;
  }

  public compareUTCDate(date1: any, date2: any) {
    const dateIsAfter = this.dateProvider(date1).isAfter(this.dateProvider(date2));

    return dateIsAfter;
  }

  public compareWithCurrentUTCDate(date: any) {
    const now = this.toUTC(new Date());

    const dateIsAfter = this.dateProvider(now).isAfter(this.dateProvider(date));

    return dateIsAfter;
  }

  public addHoursToUTCDate(date: string, hours: number) {
    const newDate = this.dateProvider(date).add(hours, 'hours');

    return newDate.toISOString();
  }
}
