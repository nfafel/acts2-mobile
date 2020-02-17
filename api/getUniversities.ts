import { IUniversity } from '../interfaces/IUniversity';

const getUniversities = async(search: string) => {
    const URL: string = process.env.URL || "http://localhost:5000";
    try {
        const universitiesResponse = await fetch(`${URL}/university/${search}`);
        const body = await universitiesResponse.json();
        return body.universities;
        
    } catch(err) {
        console.log(err);
    }
}

export default getUniversities;