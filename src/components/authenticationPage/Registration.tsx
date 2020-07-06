import React from 'react';
import {Component} from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import { Form, Item, Input, Label } from 'native-base';

import { storeJWT } from '../../redux/actions';
import { connect } from 'react-redux';
import createAccountValidationSchema from '../../validationSchemas/createAccountValidationSchema';
import checkUsernameAvailability from '../../api/checkUsernameAvailability';
import createUser from '../../api/createUser';
import UniversitySelector from './UniversitySelector';
import { IUser } from '../../interfaces/IUser';

type CreateAccountProps = {
    loginUser: Function,
    navigation: any
}

class CreateAccount extends Component<CreateAccountProps> {

    async attemptCreateAccount(newUser: IUser) {
        const available: boolean = await checkUsernameAvailability(newUser.username);
        if (!available) {
            Alert.alert("Username already taken");
        } else {
            try {
                const token: string = await createUser(newUser);
                if (token) {
                    this.props.loginUser(token);
                    this.props.navigation.navigate("AuthenticatedStack");
                }
            } catch(err) {
                Alert.alert("Error creating account, please try again");
                console.log(err);
            }
        }
    }

    render() {
        return (
            <View style={{flex: 0.8, justifyContent: "center"}}>
                <Formik
                    initialValues = {{username: '', password: '', confirmationPassword: '', universityId: ''}}
                    validationSchema={createAccountValidationSchema}
                    onSubmit = {(values) => this.attemptCreateAccount({username: values.username, password: values.password, universityId: values.universityId})}
                >
                    {({values, errors, submitForm, handleChange, touched, setFieldValue}) => 
                        <View style={{marginHorizontal: 20}} >
                            <Text style={{fontSize: 25, margin: 7, textAlign: "center"}}>Create Account</Text>
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
                                <Item floatingLabel >
                                    <Label>Password</Label>
                                    <Input 
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        secureTextEntry
                                        style={{marginLeft: 5, fontSize: 20}}
                                    />
                                </Item>
                                {(errors.password && touched.password) &&
                                    <Text style={{color: 'red'}}>{errors.password}</Text>
                                }
                                <Item floatingLabel >
                                    <Label>Confirm password</Label>
                                    <Input 
                                        onChangeText={handleChange('confirmationPassword')}
                                        value={values.confirmationPassword}
                                        placeholder="Confirm password" 
                                        secureTextEntry
                                        style={{marginLeft: 5, fontSize: 20}}
                                    />
                                </Item>
                                {(errors.confirmationPassword && touched.confirmationPassword) &&
                                    <Text style={{color: 'red'}}>{errors.confirmationPassword}</Text>
                                }
                            </Form>
                                                       
                            <UniversitySelector setFieldValue={setFieldValue} values={values} errors={errors} touched={touched} />
                            
                            <View style={{marginHorizontal: 20, marginVertical: 10 }}>
                                <TouchableOpacity style={{flexDirection:"row", justifyContent: "center", backgroundColor: '#2595f7', borderRadius: 3, height: 40 }} onPress={() => submitForm()} >
                                    <Text style={{flexDirection: "column", alignSelf: "center", fontSize: 17, color: "white"}}>Create Account</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={{flexDirection:"row", justifyContent: "center"}} onPress={() => this.props.navigation.navigate("Login")} >
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
            dispatch( storeJWT({
                token: token
            }))
        }
    }
}
  
export default connect(null, mapDispatchToProps)(CreateAccount);
