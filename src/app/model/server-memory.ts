export class ServerMemory {
  totalMemory: string;
  freeMemory: string;
  availableMemory: string;


  constructor(totalMemory: string = '', freeMemory: string = '', availableMemory: string = '') {
    this.totalMemory = totalMemory;
    this.freeMemory = freeMemory;
    this.availableMemory = availableMemory;
  }
}
