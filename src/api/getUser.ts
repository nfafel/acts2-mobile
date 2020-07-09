import { IUser } from '../interfaces';
import {Platform} from 'react-native';

const getUser = async(userId: string): Promise<IUser | undefined> => {
    // const host = "128.4.50.240";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:8000`;

    try {
        const userResponse = await fetch(`${URL}/user/${userId}`);
        const user = await userResponse.json();

        if (userResponse.status !== 200) {
            const error: any = new Error(user.message);
            error.status = userResponse.status;
            throw error;
        }

        return user;
    } catch(err) {
        console.log(err);
    }
}

export default getUser;
