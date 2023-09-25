import request from 'supertest';
import { app } from '../src/index';

// describe('BookService', () => {
//   let bookService: BookService;

//   beforeAll(() => {
//     bookService = new BookService(); // Initialize your BookService instance
//   });

//   it('should list only one book after creating two and deleting one', async () => {
//     // Create two books
//     const book1 = { id: 1, title: 'Book 1', author: 'Author 1' };
//     const book2 = { id: 2, title: 'Book 2', author: 'Author 2' };

//     await  bookService.create(book1);
//     await bookService.create(book2);

//     // Delete one book
//     await bookService.delete(2); // Assuming you are deleting book with ID 2

//     // Get all books
//     const books = await bookService.getMany();

//     // Expectation: There should be only one book in the list
//     expect(books.length).toBe(1);

//     // Verify that the remaining book is the one you expect
//     expect(books[0]).toEqual(book1);
//   });
// });


describe('Book API Tests', () => {
  let createdBookId;

  it('Should Create book', (done) => {
   
    const newBook = {
      title: 'New Book',
      isbn: '1234',
    };

    app.then((server) => {
      request(server)
        .post('/book')
        .send(newBook)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          createdBookId = res.body.id
          expect(res.body.title).toBe(newBook.title);
          expect(res.body.isbn).toBe(newBook.isbn);
          done();
        });
    });
  })


  it('Should retrieve book list', (done) => {
    app.then((server) => {
      request(server)
        .get('/book')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          done();
        });
    });
  })

  it('Should retrieve book by id', (done) => {
    app.then((server) => {
      request(server)
        .get(`/book/${createdBookId}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.id).toBe(createdBookId);
          done();
        });
    });
  })

  it('Should update book title', (done) => {

    const updatedBook = {
      title: 'Updated Book',
    };

    app.then((server) => {
      request(server)
        .put(`/book/${createdBookId}`)
        .send(updatedBook)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.title).toBe(updatedBook.title);
          done();
        });
    });
  })


  it('Should not update book isbn', (done) => {
    const updatedBook = {
      isbn: '12345',
    };
    app.then((server) => {
      request(server)
        .put(`/book/${createdBookId}`)
        .send(updatedBook)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  })


  it('Should delete book', (done) => {
    app.then(async (server) => {
      await request(server)
        .delete(`/book/${createdBookId}`)
        .expect(200)

      // Verify that the book has been deleted (by trying to retrieve it)
      request(server)
        .get(`/book/${createdBookId}`)
        .expect(404)
      
      done();
    });
  })
});