import { Subscription } from 'rxjs/internal/Subscription';

export class FileUploadModel{
    data: File;
    state: string;
    inProgress: boolean;
    progresss: number;
    canRetry: boolean;
    canCancel: boolean;
    sub?: Subscription;

}
