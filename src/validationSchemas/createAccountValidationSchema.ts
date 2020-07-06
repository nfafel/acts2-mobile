import * as Yup from 'yup';

export default Yup.object().shape({
    username: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required'),
    confirmationPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], "Passwords Don't Match"),
    universityId: Yup.string()
        .required('Required'),
});
