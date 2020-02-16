import React, {useState} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AuthenticationForm from './AuthenticationForm';
import CreateAccount from './CreateAccount';

const LoginPage: React.FC= () => {
    const [createAccountOpen, setCreateAccountOpen] = useState<boolean>(false);
  
    return (
        <View style={{display: "flex", flexDirection: "column", justifyContent: "center", height: "90%"}}>
            {!createAccountOpen ? 
                (<View> 
                    <AuthenticationForm /> 
                    <TouchableOpacity style={{flexDirection: "row", justifyContent: 'center'}} onPress={() => setCreateAccountOpen(true)}>
                        <Text style={{color: "blue"}} >Create an Account</Text>
                    </TouchableOpacity>
                </View>)
                :
                (<CreateAccount />)
            }
        </View>
    );
};

export default LoginPage;