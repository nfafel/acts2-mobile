import React from 'react';
import {Component} from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import { Text, Form, Item, Input, Label } from 'native-base';
import {vh, vw} from '../../css/viewportUnits';
import { storeJWT } from '../../redux/actions';
import { connect } from 'react-redux';
import loginValidationSchema from '../../validationSchemas/loginValidationSchema';
import loginUser from '../../api/loginUser';
import { ILoginInfo } from '../../interfaces/ILoginInfo';

type LoginProps = {
    loginUser: Function,
    navigation: any,
    token: string
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
                            <Text style={{fontSize: 40, margin: 7, textAlign: "center", fontWeight: "bold"}}>Act 2</Text>
                            <Text style={{fontSize: 25, margin: 7, textAlign: "center"}}>Welcome back!</Text>
                            <View style={{margin: 20*vw}}>
                                <Form>
                                    <Item floatingLabel >
                                        <Label>Username</Label>
                                        <Input 
                                            onChangeText={handleChange('username')}
                                            value={values.username}
                                            style={{marginLeft: 5, fontSize: 20}}
                                        />
                                    </Item>
                                    {(errors.username && touched.username) &&
                                        <Text style={{color: 'red', marginLeft: 12}}>{errors.username}</Text>
                                    }
                                    <Item floatingLabel last>
                                        <Label>Password</Label>
                                        <Input 
                                            onChangeText={handleChange('password')}
                                            value={values.password}
                                            secureTextEntry
                                            style={{marginLeft: 5, fontSize: 20}}
                                        />
                                    </Item>
                                    {(errors.password && touched.password) &&
                                        <Text style={{color: 'red', marginLeft: 12}}>{errors.password}</Text>
                                    }
                                </Form>
                            </View>
                            
                            <View style={{marginHorizontal: 20, marginBottom: 10 }}>
                                <TouchableOpacity style={{flexDirection:"row", justifyContent: "center", backgroundColor: '#2595f7', borderRadius: 3, height: 40 }} onPress={() => submitForm()} >
                                    <Text style={{flex: 1, flexDirection: "column", alignSelf: "center", textAlign: "center", fontSize: 17, color: "white"}}>Login</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: "row", justifyContent: 'center'}}>
                                <Text style={{marginRight: 10}}>Don't have an account?</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Registration")}>
                                    <Text style={{color: "blue", textDecorationLine: "underline"}}>Sign Up</Text>
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
            dispatch( storeJWT({
                token: token, 
            }))
        },
    }
}
  
export default connect(null, mapDispatchToProps)(Login);