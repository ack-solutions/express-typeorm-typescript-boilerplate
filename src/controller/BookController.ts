import { Request } from "express";
import { HttpException } from "../core/http.exception";
import { BookService } from "../services/book.service";

export class BookController {

    private bookService: BookService;

    constructor() {
        this.bookService = new BookService()
    }

    async getMany() {
        const books = await this.bookService.getMany();
        return books;
    }

    getOne(request: Request) {
        const id = Number(request.params.id)

        const book = this.bookService.getOne(id);

        if (!book) {
            throw new HttpException(404, 'Book not found');
        }

        return book;
    }

    create(request: Request) {
        return this.bookService.create(request.body)
    }

    update(request: Request) {
        const id = Number(request.params.id)
        return this.bookService.update(id, request.body);
    }

    async delete(request: Request) {
        const id = Number(request.params.id)
        await this.bookService.delete(id);
        return {
            message: 'Book Successfully deleted'
        };
    }
}