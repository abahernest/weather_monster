const request = require('supertest')
const app = require('../../../app');
let token;

beforeEach(() => {
    jest.useFakeTimers()
    //jest.setTimeout(50000)
})

beforeAll(() => {
    test('should login user', async ()=> {
        const response = await request(app)
        .post('/api/v1/users/login')
        .send ({
          email: "johndoe@gmail.com",
          password: 'password',
        })
        .expect(200)
        token = response.body.token
     })
});


test('should fetch all users', async() => {
    await request(app)
    .get('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .expect(401)
  });

  
// test('should fetch all users', async() => {
// await request(app)
// .get('/api/v1/users')
// .set('Authorization', `Bearer ${token}`)
// .expect(401)
// // .then(res => {
// //     expect(res.statusCode).toEqual(200);
// // });
// });
