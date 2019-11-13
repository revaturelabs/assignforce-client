import { Unavailability } from './Unavailability';
import { Skill } from './Skill';
import { DocumentFile } from './DocumentFile';
import { Document } from "./Document";

export class DocumentAndID {
  document: Document;
  id: Number;

  constructor(
    id: Number,
    document: Document
  ) {
    this.id = id;
    this.document = document;
  }
}
