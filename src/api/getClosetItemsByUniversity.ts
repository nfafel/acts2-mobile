import { Platform } from 'react-native';

const getClosetItemsByUniversity= async(universityId: string) => {
    // const host = "128.4.92.211";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:8000`;

    const universityClosetResponse = await fetch(`${URL}/closetItem/university/${universityId}`);
    const body = await universityClosetResponse.json();

    if (universityClosetResponse.status !== 200) {
        var error: any = new Error(body.message);
        error.statusCode = universityClosetResponse.status;
        throw error;
    }
    
    return body.closetItems;
}

export default getClosetItemsByUniversity;
