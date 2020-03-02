import * as Yup from 'yup';
import {IClothingType} from '../interfaces/IClothingType';

export default Yup.object().shape({
    images: Yup.array()
        .required('Required'),
    publicity: Yup.string()
        .required('Required'),
    gender: Yup.string()
        .required('Required'),
    brand: Yup.string()
        .required('Required'),
    size: Yup.string()
        .required('Required'),
    value: Yup.string()
        .required('Required'),
    quality: Yup.number()
        .required('Required'),
    clothingType: Yup.mixed()
        .required("Required")
        .test("Clothing Type Test", "Required", (clothingType: IClothingType) => {
            if (clothingType.name !== "Select") {
                return true;
            }
            return false;
        })
        .required("Required"),
})