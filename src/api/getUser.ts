import { IUser } from '../interfaces/IUser';
import {Platform} from 'react-native';

const getUser = async(username: string) => {
    // const host = "128.4.50.240";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:5000`;

    try {
        const userResponse = await fetch(`${URL}/user/${username}`)
        const body = await userResponse.json();
        return body.user;
    } catch(err) {
        console.log(err);
    }
}

export default getUser;
