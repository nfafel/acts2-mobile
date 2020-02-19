import React from 'react';
import {Component} from 'react';
import { View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { Formik } from 'formik';

import { storeJWT } from '../redux/actions';
import { connect } from 'react-redux';
import createAccountValidationSchema from '../validationSchemas/createAccountValidationSchema';
import checkUsernameAvailability from '../api/checkUsernameAvailability';
import createUser from '../api/createUser';
import UniversitySelector from './UniversitySelector';
import { IUser } from '../interfaces/IUser';

const jwtDecode = require('jwt-decode');

type CreateAccountProps = {
    cancel: Function,
    loginUser: Function
}

class CreateAccount extends Component<CreateAccountProps> {

    async attemptCreateAccount(newUser: IUser) {
        const available: boolean = await checkUsernameAvailability(newUser.username);
        if (!available) {
            Alert.alert("Username already taken");
        } else {
            const token: string = await createUser(newUser);
            this.props.loginUser(token);
        }
    }

    render() {
        return (
            <View>
                <Formik
                    initialValues = {{username: '', password: '', confirmationPassword: '', universityId: null}}
                    validationSchema={createAccountValidationSchema}
                    onSubmit = {(values) => this.attemptCreateAccount({username: values.username, password: values.password, universityId: values.universityId})}
                >
                    {({values, errors, submitForm, handleChange, touched, setFieldValue}) => 
                        <View style={{marginHorizontal: 20}} >
                            <Text style={{fontSize: 25, margin: 7, textAlign: "center"}}>Create Account</Text>
                            <KeyboardAvoidingView style={{marginTop: 15, marginBottom: 10}}>
                                <View style={{flexDirection: "column", justifyContent: "center", borderWidth: 0.5, borderRadius: 3, backgroundColor: "#f7f7f7", height: 50 }} >
                                    {(values.username !== '') && <Text style={{marginLeft: 5, color: "grey"}}>Username:</Text>}
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
                            <KeyboardAvoidingView>
                                <View style={{borderWidth: 0.5, borderRadius: 3, backgroundColor: "#f7f7f7", height: 50, flexDirection: "column", justifyContent: "center"}} >
                                    {(values.password !== '') && <Text style={{marginLeft: 5, color: "grey"}}>Password:</Text>}
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

                            <KeyboardAvoidingView style={{marginVertical: 10}}>
                                <View style={{borderWidth: 0.5, borderRadius: 3, backgroundColor: "#f7f7f7", height: 50, flexDirection: "column", justifyContent: "center"}} >
                                    {(values.confirmationPassword !== '') && <Text style={{marginLeft: 5, color: "grey"}}>Confirm password:</Text>}
                                    <TextInput 
                                        onChangeText={handleChange('confirmationPassword')}
                                        value={values.confirmationPassword}
                                        placeholder="Confirm password" 
                                        secureTextEntry
                                        style={{marginLeft: 5, fontSize: 16}}
                                    />
                                </View>
                                {(errors.confirmationPassword && touched.confirmationPassword) &&
                                    <Text style={{color: 'red'}}>{errors.confirmationPassword}</Text>
                                }
                            </KeyboardAvoidingView>

                            <UniversitySelector setFieldValue={setFieldValue} values={values} errors={errors} touched={touched} />
                            
                            <View style={{marginHorizontal: 20, marginVertical: 10 }}>
                                <TouchableOpacity style={{flexDirection:"row", justifyContent: "center", backgroundColor: '#2595f7', borderRadius: 3, height: 40 }} onPress={() => submitForm()} >
                                    <Text style={{flexDirection: "column", alignSelf: "center", fontSize: 17, color: "white"}}>Create Account</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={{flexDirection:"row", justifyContent: "center"}} onPress={() => this.props.cancel()} >
                                <Text style={{color: "blue", fontSize: 17}}>Cancel</Text>
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
            const decoded = jwtDecode(token);
            dispatch( storeJWT({
                token: token, 
            }))
        },
    }
}
  
export default connect(null, mapDispatchToProps)(CreateAccount);
