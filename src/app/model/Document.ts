import { Unavailability } from './Unavailability';
import { Skill } from './Skill';
import { DocumentFile } from './DocumentFile';

export class Document {
  trainerID: Number;
  category: String;
  file: DocumentFile;

  constructor(
    trainerID: Number,
    category: String,
    file: DocumentFile
  ) {
    this.trainerID = trainerID;
    this.category = category;
    this.file = file;
  }
}
