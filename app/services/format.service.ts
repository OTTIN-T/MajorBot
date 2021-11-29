export default class FormatService {
  static formatSeconds(currentTime: number): string {
    const formatTime = new Date(currentTime * 1000)
      ?.toUTCString()
      ?.match(/(\d\d:\d\d:\d\d)/g)![0];

    return formatTime;
  }
}
