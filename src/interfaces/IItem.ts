import { IImage } from ".";

export interface IItem {
    id: string;
    userId: string;
    username: string;
    universityId: string;
    images: IImage[];
    gender: string;
    quality: number;
    brand: string;
    size: string;
    value?: string;
    publicity: string;
    createdAt: Date;
    clothingType: string;
}
