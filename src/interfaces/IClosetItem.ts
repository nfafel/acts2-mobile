export interface IClosetItem {
    id: string;
    userId: string;
    username: string;
    universityId: string;
    images: string[]; //Change to IImage[]
    gender: string;
    quality: number;
    brand: string;
    size: string;
    value?: string;
    publicity: string;
    createdAt: Date;
    clothingType: string;
}
