import { IUUIDAdapter } from '@app/application/ports/IUUIDAdapter';
import { v4 as uuidv4 } from 'uuid';

export default class UUIDProvider implements IUUIDAdapter {
  public generateUUID() {
    return uuidv4();
  }
}
