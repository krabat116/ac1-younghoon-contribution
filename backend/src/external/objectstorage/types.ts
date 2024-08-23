
/**
 * This is the abstract interface we will use to implement
 * object storage. For now we will implement an R2 version,
 * but may require an S3 or others.
 */
export interface IObjectStorageService {
    get():void;
    create():void;
}


/**
 * A concrete object storage service implementation for
 * Cloudflare R2
 */
export class R2ObjectStorageService implements IObjectStorageService {

    get(): void {
        
    }

    create(): void {
        
    }
}