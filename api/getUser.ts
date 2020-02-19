import { IUser } from '../interfaces/IUser';

const getUser = async(username: string) => {
    const URL: string = process.env.URL || "http://localhost:5000";
    try {
        const userResponse = await fetch(`${URL}/user/${username}`)
        const body = await userResponse.json();
        return body.user;
    } catch(err) {
        console.log(err);
    }
}

export default getUser;