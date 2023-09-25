import { Entity, Column } from "typeorm";
import { BaseEntity } from "../core/base.entity";

@Entity('books')
export class Book extends BaseEntity {
    @Column()
    title: string;

    @Column()
    isbn: string;
}