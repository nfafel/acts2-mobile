import { ImagePickerResponse } from "react-native-image-picker";

export interface INewItem {
    userId: string;
    images: ImagePickerResponse[];
    username: string;
    universityId: string;
    gender: string;
    brand: string;
    size: string;
    quality: number;
    value: string;
    clothingType: string;
}
