import { of } from 'rxjs/observable/of';

export const batchService = {
  findAll: jest.fn().mockImplementation(() => {
    const batches = [
      {
        id: 740,
        name: '1803 Mar12 .NET',
        startDate: new Date('2018-04-11').getTime(),
        endDate: new Date('2018-06-17').getTime(),
        curriculum: 2,
        trainer: null,
        cotrainer: null,
        skills: [],
        location: 1,
        building: 1,
        room: 7,
        classSize: 21
      },
      {
        id: 739,
        name: '1803 Mar12 .NET',
        startDate: new Date('2018-04-11').getTime(),
        endDate: new Date('2018-06-17').getTime(),
        curriculum: 174,
        trainer: 1,
        cotrainer: 2,
        skills: [],
        location: 1,
        building: 1,
        room: 7,
        classSize: 21
      }
    ];
    return of(batches);
  })
};

export const curriculumService = {
  findAll: jest.fn().mockImplementation(() => {
    return of(mockCurriculum);
  })
};

export const skillService = {
  findAll: jest.fn().mockImplementation(() => {
    return of(mockSkills);
  })
};

export const trainerService = {
  findAll: jest.fn().mockImplementation(() => {
    return of(mockTrainers);
  }),
  create: jest.fn().mockImplementation(() => {
    return of(mockTrainers);
  })
};

export const settingsService = {
    find: jest.fn().mockImplementation(() => {
        return of(mockSettings);
    })
}

