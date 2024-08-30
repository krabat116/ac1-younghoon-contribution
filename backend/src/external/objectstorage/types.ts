

export type CreateObjectStorageItem = ReadableStream | ArrayBuffer | ArrayBufferView | string | null | Blob
export type ReadObjectStorageItem = R2ObjectBody | R2Object | null
/**
 * This is the abstract interface we will use to implement
 * object storage. For now we will implement an R2 version,
 * but may require an S3 or others.
 */
export interface IObjectStorageService {

    /**
     * Given an object name, return the object if found, otherwise throw an error
     */
    get(objectId:string):Promise<ReadObjectStorageItem>;

    put(objectId:string,data:CreateObjectStorageItem):void;
}


/**
 * A concrete object storage service implementation for
 * Cloudflare R2
 */
export class R2ObjectStorageService implements IObjectStorageService {
    private R2:R2Bucket;

    constructor(binding:R2Bucket){
        this.R2 = binding;
    }

    async get(objectId:string): Promise<ReadObjectStorageItem> {
        return await this.R2.get(objectId)
    }

    async put(objectId:string,data:CreateObjectStorageItem): Promise<void> {
        await this.R2.put(objectId,data)
    }
}


/**
 * 
 */
export function getObjectStorage(binding:R2Bucket){
    return new R2ObjectStorageService(binding)
}
