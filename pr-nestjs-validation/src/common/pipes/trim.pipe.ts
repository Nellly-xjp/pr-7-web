import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return this.trimRecursive(value);
  }

  private trimRecursive(value: any): any {
    if (typeof value === 'string') {
      return value.trim();
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.trimRecursive(item));
    }

    if (typeof value === 'object' && value !== null) {
      const trimmedObj: Record<string, any> = {};
      for (const key of Object.keys(value)) {
        trimmedObj[key] = this.trimRecursive(value[key]);
      }
      return trimmedObj;
    }

    return value;
  }
}