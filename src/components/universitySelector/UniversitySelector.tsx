import React from 'react';
import {Component} from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import { IUniversity } from '../../interfaces/IUniversity';
import UniversitySelectorModal from './UniversitySelectorModal';

type UniversitySelectorProps = {
    setFieldValue: Function,
    values: any,
    errors: any,
    touched: any
}

type UniversitySelectorState = {
    selectedUniversityName: string,
    selectedUniversity: IUniversity | null,
    selectorModalOpen: boolean
}

class UniversitySelector extends Component<UniversitySelectorProps, UniversitySelectorState> {
    constructor(props: UniversitySelectorProps) {
        super(props);
        this.state = {
            selectedUniversityName: '',
            selectedUniversity: null, 
            selectorModalOpen: false
        }
    }

    setSelectedUniversity(university: IUniversity) {
        this.setState({
            selectedUniversity: university,
            selectedUniversityName: university.name,
            selectorModalOpen: false
        });
        this.props.setFieldValue("universityId", university.id);
    }

    render() {
        return (
            <View>
                <Button mode='text' onPress={() => this.setState({selectorModalOpen: true})}>
                    {this.state.selectedUniversityName || "Select University"}
                </Button>
                <UniversitySelectorModal 
                    visible={this.state.selectorModalOpen} 
                    closeModal={()=> this.setState({selectorModalOpen: false})} 
                    setSelectedUniversity={(university: IUniversity) => this.setSelectedUniversity(university)} 
                />
                {(this.props.errors.universityId && this.props.touched.universityId) &&
                    <Text style={{color: 'red'}}>{this.props.errors.universityId}</Text>
                }
            </View>
        )
    }
}

export default UniversitySelector;