import { Unavailability } from './Unavailability';
import { Skill } from './Skill';

export class DocumentFile {
  fileName: String;
  type: String;
  size: Number;
  fileContent: String;

  constructor(
    fileName: String,
    type: String,
    size: Number,
    fileContent: String
  ) {
    this.fileName = fileName;
    this.type = type;
    this.size = size;
    this.fileContent = fileContent;
  }
}
