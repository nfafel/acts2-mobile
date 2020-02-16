import { ILoginInfo } from '../interfaces/ILoginInfo';

const loginUser = async(values: ILoginInfo) => {
    const URL: string = process.env.URL || "http://localhost:5000";
    try {
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
        })
        const body = await userResponse.json();
        console.log(body);
    } catch(err) {
        console.log(err);
    }
}

export default loginUser;