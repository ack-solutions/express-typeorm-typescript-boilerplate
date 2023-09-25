import { Book } from "../entity/Book";
import { getRepository } from "../utils/database";
import { HttpException } from "../core/http.exception";
import { omit } from "lodash";
import { FindManyOptions, FindOneOptions } from "typeorm";

export class BookService {
  private bookRepository = getRepository(Book)

  async getMany(options?: FindManyOptions<Book>): Promise<Book[]> {
    const books = await this.bookRepository.find(options);
    return books;
  }

  async getOne(id: number, options?: FindOneOptions<Book>): Promise<Book> {
    const book = await this.bookRepository.findOne({ ...options, where: { id } });
    return book;
  }

  async create(entity: Partial<Book>): Promise<Book> {
    const book = this.bookRepository.create(entity)
    await this.bookRepository.save(book);
    return book;
  }

  async update(id: number, entity: Partial<Book>) {

    const book = await this.bookRepository.findOneBy({ id });

    if (!book) {
      throw new HttpException(400, "Book not Found");
    }

    const updateData = omit(entity, ['id', 'isbn', 'createdAt', 'updatedAt'])

    for (const key in updateData) {
      if (Object.prototype.hasOwnProperty.call(updateData, key)) {
        book[key] = updateData[key];
      }
    }

    await this.bookRepository.save(book);

    return book;
  }

  async delete(id: number) {

    const isDeleteDate = this.bookRepository.metadata.columns.filter((column) => column.isDeleteDate)?.length > 0

    if (isDeleteDate) {
      return await this.bookRepository.softDelete(id)
    } else {
      return await this.bookRepository.delete(id);
    }
  }
}

