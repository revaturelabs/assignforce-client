const apiBaseUrl = 'https://assignforce.revaturelabs.com/assignforce-gateway-service-prod';

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
    redirectUri: 'https://assignforce.revaturelabs.com/callback',
    scope: 'openid profile'
  },

  apiUrls: {
    addressController: {
      baseUrl: `${apiBaseUrl}/locations/`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    batchController: {
      baseUrl: `${apiBaseUrl}/batches/`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    buildingController: {
      baseUrl: `${apiBaseUrl}/locations/building/`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    locationController: {
      baseUrl: `${apiBaseUrl}/locations/`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    roomController: {
      baseUrl: `${apiBaseUrl}/locations/room/`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    curriculumController: {
      baseUrl: `${apiBaseUrl}/curricula/`,
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
      baseUrl: `${apiBaseUrl}/skills/`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    trainerController: {
      baseUrl: `${apiBaseUrl}/trainers/`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    settingController: {
      baseUrl: `${apiBaseUrl}/settings/`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    unavailableController: {
      baseUrl: `${apiBaseUrl}/locations/unavailabilities`,
      create: '/',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },
    filehandlerController: {
      baseUrl: `${apiBaseUrl}/files/`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    }
  }
};
