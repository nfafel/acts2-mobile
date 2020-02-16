import React from 'react';
import {Component} from 'react';
import { View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';

import { storeJWT } from '../redux/actions';
import { connect } from 'react-redux';
import loginValidationSchema from '../validationSchemas/loginValidationSchema';
import loginUser from '../api/loginUser';
const jwtDecode = require('jwt-decode');

class Login extends Component {
    render() {
        return (
            <View>
                <Formik
                    initialValues = {{username: '', password: ''}}
                    validationSchema={loginValidationSchema}
                    onSubmit = {(values) => loginUser(values)}
                >
                    {({values, errors, submitForm, handleChange}) => 
                        <View >
                            <Text style={{fontSize: 25, margin: 7, textAlign: "center"}}>Login</Text>
                            <KeyboardAvoidingView style={{marginHorizontal: 20, marginTop: 15, marginBottom: 10}}>
                                <View style={{flexDirection: "column", justifyContent: "center", borderWidth: 0.5, borderRadius: 3, backgroundColor: "#f7f7f7", height: 50 }} >
                                    <TextInput 
                                        placeholder="username"
                                        onChangeText={handleChange('username')}
                                        value={values.username}
                                        style={{marginLeft: 5}}
                                    />
                                </View>
                                {errors.username &&
                                    <Text style={{color: 'red'}}>{errors.username}</Text>
                                }
                            </KeyboardAvoidingView>
                            <KeyboardAvoidingView style={{marginHorizontal: 20}}>
                                <View style={{borderWidth: 0.5, borderRadius: 3, backgroundColor: "#f7f7f7", height: 50, flexDirection: "column", justifyContent: "center"}} >
                                    <TextInput 
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        placeholder="password" 
                                        secureTextEntry
                                        style={{marginLeft: 5}}
                                    />
                                </View>
                                {errors.password &&
                                    <Text style={{color: 'red'}}>{errors.password}</Text>
                                }
                            </KeyboardAvoidingView>
                            
                            <View style={{marginHorizontal: 20, marginVertical: 10 }}>
                                <TouchableOpacity style={{flexDirection:"row", justifyContent: "center", backgroundColor: '#2595f7', borderRadius: 3, height: 40 }} onPress={() => submitForm()} >
                                    <Text style={{flex: 1, flexDirection: "column", alignSelf: "center", textAlign: "center", fontSize: 17, color: "white"}}>Login</Text>
                                </TouchableOpacity>
                            </View>
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
            const decoded = jwtDecode(token);
            dispatch( storeJWT({
                token: token, 
            }))
        },
    }
}
  
export default connect(null, mapDispatchToProps)(Login);
