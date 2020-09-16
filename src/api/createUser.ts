import { INewUser } from '../interfaces';
import {Platform} from 'react-native';

export const createUser = async(newUser: INewUser) => {
    // const host = "128.4.50.240";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:8000`;

    const userResponse = await fetch(`${URL}/user`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: newUser.username,
            password: newUser.password,
            universityId: newUser.universityId
        })
    })
    const userWithToken = await userResponse.json();

    if (userResponse.status !== 200) {
        const error: any = new Error(userWithToken.message);
        error.status = userResponse.status;
        throw error;
    }

    return userWithToken;
}
