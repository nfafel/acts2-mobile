import React from 'react';
import {Component} from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import { TextInput, Text, Button } from 'react-native-paper';

import { storeJWT } from '../../redux/actions';
import { connect } from 'react-redux';
import createAccountValidationSchema from '../../validationSchemas/createAccountValidationSchema';
import checkUsernameAvailability from '../../api/checkUsernameAvailability';
import createUser from '../../api/createUser';
import UniversitySelector from '../universitySelector/UniversitySelector';
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
                            <View>
                                <TextInput
                                    label='Username'
                                    onChangeText={handleChange('username')}
                                    value={values.username}
                                />
                                {(errors.username && touched.username) &&
                                    <Text style={{color: 'red', marginLeft: 12}}>{errors.username}</Text>
                                }
                                <TextInput
                                    label='Password'
                                    onChangeText={handleChange('password')}
                                    value={values.password}
                                    secureTextEntry
                                />
                                {(errors.password && touched.password) &&
                                    <Text style={{color: 'red'}}>{errors.password}</Text>
                                }
                                <TextInput 
                                    label='Confirm Password'
                                    onChangeText={handleChange('confirmationPassword')}
                                    value={values.confirmationPassword}
                                    secureTextEntry
                                />
                                {(errors.confirmationPassword && touched.confirmationPassword) &&
                                    <Text style={{color: 'red'}}>{errors.confirmationPassword}</Text>
                                }
                            </View>
                                                       
                            <UniversitySelector setFieldValue={setFieldValue} values={values} errors={errors} touched={touched} />
                            
                            <Button mode='contained' onPress={() => submitForm()}>
                                Create Account
                            </Button>

                            <Button mode='text' onPress={() => this.props.navigation.navigate("Login")} >
                                Cancel
                            </Button>
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
