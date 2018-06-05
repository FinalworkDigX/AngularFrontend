import { ServerCpu } from './server-cpu';
import { ServerMemory } from './server-memory';

export class ServerInformation {
  cpu: ServerCpu;
  memory: ServerMemory;


  constructor(cpu: ServerCpu = new ServerCpu(), memory: ServerMemory = new ServerMemory()) {
    this.cpu = cpu;
    this.memory = memory;
  }
}
