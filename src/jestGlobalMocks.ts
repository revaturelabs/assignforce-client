import { of } from "rxjs/observable/of";
import { Curriculum } from "./app/model/Curriculum";

export const mockSettings = [
  {
    id: 1,
    alias: "global",
    trainersPerPage: 0,
    reportGrads: 22,
    batchLength: 10,
    reportIncomingGrads: 26,
    minBatchSize: 10,
    maxBatchSize: 20,
    trainerBreakDays: 14,
    defaultLocation: null,
    defaultBuilding: null,
    defaultNamePattern: "$y$m $mmm$d $c"
  },
];
export const mockSkills = [
  {
    id: 4,
    name: "AngularJ",
    isActive: true,
  },
  {
    id: 1,
    name: "Core Java",
    isActive: true,
  },
  {
    id: 2,
    name: "JUnit",
    isActive: true,
  },
  {
    id: 5,
    name: "Selenium/WebDriver",
    isActive: true,
  },
  {
    id: 3,
    name: "Spring",
    isActive: true,
  },
  {
    id: 6,
    name: "XYZ",
    isActive: true,
  },
  {
    id: 32,
    name: "Salesforce",
    isActive: true,
  },
  {
    id: 47,
    name: "Core SDET",
    isActive: true,
  },
  {
    id: 50,
    name: "Java Servlets",
    isActive: true,
  },
  {
    id: 51,
    name: "JSP",
    isActive: true,
  },
  {
    id: 78,
    name: "C++",
    isActive: true,
  },
  {
    id: 25,
    name: "Oracle SQL",
    isActive: true,
  },
  {
    id: 48,
    name: "JDBC",
    isActive: true,
  },
  {
    id: 49,
    name: "HTML",
    isActive: true,
  },
  {
    id: 52,
    name: "Freemarker",
    isActive: true,
  },
  {
    id: 53,
    name: "CSS",
    isActive: true,
  },
  {
    id: 54,
    name: "jQuery",
    isActive: true,
  },
  {
    id: 55,
    name: "Hibernate",
    isActive: true,
  },
  {
    id: 56,
    name: "REST",
    isActive: true,
  },
  {
    id: 57,
    name: "SOAP",
    isActive: true,
  },
  {
    id: 59,
    name: "ASP.NET MVC",
    isActive: true,
  },
  {
    id: 60,
    name: "ASP.NET WEB API",
    isActive: true,
  },
  {
    id: 58,
    name: "C#",
    isActive: true,
  },
  {
    id: 66,
    name: "ADO.NET",
    isActive: true,
  },
  {
    id: 62,
    name: "MSTest",
    isActive: true,
  },
  {
    id: 67,
    name: "T-SQL",
    isActive: true,
  },
  {
    id: 65,
    name: "Entity Framework",
    isActive: true,
  },
  {
    id: 63,
    name: "xUnit",
    isActive: true,
  },
  {
    id: 64,
    name: "NLog",
    isActive: true,
  },
  {
    id: 61,
    name: "IIS",
    isActive: true,
  },
  {
    id: 69,
    name: "TestNG",
    isActive: true,
  },
  {
    id: 72,
    name: "Manual Testing",
    isActive: true,
  },
  {
    id: 70,
    name: "Pyhton",
    isActive: true,
  },
  {
    id: 71,
    name: "UFT",
    isActive: true,
  },
  {
    id: 68,
    name: "Cucumber",
    isActive: true,
  },
  {
    id: 73,
    name: "C",
    isActive: true,
  },
  {
    id: 46,
    name: "Core .NET",
    isActive: true,
  },
  {
    id: 26,
    name: "Microservices",
    isActive: true,
  },
  {
    id: 27,
    name: "Big Data",
    isActive: true,
  },
  {
    id: 28,
    name: "Dynamics CRM",
    isActive: true,
  },
  {
    id: 29,
    name: "Oracle Fusion",
    isActive: true,
  },
  {
    id: 30,
    name: "PEGA",
    isActive: true,
  },
  {
    id: 79,
    name: "Go",
    isActive: true,
  },
];
export const mockCurriculum: Curriculum[] = [
  {
    id: 2,
    name: ".NET",
    isActive: true,
    isCore: true,
    skills: [
      {
        id: 59,
        name: "ASP.NET MVC",
        isActive: true,
      },
      {
        id: 60,
        name: "ASP.NET WEB API",
        isActive: true,
      },
      {
        id: 58,
        name: "C#",
        isActive: true,
      },
      {
        id: 66,
        name: "ADO.NET",
        isActive: true,
      },
      {
        id: 62,
        name: "MSTest",
        isActive: true,
      },
      {
        id: 65,
        name: "Entity Framework",
        isActive: true,
      },
      {
        id: 63,
        name: "xUnit",
        isActive: true,
      },
      {
        id: 64,
        name: "NLog",
        isActive: true,
      },
      {
        id: 61,
        name: "IIS",
        isActive: true,
      },
      {
        id: 46,
        name: "Core .NET",
        isActive: true,
      },
    ],
  },
  {
    id: 1,
    name: "Java",
    isActive: true,
    isCore: true,
    skills: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 4,
      },
      {
        id: 25,
      },
      {
        id: 48,
      },
      {
        id: 49,
      },
      {
        id: 50,
      },
      {
        id: 51,
      },
      {
        id: 52,
      },
      {
        id: 54,
      },
      {
        id: 55,
      },
      {
        id: 56,
      },
      {
        id: 57,
      },
    ],
  },
  {
    id: 3,
    name: "SDET",
    isActive: true,
    isCore: true,
    skills: [
      {
        id: 47,
      },
      {
        id: 68,
      },
      {
        id: 69,
      },
      {
        id: 5,
      },
      {
        id: 70,
      },
      {
        id: 71,
      },
      {
        id: 72,
      },
    ],
  },
  {
    id: 105,
    name: "Custom",
    isActive: true,
    isCore: true,
    skills: [],
  },
  {
    id: 25,
    name: "Appian",
    skills: [],
    isActive: true,
    isCore: false,
  },
  {
    id: 4,
    name: "Capital One",
    isActive: true,
    isCore: false,
    skills: [
      {
        id: 4,
      },
      {
        id: 3,
      },
      {
        id: 55,
      },
      {
        id: 56,
      },
    ],
  },
  {
    id: 64,
    name: "Testing",
    isActive: false,
    isCore: false,
    skills: [
      {
        id: 47,
      },
      {
        id: 50,
      },
      {
        id: 51,
      },
    ],
  },
  {
    id: 65,
    name: "Testing2",
    isActive: false,
    isCore: false,
    skills: [
      {
        id: 4,
      },
      {
        id: 47,
      },
      {
        id: 50,
      },
      {
        id: 51,
      },
    ],
  },
  {
    id: 24,
    name: "name",
    isActive: false,
    isCore: false,
    skills: [
      {
        id: 4,
      },
      {
        id: 1,
      },
      {
        id: 47,
      },
      {
        id: 50,
      },
      {
        id: 51,
      },
    ],
  },
  {
    id: 5,
    name: "Big Data",
    isActive: false,
    isCore: false,
    skills: [
      {
        id: 27,
      },
    ],
  },
  {
    id: 6,
    name: "Dynamics CRM",
    isActive: true,
    isCore: false,
    skills: [
      {
        id: 28,
      },
    ],
  },
  {
    id: 7,
    name: "PEGA",
    isActive: true,
    isCore: false,
    skills: [
      {
        id: 30,
      },
    ],
  },
  {
    id: 8,
    name: "Oracle Fusion",
    isActive: true,
    isCore: false,
    skills: [
      {
        id: 29,
      },
    ],
  },
  {
    id: 9,
    name: "GO",
    isActive: true,
    isCore: false,
    skills: [
      {
        id: 31,
      },
    ],
  },
  {
    id: 10,
    name: "Salesforce",
    skills: [],
    isActive: true,
    isCore: false,
  },
  {
    id: 44,
    name: "BA",
    isActive: true,
    isCore: false,
    skills: [],
  },
];
export const mockTrainers = [
  {
    firstName: "August",
    lastName: "Duet",
    email: "august.duet@revature.com",
    isActive: true,
    resume: null,
    id: 1,
    skills: [
      {
        id: 4,
      },
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 50,
      },
      {
        id: 51,
      },
      {
        id: 5,
      },
    ],
    preferredLocation: 4,
  },
  {
    id: 2,
    firstName: "Fred",
    lastName: "Belotte",
    isActive: true,
    resume: null,
    email: "fred.belotte@revature.com",
    skills: [],
  },
  {
    id: 37,
    firstName: "Blake",
    lastName: "Kruppa",
    isActive: true,
    resume: null,
    email: "",
    skills: [],
  },
  {
    id: 38,
    firstName: "Arun",
    lastName: "Kumar",
    isActive: true,
    resume: null,
    email: "",
    skills: [],
  },
  {
    id: 115,
    firstName: "Satish",
    lastName: "Reddy",
    isActive: true,
    resume: null,
    email: "",
    skills: [],
  },
];

