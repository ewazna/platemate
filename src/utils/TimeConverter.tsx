import { TimeUnit } from "../models";

export class TimeConverter {
  private static minutesInHour = 60;
  private static hoursInDay = 24;
  private static minutesInDay = TimeConverter.minutesInHour * TimeConverter.hoursInDay;

  static toTimeAndUnit(minutes: number): { timeInUnit: number; timeUnit: TimeUnit } {
    let timeInUnit;
    let timeUnit;
    if (minutes <= TimeConverter.minutesInHour) {
      timeInUnit = minutes;
      timeUnit = TimeUnit.MIN;
    } else if (minutes > TimeConverter.minutesInHour && minutes <= TimeConverter.minutesInDay) {
      timeInUnit = minutes / TimeConverter.minutesInHour;
      timeUnit = TimeUnit.H;
    } else {
      timeInUnit = minutes / TimeConverter.minutesInHour / TimeConverter.hoursInDay;
      timeUnit = TimeUnit.DAYS;
    }

    return {
      timeInUnit,
      timeUnit,
    };
  }

  static toMinutes(timeInUnit: number, timeUnit: TimeUnit): number {
    let time;
    if (timeUnit === "min") {
      time = timeInUnit;
    } else if (timeUnit === "h") {
      time = timeInUnit * TimeConverter.minutesInHour;
    } else {
      time = timeInUnit * TimeConverter.minutesInDay;
    }
    return time;
  }
}
