export class Sprint {
  id: number;
  name: string;
  body: string;
  isClosed: boolean;

  constructor(
    id: number,
    name: string,
    body: string,
    isClosed: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.body = body;
    this.isClosed = isClosed;
  }
}
