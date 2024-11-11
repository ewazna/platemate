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

  static toApproximateTimeString(minutes: number): string {
    if (minutes <= TimeConverter.minutesInHour) {
      return `${minutes} ${TimeUnit.MIN}`;
    } else if (minutes > TimeConverter.minutesInHour && minutes <= TimeConverter.minutesInDay) {
      const hours = minutes / TimeConverter.minutesInHour;
      const floored = Math.floor(hours);
      if (hours - floored) {
        return `${"\u2248"} ${floored} ${TimeUnit.H}`;
      } else {
        return `${floored} ${TimeUnit.H}`;
      }
    } else {
      const days = minutes / TimeConverter.minutesInHour / TimeConverter.hoursInDay;
      const floored = Math.floor(days);
      if (days - floored) {
        return `${"\u2248"} ${floored} ${TimeUnit.DAYS}`;
      } else {
        return `${floored} ${TimeUnit.DAYS}`;
      }
    }
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
