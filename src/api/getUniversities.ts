import { IUniversity } from '../interfaces/IUniversity';
import {Platform} from 'react-native';

const getUniversities = async(search: string) => {
    // const host = "128.4.50.240";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:8000`;

    try {
        const universitiesResponse = await fetch(`${URL}/university/${search}`);
        const body = await universitiesResponse.json();
        return body.universities;
        
    } catch(err) {
        console.log(err);
    }
}

export default getUniversities;