export const mockSettings = [
  {
    id: 1,
    alias: 'global',
    trainersPerPage: 0,
    reportGrads: 22,
    batchLength: 10,
    reportIncomingGrads: 26,
    minBatchSize: 10,
    maxBatchSize: 20,
    trainerBreakDays: 14,
    defaultLocation: null,
    defaultBuilding: null,
    defaultNamePattern: '$y$m $mmm$d $c'
  }
];
export const mockSkills = [
  {
    skillId: 4,
    skillName: 'AngularJ',
    isActive: true
  },
  {
    skillId: 1,
    skillName: 'Core Java',
    isActive: true
  },
  {
    skillId: 2,
    skillName: 'JUnit',
    isActive: true
  },
  {
    skillId: 5,
    skillName: 'Selenium/WebDriver',
    isActive: true
  },
  {
    skillId: 3,
    skillName: 'Spring',
    isActive: true
  },
  {
    skillId: 6,
    skillName: 'XYZ',
    isActive: true
  },
  {
    skillId: 32,
    skillName: 'Salesforce',
    isActive: true
  },
  {
    skillId: 47,
    skillName: 'Core SDET',
    isActive: true
  },
  {
    skillId: 50,
    skillName: 'Java Servlets',
    isActive: true
  },
  {
    skillId: 51,
    skillName: 'JSP',
    isActive: true
  },
  {
    skillId: 78,
    skillName: 'C++',
    isActive: true
  },
  {
    skillId: 25,
    skillName: 'Oracle SQL',
    isActive: true
  },
  {
    skillId: 48,
    skillName: 'JDBC',
    isActive: true
  },
  {
    skillId: 49,
    skillName: 'HTML',
    isActive: true
  },
  {
    skillId: 52,
    skillName: 'Freemarker',
    isActive: true
  },
  {
    skillId: 53,
    skillName: 'CSS',
    isActive: true
  },
  {
    skillId: 54,
    skillName: 'jQuery',
    isActive: true
  },
  {
    skillId: 55,
    skillName: 'Hibernate',
    isActive: true
  },
  {
    skillId: 56,
    skillName: 'REST',
    isActive: true
  },
  {
    skillId: 57,
    skillName: 'SOAP',
    isActive: true
  },
  {
    skillId: 59,
    skillName: 'ASP.NET MVC',
    isActive: true
  },
  {
    skillId: 60,
    skillName: 'ASP.NET WEB API',
    isActive: true
  },
  {
    skillId: 58,
    skillName: 'C#',
    isActive: true
  },
  {
    skillId: 66,
    skillName: 'ADO.NET',
    isActive: true
  },
  {
    skillId: 62,
    skillName: 'MSTest',
    isActive: true
  },
  {
    skillId: 67,
    skillName: 'T-SQL',
    isActive: true
  },
  {
    skillId: 65,
    skillName: 'Entity Framework',
    isActive: true
  },
  {
    skillId: 63,
    skillName: 'xUnit',
    isActive: true
  },
  {
    skillId: 64,
    skillName: 'NLog',
    isActive: true
  },
  {
    skillId: 61,
    skillName: 'IIS',
    isActive: true
  },
  {
    skillId: 69,
    skillName: 'TestNG',
    isActive: true
  },
  {
    skillId: 72,
    skillName: 'Manual Testing',
    isActive: true
  },
  {
    skillId: 70,
    skillName: 'Pyhton',
    isActive: true
  },
  {
    skillId: 71,
    skillName: 'UFT',
    isActive: true
  },
  {
    skillId: 68,
    skillName: 'Cucumber',
    isActive: true
  },
  {
    skillId: 73,
    skillName: 'C',
    isActive: true
  },
  {
    skillId: 46,
    skillName: 'Core .NET',
    isActive: true
  },
  {
    skillId: 26,
    skillName: 'Microservices',
    isActive: true
  },
  {
    skillId: 27,
    skillName: 'Big Data',
    isActive: true
  },
  {
    skillId: 28,
    skillName: 'Dynamics CRM',
    isActive: true
  },
  {
    skillId: 29,
    skillName: 'Oracle Fusion',
    isActive: true
  },
  {
    skillId: 30,
    skillName: 'PEGA',
    isActive: true
  },
  {
    skillId: 79,
    skillName: 'Go',
    isActive: true
  }
];
export const mockCurriculum = [
  {
    id: 2,
    name: '.NET',
    isActive: true,
    isCore: 1,
    skills: [
      {
        skillId: 59,
        skillName: 'ASP.NET MVC',
        isActive: true
      },
      {
        skillId: 60,
        skillName: 'ASP.NET WEB API',
        isActive: true
      },
      {
        skillId: 58,
        skillName: 'C#',
        isActive: true
      },
      {
        skillId: 66,
        skillName: 'ADO.NET',
        isActive: true
      },
      {
        skillId: 62,
        skillName: 'MSTest',
        isActive: true
      },
      {
        skillId: 65,
        skillName: 'Entity Framework',
        isActive: true
      },
      {
        skillId: 63,
        skillName: 'xUnit',
        isActive: true
      },
      {
        skillId: 64,
        skillName: 'NLog',
        isActive: true
      },
      {
        skillId: 61,
        skillName: 'IIS',
        isActive: true
      },
      {
        skillId: 46,
        skillName: 'Core .NET',
        isActive: true
      }
    ]
  },
  {
    id: 1,
    name: 'Java',
    isActive: true,
    isCore: 1,
    skills: [
      {
        skillId: 1
      },
      {
        skillId: 2
      },
      {
        skillId: 3
      },
      {
        skillId: 4
      },
      {
        skillId: 25
      },
      {
        skillId: 48
      },
      {
        skillId: 49
      },
      {
        skillId: 50
      },
      {
        skillId: 51
      },
      {
        skillId: 52
      },
      {
        skillId: 54
      },
      {
        skillId: 55
      },
      {
        skillId: 56
      },
      {
        skillId: 57
      }
    ]
  },
  {
    id: 3,
    name: 'SDET',
    isActive: true,
    isCore: 1,
    skills: [
      {
        skillId: 47
      },
      {
        skillId: 68
      },
      {
        skillId: 69
      },
      {
        skillId: 5
      },
      {
        skillId: 70
      },
      {
        skillId: 71
      },
      {
        skillId: 72
      }
    ]
  },
  {
    id: 105,
    name: 'Custom',
    isActive: true,
    isCore: 1,
    skills: []
  },
  {
    id: 25,
    name: 'Appian',
    skills: []
  },
  {
    id: 4,
    name: 'Capital One',
    isActive: true,
    isCore: 0,
    skills: [
      {
        skillId: 4
      },
      {
        skillId: 3
      },
      {
        skillId: 55
      },
      {
        skillId: 56
      }
    ]
  },
  {
    id: 64,
    name: 'Testing',
    isActive: false,
    isCore: 0,
    skills: [
      {
        skillId: 47
      },
      {
        skillId: 50
      },
      {
        skillId: 51
      }
    ]
  },
  {
    id: 65,
    name: 'Testing2',
    isActive: false,
    isCore: 0,
    skills: [
      {
        skillId: 4
      },
      {
        skillId: 47
      },
      {
        skillId: 50
      },
      {
        skillId: 51
      }
    ]
  },
  {
    id: 24,
    name: 'name',
    isActive: false,
    isCore: 0,
    skills: [
      {
        skillId: 4
      },
      {
        skillId: 1
      },
      {
        skillId: 47
      },
      {
        skillId: 50
      },
      {
        skillId: 51
      }
    ]
  },
  {
    id: 5,
    name: 'Big Data',
    isActive: false,
    isCore: 0,
    skills: [
      {
        skillId: 27
      }
    ]
  },
  {
    id: 6,
    name: 'Dynamics CRM',
    isActive: true,
    isCore: 0,
    skills: [
      {
        skillId: 28
      }
    ]
  },
  {
    id: 7,
    name: 'PEGA',
    isActive: true,
    isCore: 0,
    skills: [
      {
        skillId: 30
      }
    ]
  },
  {
    id: 8,
    name: 'Oracle Fusion',
    isActive: true,
    isCore: 0,
    skills: [
      {
        skillId: 29
      }
    ]
  },
  {
    id: 9,
    name: 'GO',
    isActive: true,
    isCore: 0,
    skills: [
      {
        skillId: 31
      }
    ]
  },
  {
    id: 10,
    name: 'Salesforce',
    skills: []
  },
  {
    id: 44,
    name: 'BA',
    isActive: true,
    isCore: 0,
    skills: []
  }
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
        skillId: 4
      },
      {
        skillId: 1
      },
      {
        skillId: 2
      },
      {
        skillId: 50
      },
      {
        skillId: 51
      },
      {
        skillId: 5
      }
    ],
    preferredLocation: 4
  },
  {
    "id": 2,
    "firstName": "Fred",
    "lastName": "Belotte",
    "isActive": true,
    "resume": null,
    "email": "fred.belotte@revature.com",
    "skills": []
  },
  {
    id: 37,
    firstName: "Blake",
    lastName: "Kruppa",
    isActive: true,
    resume: null,
    email: "",
    skills: []
  },
  {
    id: 38,
    firstName: "Arun",
    lastName: "Kumar",
    isActive: true,
    resume: null,
    email: "",
    skills: []
  },
  {
    id: 115,
    firstName: "Satish",
    lastName: "Reddy",
    isActive: true,
    resume: null,
    email: "",
    skills: []
  }
]
