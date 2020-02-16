import { ILoginInfo } from '../interfaces/ILoginInfo';

const createUser = async(values: ILoginInfo) => {
    const URL: string = process.env.URL || "http://localhost:5000";
    try {
        const userResponse = await fetch(`${URL}/user`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password
            })
        })
        const body = await userResponse.json();
        console.log(body);
        return body.token;
    } catch(err) {
        console.log(err);
    }
}

export default createUser;