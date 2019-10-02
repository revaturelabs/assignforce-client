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
      baseUrl: `${apiBaseUrl}/assignforce-location-service-prod/locations`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    batchController: {
      baseUrl: `${apiBaseUrl}/assignforce-batch-service-prod/batches`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    buildingController: {
      baseUrl: `${apiBaseUrl}/assignforce-location-service-prod/locations/building`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    locationController: {
      baseUrl: `${apiBaseUrl}/assignforce-location-service-prod/locations`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    roomController: {
      baseUrl: `${apiBaseUrl}/assignforce-location-service-prod/locations/room`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    curriculumController: {
      baseUrl: `${apiBaseUrl}/assignforce-curriculum-service-prod/curricula`,
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
      baseUrl: `${apiBaseUrl}/assignforce-skill-service-prod/skills`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    trainerController: {
      baseUrl: `${apiBaseUrl}/assignforce-trainer-service-prod/trainers`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    settingController: {
      baseUrl: `${apiBaseUrl}/assignforce-setting-service-prod/settings`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    unavailableController: {
      baseUrl: `${apiBaseUrl}/assignforce-location-service-prod/locations/unavailabilities`,
      create: '/',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },
    filehandlerController: {
      baseUrl: `${apiBaseUrl}/assignforce-filehandler-service-prod/files`,
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    }
  }
};
