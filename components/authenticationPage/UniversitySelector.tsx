import React from 'react';
import {Component} from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { IUniversity } from '../../interfaces/IUniversity';
import UniversitySelectorModal from '../universitySelector/UniversitySelectorModal';

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
        this.props.setFieldValue("universityId", university._id);
    }

    render() {
        return (
            <KeyboardAvoidingView>
                <View style={{flexDirection: "row"}}>
                    <View style={{borderWidth: 0.5, borderRadius: 3, backgroundColor: "#f7f7f7", height: 50, justifyContent: "center", flex: 1, marginRight: 10}}>
                        <Text style={{margin: 5}}>{this.state.selectedUniversityName || "No University Selected"}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.setState({selectorModalOpen: true})} style={{borderWidth: 0.5, borderColor: "blue", borderRadius: 3, backgroundColor: "#6efae7", height: 50, justifyContent: "center"}}>
                        <Text style={{margin: 5}}>Select University</Text>
                    </TouchableOpacity>
                </View>
                <UniversitySelectorModal 
                    visible={this.state.selectorModalOpen} 
                    closeModal={()=> this.setState({selectorModalOpen: false})} 
                    setSelectedUniversity={(university: IUniversity) => this.setSelectedUniversity(university)} 
                />
                {(this.props.errors.universityId && this.props.touched.universityId) &&
                    <Text style={{color: 'red'}}>{this.props.errors.universityId}</Text>
                }
            </KeyboardAvoidingView>
        )
    }
}

export default UniversitySelector;