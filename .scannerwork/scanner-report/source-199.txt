// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  name: 'prod.in-mem-db',
  baseUrl: 'http://localhost:4200',

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
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile'
  },

  apiUrls: {
    addressController: {
      baseUrl: 'https://hydra.cfapps.io/api/addresses',
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    batchController: {
      baseUrl: 'https://hydra.cfapps.io/api/batches',
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    buildingController: {
      baseUrl: 'https://hydra.cfapps.io/api/buildings',
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    locationController: {
      baseUrl: 'https://hydra.cfapps.io/api/locations',
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    roomController: {
      baseUrl: 'https://hydra.cfapps.io/api/rooms',
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    curriculumController: {
      baseUrl: 'https://hydra.cfapps.io/api/curricula',
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    focusController: {
      baseUrl: 'https://hydra.cfapps.io/api/focuses',
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    skillController: {
      baseUrl: 'https://hydra.cfapps.io/api/skills',
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    trainerController: {
      baseUrl: 'https://hydra.cfapps.io/api/trainers',
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    settingController: {
      baseUrl: 'https://hydra.cfapps.io/api/assignforce-settings',
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    },

    unavailableController: {
      baseUrl: 'https://hydra.cfapps.io/api/unavailables',
      create: '',
      update: '/',
      findAll: '',
      find: '/',
      remove: '/'
    }
  }
};
