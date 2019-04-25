import { Building } from './Building';
import { Address } from './Address';

export class Setting {
  id: number;
  trainersPerPage: number;
  reportGrads: number;
  batchLength: number;
  reportIncomingGrads: number;
  minBatchSize: number;
  maxBatchSize: number;
  trainerBreakDays: number;
  defaultLocation: Address;
  defaultBuilding: Building;
  defaultNamePattern: string;

  constructor(
    id: number,
    trainersPerPage: number,
    reportGrads: number,
    batchLength: number,
    reportIncomingGrads: number,
    minBatchSize: number,
    maxBatchSize: number,
    trainerBreakDays: number,
    defaultLocation: Address,
    defaultBuilding: Building,
    defaultNamePattern: string
  ) {
    this.id = id;
    this.trainersPerPage = trainersPerPage;
    this.reportGrads = reportGrads;
    this.batchLength = batchLength;
    this.reportIncomingGrads = reportIncomingGrads;
    this.minBatchSize = minBatchSize;
    this.maxBatchSize = maxBatchSize;
    this.trainerBreakDays = trainerBreakDays;
    this.defaultLocation = defaultLocation;
    this.defaultBuilding = defaultBuilding;
    this.defaultNamePattern = defaultNamePattern;
  }
}
