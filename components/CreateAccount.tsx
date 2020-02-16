import React from 'react';
import {Component} from 'react';
import { View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { Formik } from 'formik';

import { storeJWT } from '../redux/actions';
import { connect } from 'react-redux';
import createAccountValidationSchema from '../validationSchemas/createAccountValidationSchema';
import checkUsernameAvailability from '../api/checkUsernameAvailability';
import createUser from '../api/createUser';

const jwtDecode = require('jwt-decode');

class CreateAccount extends Component {

    async attemptCreateAccount(username: string, password: string) {
        console.log(username)
        const available: boolean | undefined = await checkUsernameAvailability(username);
        console.log(available);
        if (!available) {
            Alert.alert("Username already taken");
        } else {
            const token: string | undefined = await createUser({username, password});
        }
    }

    render() {
        return (
            <View>
                <Formik
                    initialValues = {{username: '', password: '', confirmationPassword: '', universityId: null}}
                    validationSchema={createAccountValidationSchema}
                    onSubmit = {(values) => this.attemptCreateAccount(values.username, values.password)}
                >
                    {({values, errors, submitForm, handleChange}) => 
                        <View >
                            <Text style={{fontSize: 25, margin: 7, textAlign: "center"}}>Create Account</Text>
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
                            <KeyboardAvoidingView style={{marginHorizontal: 20}}>
                                <View style={{borderWidth: 0.5, borderRadius: 3, backgroundColor: "#f7f7f7", height: 50, flexDirection: "column", justifyContent: "center"}} >
                                    <TextInput 
                                        onChangeText={handleChange('confirmationPassword')}
                                        value={values.confirmationPassword}
                                        placeholder="confirm password" 
                                        secureTextEntry
                                        style={{marginLeft: 5}}
                                    />
                                </View>
                                {errors.confirmationPassword &&
                                    <Text style={{color: 'red'}}>{errors.confirmationPassword}</Text>
                                }
                            </KeyboardAvoidingView>

                            {/* <KeyboardAvoidingView style={{marginHorizontal: 20}}>
                                <View style={{borderWidth: 0.5, borderRadius: 3, backgroundColor: "#f7f7f7", height: 50, flexDirection: "column", justifyContent: "center"}} >
                                    <TextInput
                                        onChangeText={handleChange('confirmationPassword')}
                                        value={values.confirmationPassword}
                                        placeholder="confirm password" 
                                        secureTextEntry
                                        style={{marginLeft: 5}}
                                    />
                                </View>
                                {errors.confirmationPassword &&
                                    <Text style={{color: 'red'}}>{errors.password}</Text>
                                }
                            </KeyboardAvoidingView> */}
                            
                            <View style={{marginHorizontal: 20, marginVertical: 10 }}>
                                <TouchableOpacity style={{flexDirection:"row", justifyContent: "center", backgroundColor: '#2595f7', borderRadius: 3, height: 40 }} onPress={() => submitForm()} >
                                    <Text style={{flex: 1, flexDirection: "column", alignSelf: "center", textAlign: "center", fontSize: 17, color: "white"}}>Create Account</Text>
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
  
export default connect(null, mapDispatchToProps)(CreateAccount);
