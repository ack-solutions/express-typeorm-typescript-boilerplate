import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../core/base.dto";

export class CreateBookDTO extends BaseDTO {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  isbn: string;
}