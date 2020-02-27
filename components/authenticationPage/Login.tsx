import React from 'react';
import {Component} from 'react';
import { View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Alert, SafeAreaView } from 'react-native';
import { Formik } from 'formik';

import { storeJWT } from '../../redux/actions';
import { connect } from 'react-redux';
import loginValidationSchema from '../../validationSchemas/loginValidationSchema';
import loginUser from '../../api/loginUser';
import { ILoginInfo } from '../../interfaces/ILoginInfo';

type LoginProps = {
    loginUser: Function,
    navigation: any
}

class Login extends Component<LoginProps> {

    async attemptLogin(values: ILoginInfo) {
        try {
            const token: string = await loginUser(values);
            if (token) {
                this.props.loginUser(token); //Storing token in redux
                this.props.navigation.navigate("AuthenticatedStack");
            }
        } catch(err) {
            if (err.statusCode === 403) {
                if (err.message === "username") {
                    Alert.alert("The username you entered is not registered.");
                } else if (err.message === "password") {
                    Alert.alert("The password you entered is not correct.");
                }
            } else {
                Alert.alert(err.message);
                console.log(err);
            }
        }
    }

    render() {
        return (
            <View style={{flex: 0.8, justifyContent: "center"}}>
                <Formik
                    initialValues = {{username: '', password: ''}}
                    validationSchema={loginValidationSchema}
                    onSubmit = {(values) => this.attemptLogin(values)}
                >
                    {({values, errors, submitForm, handleChange, touched}) => 
                        <View >
                            <Text style={{fontSize: 25, margin: 7, textAlign: "center"}}>Login</Text>
                            <KeyboardAvoidingView style={{marginHorizontal: 20, marginTop: 15, marginBottom: 10}}>
                                <View style={{flexDirection: "column", justifyContent: "center", borderWidth: 0.5, borderRadius: 3, backgroundColor: "#f7f7f7", height: 50 }} >
                                    <TextInput 
                                        placeholder="Username"
                                        onChangeText={handleChange('username')}
                                        value={values.username}
                                        style={{marginLeft: 5, fontSize: 16}}
                                    />
                                </View>
                                {(errors.username && touched.username) &&
                                    <Text style={{color: 'red'}}>{errors.username}</Text>
                                }
                            </KeyboardAvoidingView>
                            <KeyboardAvoidingView style={{marginHorizontal: 20}}>
                                <View style={{borderWidth: 0.5, borderRadius: 3, backgroundColor: "#f7f7f7", height: 50, flexDirection: "column", justifyContent: "center"}} >
                                    <TextInput 
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        placeholder="Password" 
                                        secureTextEntry
                                        style={{marginLeft: 5, fontSize: 16}}
                                    />
                                </View>
                                {(errors.password && touched.password) &&
                                    <Text style={{color: 'red'}}>{errors.password}</Text>
                                }
                            </KeyboardAvoidingView>
                            
                            <View style={{marginHorizontal: 20, marginVertical: 10 }}>
                                <TouchableOpacity style={{flexDirection:"row", justifyContent: "center", backgroundColor: '#2595f7', borderRadius: 3, height: 40 }} onPress={() => submitForm()} >
                                    <Text style={{flex: 1, flexDirection: "column", alignSelf: "center", textAlign: "center", fontSize: 17, color: "white"}}>Login</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{flexDirection: "row", justifyContent: 'center'}} onPress={() => this.props.navigation.navigate("Registration")}>
                                <Text style={{color: "blue"}} >Create an Account</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </Formik>
            </View>
        )
    }
}

const mapDispatchToProps = function(dispatch: any) {
    return {
        loginUser: (token: string) => {
            dispatch( storeJWT({
                token: token, 
            }))
        },
    }
}
  
export default connect(null, mapDispatchToProps)(Login);