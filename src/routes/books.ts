import { BookController } from "../controller/BookController";
import { CreateBookDTO } from "../request/books/create-book.dto";
import { UpdateBookDTO } from "../request/books/update-book.dto";
import { RouteMethodEnum } from "../types/routes";

/**
 * All Book routes.
 */
export const BookRoutes = [
    {
        path: "/book",
        method: RouteMethodEnum.GET,
        controller: BookController,
        action: 'getMany'
    },
    {
        path: "/book/:id",
        method: RouteMethodEnum.GET,
        controller: BookController,
        action: 'getOne'
    },
    {
        path: "/book",
        request: CreateBookDTO,
        method: RouteMethodEnum.POST,
        controller: BookController,
        action: 'create'
    },
    {
        path: "/book/:id",
        request: UpdateBookDTO,
        method: RouteMethodEnum.PUT,
        controller: BookController,
        action: 'update'
    },
    {
        path: "/book/:id",
        method: RouteMethodEnum.DELETE,
        controller: BookController,
        action: 'delete'
    }
];