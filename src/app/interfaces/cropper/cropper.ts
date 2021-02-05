export interface CropperPosition {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export interface ImageCroppedEvent {
    base64?: string | null;
    file?: Blob | null;
    width: number;
    height: number;
    cropperPosition: CropperPosition;
    imagePosition: CropperPosition;
    offsetImagePosition?: CropperPosition;
}

export interface ImageTransform {
    scale?: number;
    rotate?: number;
    flipH?: boolean;
    flipV?: boolean;
}

export interface Dimensions {
    width: number;
    height: number;
}
