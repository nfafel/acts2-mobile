import { Platform } from 'react-native';

export const getMessagesByChat= async(chatId: string) => {
    // const host = "128.4.92.211";  //This is used for debugging on actual device
    const host: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
    const URL: string = process.env.URL || `http://${host}:8000`;

    const messagesResponse = await fetch(`${URL}/message?chatId=${chatId}`);
    const messages = await messagesResponse.json();

    if (messagesResponse.status !== 200) {
        var error: any = new Error(messages.message);
        error.statusCode = messages.status;
        throw error;
    }
    
    return messages;
}