export const sprintService = {
  getAll: jest.fn().mockImplementation(() => {
    return of([]);
  }),
};
export const finalProjectService = {
  findAll: jest.fn().mockImplementation(() => {
    return of([]);
  }),
};

export const batchService = {
  findAll: jest.fn().mockImplementation(() => {
    const batches = [
      {
        id: 740,
        name: "1803 Mar12 .NET",
        startDate: new Date("2018-04-11").getTime(),
        endDate: new Date("2018-06-17").getTime(),
        curriculum: 2,
        trainer: null,
        cotrainer: null,
        skills: [],
        location: 1,
        building: 1,
        room: 7,
        classSize: 21,
      },
      {
        id: 739,
        name: "1803 Mar12 .NET",
        startDate: new Date("2018-04-11").getTime(),
        endDate: new Date("2018-06-17").getTime(),
        curriculum: 174,
        trainer: 1,
        cotrainer: 2,
        skills: [],
        location: 1,
        building: 1,
        room: 7,
        classSize: 21,
      },
    ];
    return of(batches);
  }),
};

export const curriculumService = {
  findAll: jest.fn().mockImplementation(() => {
    return of(mockCurriculum);
  }),
  create: jest.fn(),
};

export const skillService = {
  findAll: jest.fn().mockImplementation(() => {
    return of(mockSkills);
  }),
  create: jest.fn(),
};

export const trainerService = {
  findAll: jest.fn().mockImplementation(() => {
    return of(mockTrainers);
  }),
  create: jest.fn().mockImplementation(() => {
    return of(mockTrainers);
  }),
};

export const settingsService = {
    find: jest.fn().mockImplementation(() => {
        return of(mockSettings);
    }),
};
