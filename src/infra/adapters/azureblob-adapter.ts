import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { IUploadProvider } from '@application/ports/IUploadProvider';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import CannotUploadFileException from '../errors/CannotUploadFileException';

type BlobArray = Array<{
  blob: number;
  url: string;
}>;

@singleton()
export default class AzureBlobAdapter implements IUploadProvider {
  private readonly storageName: string = process.env.AZURE_STORAGE_NAME ?? '';
  private readonly storageKey: string = process.env.AZURE_BLOB_SHARED_KEY ?? '';
  private readonly finalKey: StorageSharedKeyCredential = new StorageSharedKeyCredential(
    this.storageName,
    this.storageKey,
  );
  private readonly blobUrl: string = `https://${this.storageName}.blob.core.windows.net`;
  private readonly storageClient = new BlobServiceClient(this.blobUrl, this.finalKey);
  private readonly containerName: string = process.env.AZURE_BLOB_CONTAINER_NAME ?? 'usersphoto';
  private readonly blobClient = this.storageClient.getContainerClient(this.containerName);

  public async getFiles() {
    const blobsResult: BlobArray = [];

    let i = 1;
    const blobs = this.blobClient.listBlobsFlat();
    for await (const blob of blobs) {
      blobsResult.push({
        blob: i,
        url: `${this.blobUrl}/${this.containerName}/${blob.name}`,
      });
      i++;
    }
    return blobsResult;
  }

  public async fileExists(name: string) {
    return await this.blobClient.getBlobClient(name).exists();
  }

  public async getfileUrl(name: string) {
    const blobexists = await this.fileExists(name);

    if (blobexists) {
      return this.blobClient.getBlobClient(name).url;
    }
    return null;
  }

  public async uploadFile(file: Buffer, type: string) {
    try {
      const blobName = uuidv4();

      const blockBlobClient = this.blobClient.getBlockBlobClient(blobName);

      const uploadBlobResponse = await blockBlobClient.upload(file, file.length, {
        blobHTTPHeaders: { blobContentType: type },
      });

      if (uploadBlobResponse.requestId && !uploadBlobResponse.errorCode) {
        return `${this.blobUrl}/${this.containerName}/${blobName}`;
      }
      throw new CannotUploadFileException('ERROR_UPLOAD_FILE');
    } catch (e: any) {
      throw new CannotUploadFileException('ERROR_UPLOAD_FILE');
    }
  }
}
