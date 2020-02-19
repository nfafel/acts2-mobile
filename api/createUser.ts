import { IUser } from '../interfaces/IUser';

const createUser = async(newUser: IUser) => {
    const URL: string = process.env.URL || "http://localhost:5000";
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