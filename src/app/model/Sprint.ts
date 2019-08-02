export class Sprint {
  id: number;
  name: string;
  description: string;
  isClosed: boolean;
  isOpened: boolean;

  constructor(
    id: number,
    name: string,
    description: string,
    isClosed: boolean,
    isOpened: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isClosed = isClosed;
    this.isOpened = isOpened;
  }
}
