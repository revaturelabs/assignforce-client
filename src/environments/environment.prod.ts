const apiBaseUrl = 'https://api.assignforce.revaturelabs.com/';

export const environment = {
  production: true,
  name: 'prod',
  baseUrl: 'https://assignforce.revaturelabs.com',

  appRoutes: {
    login: 'login',
    overview: 'overview',
    batches: 'batches',
    locations: 'locations',
    curricula: 'curricula',
    trainers: 'trainers',
    profile: 'profile',
    reports: 'reports',
    settings: 'settings',
    callback: 'callback',
    finalProjects: 'finalProjects'
  },

  security_config: {
    roles: ['SVP of Technology', 'Trainer'],
    groups: ['Operations'],
    permissions: []
  },

  auth0: {
    namespace: 'https://revature.com/',
    title: 'AssignForce Login',
    clientId: 'tjQhcs0O4mRV2iry6SAO0Gy1YQcBrWCa', //hydra
    domain: 'revature.auth0.com',
    responseType: 'token id_token',
    audience: 'hydra-gateway',
    redirectUri: 'https://assignforce.revaturelabs.com/callback',
    scope: 'openid profile'
  },

  apiUrls: {
    addressController: {
      baseUrl: `${apiBaseUrl}/location-service`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    batchController: {
      baseUrl: `${apiBaseUrl}/batch-service`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    buildingController: {
      baseUrl: `${apiBaseUrl}/location-service/building`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    locationController: {
      baseUrl: `${apiBaseUrl}/location-service`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    roomController: {
      baseUrl: `${apiBaseUrl}/location-service/room`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    curriculumController: {
      baseUrl: `${apiBaseUrl}/curriculum-service`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    focusController: {
      baseUrl: 'api/focus',
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    skillController: {
      baseUrl: `${apiBaseUrl}/skill-service`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    trainerController: {
      baseUrl: `${apiBaseUrl}/trainer-service`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    settingController: {
      baseUrl: `${apiBaseUrl}/setting-service`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    unavailableController: {
      baseUrl: `${apiBaseUrl}/location-service/unavailabilities`,
      create: '/',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },
    filehandlerController: {
      baseUrl: `${apiBaseUrl}/filehandler-service`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },
    finalProjectController: {
      baseUrl: `${apiBaseUrl}/final-projects`,
      create: '/',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    }
  }
};
