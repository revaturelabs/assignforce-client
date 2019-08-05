export class Sprint {
  id: number;
  name: string;
  description: string;
  sprint: Sprint[];
  constructor(
    id: number,
    name: string,
    description: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
