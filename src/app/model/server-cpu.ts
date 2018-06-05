export class ServerCpu {
  name: string;
  maxClockSpeed: string;
  currentClockSpeed: string;
  temperature: string;
  loadPercentage: string;

  constructor(name: string = '', maxClockSpeed: string = '', currentClockSpeed: string = '', temperature: string = '', loadPercentage: string = '') {
    this.name = name;
    this.maxClockSpeed = maxClockSpeed;
    this.currentClockSpeed = currentClockSpeed;
    this.temperature = temperature;
    this.loadPercentage = loadPercentage;
  }
}
