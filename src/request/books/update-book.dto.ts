import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../core/base.dto";

export class UpdateBookDTO extends BaseDTO {

  @IsNotEmpty()
  title: string;

}