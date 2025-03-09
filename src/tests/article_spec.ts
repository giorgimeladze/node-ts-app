import chai, { expect } from 'chai';
import chaiHttp from 'chai-http'; // Import chai-http plugin
import app from '../app';
import mongoose from 'mongoose';
import Article from '../models/article';
import { describe, it, before, after } from 'mocha';

// Use chai-http plugin
chai.use(chaiHttp);

// Fix TypeScript Error: Extend Chai with chai-http
declare module 'chai' {
  export interface ChaiStatic {
    request: ChaiHttp.Agent;
  }
}

describe('Article Routes', () => {
  let articleId: string;

  // ✅ Connect to DB and clear before tests
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI!);
    await Article.deleteMany({});
  });

  // ✅ Test POST /api/articles
  it('should create an article', async () => {
    const res = await chai
      .request(app) // ✅ No more TS error
      .post('/api/articles')
      .send({
        title: 'Test Article',
        content: 'This is a sample article with more than 10 characters.',
        author: 'John Doe',
      });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('title').equal('Test Article');

    articleId = res.body.id;
  });

  // ✅ Test GET /api/articles
  it('should retrieve all articles', async () => {
    const res = await chai.request(app).get('/api/articles');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
  });

  // ✅ Test GET /api/articles/:id
  it('should retrieve a single article', async () => {
    const res = await chai.request(app).get(`/api/articles/${articleId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('title').equal('Test Article');
  });

  // ✅ Test PUT /api/articles/:id
  it('should update an article', async () => {
    const res = await chai
      .request(app)
      .put(`/api/articles/${articleId}`)
      .send({ title: 'Updated Article' });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('title').equal('Updated Article');
  });

  // ✅ Test DELETE /api/articles/:id
  it('should delete an article', async () => {
    const res = await chai.request(app).delete(`/api/articles/${articleId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message').equal('Article deleted successfully');
  });

  // ✅ Disconnect from DB after tests
  after(async () => {
    await mongoose.connection.close();
  });
});
