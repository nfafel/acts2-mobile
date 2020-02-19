import { ILoginInfo } from '../interfaces/ILoginInfo';

const loginUser = async(values: ILoginInfo) => {
    const URL: string = process.env.URL || "http://localhost:5000";

    const userResponse = await fetch(`${URL}/user/login`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: values.username,
            password: values.password
        })
    });
    const body = await userResponse.json();

    if (userResponse.status !== 200) {
        var error: any = new Error(body.message);
        error.statusCode = userResponse.status;
        throw error;
    }

    return body.token;
}

export default loginUser;