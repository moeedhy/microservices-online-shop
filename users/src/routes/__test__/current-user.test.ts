import request from "supertest";
import {app} from "../../app";

it('should return 200 if user is looged in',async function () {
    const cookie = await signin();
    const response = await request(app).get('/api/v1/users/currentuser').set('Cookie',cookie).send().expect(200);
    expect(response.body.currentUser).toBeDefined();
    expect(response.body.currentUser.phone).toEqual('+989155555555');


});


it('should return 422 if user is not looged in',async function () {

  const response = await request(app).get('/api/v1/users/currentuser').send().expect(200);
  expect(response.body.currentUser).not.toBeDefined();



});

