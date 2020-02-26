import { IUser } from '../interfaces/IUser';
import {Platform} from 'react-native';

const createUser = async(newUser: IUser) => {
    // const host = "128.4.50.240";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:5000`;

    try {
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
        const body = await userResponse.json();
        return body.token;
    } catch(err) {
        console.log(err);
    }
}

export default createUser;