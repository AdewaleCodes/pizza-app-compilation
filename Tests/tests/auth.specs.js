//requiring dependencies
const request = require('supertest') 
 const { connect } = require('./database') 
 const UserModel = require('../models/userModel') 
 const app = require('../index'); 
  
 describe('Auth: Signup', () => { 
     let conn; 
  
     beforeAll(async () => { 
         conn = await connect() 
     }) 
  
     afterEach(async () => { 
         await conn.cleanup() 
     }) 
  
     afterAll(async () => { 
         await conn.disconnect() 
     }) 
            //signing up
     it('should signup a user', async () => { 
         const response = await request(app).post('/signup') 
         .set('content-type', 'application/json') 
         .send({  
             username: 'LAG',  
             password: 'AnewDEv001',  
             firstName: 'Lucifer', 
             lastName: 'MorningStar', 
             email: 'StillLagging@mail.com' 
         }) 
  
         expect(response.status).toBe(201) 
         expect(response.body).toHaveProperty('message') 
         expect(response.body).toHaveProperty('user') 
         expect(response.body.user).toHaveProperty('username', 'LAG') 
         expect(response.body.user).toHaveProperty('firstname', 'Lucifer') 
         expect(response.body.user).toHaveProperty('lastname', 'MorningStar') 
         expect(response.body.user).toHaveProperty('email','StillLagging@mail.com' )         
     }) 
  
  //signing in
     it('should signin a user', async () => { 
         // create user in out db 
         const user = await UserModel.create({ username: 'LAG', password : 'nolaptop' });

         //user signin
         const response = await request(app)
         .post('/signin')
         .set('content-type', 'application/json')
          .send({
            username: 'LAG',
            password : 'nolaptop' 
          });

          expect(response.status).toBe(200)
          expect(response.body).toHaveProperty('token')
        })
    })