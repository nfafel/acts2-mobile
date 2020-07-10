import { Platform } from 'react-native';

export const getItemsByUniversity= async(universityId: string) => {
    // const host = "128.4.92.211";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:8000`;

    const universityItemsResponse = await fetch(`${URL}/item/${universityId}/university`);
    const universityItems = await universityItemsResponse.json();

    if (universityItemsResponse.status !== 200) {
        var error: any = new Error(universityItems.message);
        error.statusCode = universityItemsResponse.status;
        throw error;
    }
    
    return universityItems;
}
