import * as Yup from 'yup';

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
        .required('Required')
        .oneOf([Yup.ref('password'), null], "Passwords Don't Match"),
    value: Yup.string()
        .required('Required'),
    qualityRating: Yup.number()
        .required('Required'),
})