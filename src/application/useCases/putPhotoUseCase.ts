import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';
import { IUploadProvider } from '../ports/IUploadProvider';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import { PhotoDto } from '../ports/dtos/putPhotoDto';

export default class PutPhotoUseCase implements useCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly uploadProvider: IUploadProvider,
    private readonly jwtadapter: ITokenAdapter,
  ) {}

  async execute(userToken: string, rawPhoto: PhotoDto) {
    const token = this.jwtadapter.decode(userToken);

    const upload = await this.uploadProvider.uploadFile(rawPhoto.buffer, rawPhoto.mimetype);

    const result = await this.userRepo.updatePhoto(token.id, upload);

    return result;
  }
}
