/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}

// interface Batch {
//   id: number;
//   name: string;
//   startDate: number;
//   endDate: number;
//   curriculum: Curriculum;
//   focus: Curriculum;
//   trainer: Trainer;
//   cotrainer: Trainer;
//   skills: Skill[];
//   batchStatus: BatchStatus;
//   batchLocation: BatchLocation;
// }
//
// interface BatchStatus {
//   batchStatusId: number;
//   batchStatusName: string;
// }
//
// interface BatchLocation {
//   id: number;
//   locationId: number;
//   locationName: string;
//   id: number;
//   name: string;
//   roomId: number;
//   name: string;
// }
//
// interface Building {
//   active: boolean;
//   id: number;
//   location: number;
//   name: string;
//   rooms: Room[];
// }
//
// interface Curriculum {
//   currId: number;
//   name: string;
//   core: boolean;
//   active: boolean;
//   skills: Skill[];
// }
//
// interface Location {
//   id: number;
//   name: string;
//   city: string;
//   state: string;
//   active: boolean;
//   buildings: Building[];
// }
//
// interface Room {
//   roomID: number;
//   active: boolean;
//   name: string;
//   building: number;
//   unavailabilities: Unavailability[];
// }
//
// interface Setting {
//   id: number;
//   trainersPerPage: number;
//   reportGrads: number;
//   batchLength: number;
//   reportIncomingGrads: number;
//   minBatchSize: number;
//   maxBatchSize: number;
//   trainerBreakDays: number;
//   defaultLocation: number;
//   defaultBuilding: number;
//   defaultNamePattern: string;
// }
//
// interface Skill {
//   id: number;
//   name: string;
//   active: boolean;
// }
//
// interface Trainer {
//   trainerId: number;
//   firstName: string;
//   lastName: string;
//   skills: Skill[];
//   certifications: any;
//   active: boolean;
//   resume: any;
//   unavailabilities: Unavailability[];
// }
//
// interface Unavailability {
//   id: number;
//   startDate: number;
//   endDate: number;
// }
