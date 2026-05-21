import { PipeTransform, Injectable, ArgumentMetadata, Logger } from '@nestjs/common';

@Injectable()
export class LifecyclePipe implements PipeTransform {
  private readonly logger = new Logger('Lifecycle');

  transform(value: any, metadata: ArgumentMetadata) {
    const fieldType = metadata.type;   // 'body', 'query', 'param'
    const metatype = metadata.metatype?.name || 'Unknown'; // Tên class DTO, vd: 'CreateAppointmentDto'
    const fields = value && typeof value === 'object' ? Object.keys(value).join(', ') : String(value);

    this.logger.log(
      `4. [Pipe] Validate ${fieldType} (${metatype}) | Fields: [${fields}]`
    );
    return value;
  }
}
