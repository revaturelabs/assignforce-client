exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],
    params: {
        login: {
            email: 'test.trainer@revature.com',
            password: 'p@$$w0rd123'
        },
        svpLogin: {
            email: 'svp@revature.com'
        }
    }
}