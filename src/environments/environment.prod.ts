const baseApiUrl = 'https://rev-gateway.cfapps.io/';

export const environment = {
  production: true,
  name: 'prod',
  baseUrl: 'https://assignforce.cfapps.io',

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
    callback: 'callback'
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
    redirectUri: 'https://assignforce.cfapps.io/callback',
    scope: 'openid profile'
  },

  apiUrls: {
    addressController: {
      baseUrl: baseApiUrl + 'location-service',
      create: '/',
      update: '/',
      findAll: '/',
      find: '/',
      remove: '/'
    },

    batchController: {
      baseUrl: baseApiUrl + 'batch-service',
      create: '/',
      update: '/',
      findAll: '/',
      find: '/',
      remove: '/'
    },

    buildingController: {
      baseUrl: baseApiUrl + 'location-service/building',
      create: '/',
      update: '/',
      findAll: '/',
      find: '/',
      remove: '/'
    },

    locationController: {
      baseUrl: baseApiUrl + 'location-service',
      create: '/',
      update: '/',
      findAll: '/',
      find: '/',
      remove: '/'
    },

    roomController: {
      baseUrl: baseApiUrl + 'location-service/room',
      create: '/',
      update: '/',
      findAll: '/',
      find: '/',
      remove: '/'
    },

    curriculumController: {
      baseUrl: baseApiUrl + 'curriculum-service',
      create: '/',
      update: '/',
      findAll: '/',
      find: '/',
      remove: '/'
    },

    focusController: {
      baseUrl: baseApiUrl + 'focus-service',
      create: '/',
      update: '/',
      findAll: '/',
      find: '/',
      remove: '/'
    },

    skillController: {
      baseUrl: baseApiUrl + 'skill-service',
      create: '/',
      update: '/',
      findAll: '/',
      find: '/',
      remove: '/'
    },

    trainerController: {
      baseUrl: baseApiUrl + 'trainer-service',
      create: '/',
      update: '/',
      findAll: '/',
      find: '/',
      remove: '/'
    },

    settingController: {
      baseUrl: baseApiUrl + 'setting-service',
      create: '/',
      update: '/',
      findAll: '/',
      find: '/',
      remove: '/'
    },

    unavailableController: {
      baseUrl: baseApiUrl + 'location-service/unavailable',
      create: '/',
      update: '/',
      findAll: '/',
      find: '/',
      remove: '/'
    },
    filehandlerController: {
      baseUrl: 'api/filehandler',
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    }
  }
};
