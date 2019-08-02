export const environment = {
  production: false,
  name: "local-server",
  // tslint:disable-next-line:comment-format
  baseUrl: "http://localhost:4200", //change this to https;

  appRoutes: {
    login: "login",
    overview: "overview",
    batches: "batches",
    locations: "locations",
    curricula: "curricula",
    trainers: "trainers",
    profile: "profile",
    reports: "reports",
    settings: "settings",
    callback: "callback",
    roomScheduler: "room-scheduler",
    finalProjects: "finalProjects",
    sprint: "sprint",
  },

  security_config: {
    roles: ["SVP of Technology", "Trainer"],
    groups: ["Operations"],
    permissions: [],
  },

  auth0: {
    namespace: "http://revature.com/",
    title: "AssignForce Login",
    // tslint:disable-next-line:comment-format
    clientId: "tjQhcs0O4mRV2iry6SAO0Gy1YQcBrWCa", //hydra
    domain: "revature.auth0.com",
    responseType: "token id_token",
    audience: "hydra-gateway",
    redirectUri: "http://localhost:4200/callback",
    scope: "openid profile",
  },

  apiUrls: {
    addressController: {
      baseUrl: "http://localhost:3000/addresses",
      create: "",
      update: "/",
      findAll: "",
      find: "/",
      remove: "/",
    },

    batchController: {
      baseUrl: "http://localhost:3000/batches",
      create: "",
      update: "/",
      findAll: "",
      find: "/",
      remove: "/",
    },

    buildingController: {
      baseUrl: "http://localhost:3000/buildings",
      create: "",
      update: "/",
      findAll: "",
      find: "/",
      remove: "/",
    },

    locationController: {
      baseUrl: "http://localhost:3000/addresses",
      create: "",
      update: "/",
      findAll: "",
      find: "/",
      remove: "/",
    },

    eventController: {
      baseUrl: "http://localhost:3000/events",
      create: "",
      update: "/",
      findAll: "",
      find: "/",
      remove: "/",
    },

    roomController: {
      baseUrl: "http://localhost:3000/rooms",
      create: "",
      update: "/",
      findAll: "",
      find: "/",
      remove: "/",
    },

    curriculumController: {
      baseUrl: "http://localhost:3000/curricula",
      create: "",
      update: "/",
      findAll: "",
      find: "/",
      remove: "/",
    },

    focusController: {
      baseUrl: "http://localhost:3000/curricula",
      create: "",
      update: "/",
      findAll: "",
      find: "/",
      remove: "/",
    },

    skillController: {
      baseUrl: "http://localhost:3000/skills",
      create: "",
      update: "/",
      findAll: "",
      find: "/",
      remove: "/",
    },

    trainerController: {
      baseUrl: "http://localhost:3000/trainers",
      create: "",
      update: "/",
      findAll: "",
      find: "/",
      remove: "/",
    },

    settingController: {
      baseUrl: "http://localhost:3000/settings",
      create: "",
      update: "/",
      findAll: "",
      find: "/",
      remove: "/",
    },

    unavailableController: {
      baseUrl: "http://localhost:3000/unavailables",
      create: "",
      update: "/",
      findAll: "",
      find: "/",
      remove: "/",
    },
    filehandlerController: {
      baseUrl: "api/filehandler",
      create: "",
      update: "/",
      findAll: "",
      find: "/",
      remove: "/",
    },
    finalProjectController: {
      baseUrl: "http://localhost:3000/finalProjects",
      create: "",
      update: "/",
      findAll: "",
      find: "/",
      remove: "/",
    },
    sprintService: {
      baseUrl: "api/sprint",
      create: "",
      update: "/",
      findAll: "",
      find: "/",
      remove: "/",
    },
  },
};
