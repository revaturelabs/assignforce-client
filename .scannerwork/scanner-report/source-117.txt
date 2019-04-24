export interface Service {
  create(object: any);
  update(object: any);
  findAll();
  remove(object: any);
  find(object: any);
}
