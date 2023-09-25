import { validate } from "class-validator";
import { BookRoutes } from "./books";
import { Request, Response } from "express";
import { RouteMethodEnum } from "../types/routes";
import { HttpException } from "../core/http.exception";

const Routes = [
  ...BookRoutes,
]

export const setupRoutes = (app) => {
  Routes.forEach(route => {
    const controller = new route.controller()
    app[route.method](route.path, async (request: Request, response: Response, next: Function) => {
      try {
        if (route.request) {
          const body = route.method === (RouteMethodEnum.GET || RouteMethodEnum.DELETE) ? request.query : request.body;
          const dto = new route.request(body)
          const errors = await validate(dto, {
            whitelist: true,
            forbidNonWhitelisted: true
          });
          if (errors?.length) {
            const errorMenages = {}
            errors?.forEach(({ property, constraints }) => {
              errorMenages[property] = Object.values(constraints)
            })
            throw new HttpException(400, errorMenages);
            //response.status(400).send(errorMenages);
            return
          }
        }
        const data = await controller[route.action](request, response);
        response.json(data)
      } catch (error) {
        if (error instanceof HttpException) {
          response.status(error.statusCode).send({ statusCode: error.statusCode, message: error.message });
        } else {
          response.status(500).send({ statusCode: 500, message: error.message || error });
        }
      }
    });
  });
}