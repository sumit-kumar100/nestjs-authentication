import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
  HttpException,
} from "@nestjs/common";

@Injectable()
export class UuidValidationPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    const uuidRegex =
      /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

    if (!uuidRegex.test(value)) {
      throw new HttpException("Invalid ID format", HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
