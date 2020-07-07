import { ILoginInfo } from '../interfaces/ILoginInfo';
import { Platform } from 'react-native';

const loginUser = async(values: ILoginInfo) => {
    // const host = "128.4.92.211";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:8000`;

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
