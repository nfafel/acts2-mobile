
const checkUsernameAvailability = async(username: string) => {
    const URL: string = process.env.URL || "http://localhost:5000";
    try {
        const userResponse = await fetch(`${URL}/user/${username}/availability`);
        const body = await userResponse.json();
        return body.available;
    } catch(err) {
        console.log(err);
    }
}

export default checkUsernameAvailability;