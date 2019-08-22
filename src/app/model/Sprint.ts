export class Sprint {
  constructor(public id: number,
              public url: string,
              public body: string,
              public state: string,
              public created_at: Date,
              public updated_at: Date,
              public columns_url: string,
              public name: string) {}
}
