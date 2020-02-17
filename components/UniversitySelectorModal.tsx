import React, {Component} from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { IUniversity } from '../interfaces/IUniversity';
import getUniversities from '../api/getUniversities';

type UniversitySelectorProps = {
    visible: boolean,
    closeModal: Function,
    setSelectedUniversity: Function
}

type UniversitySelectorState = {
    universities: IUniversity[],
    search: string,
    selectedUniversity: IUniversity | null;
}

class UniversitySelectorModal extends Component<UniversitySelectorProps, UniversitySelectorState> {
    constructor(props: UniversitySelectorProps) {
        super(props);
        this.state = {
            universities: [],
            search: '',
            selectedUniversity: null
        }
    }

    async queryUniversities() {
        const universities: IUniversity[] = await getUniversities(this.state.search);
        this.setState({universities: universities});
    }

    async handleSearchChange(newSearch: string) {
        await this.setState({search: newSearch, universities: []});
        if (newSearch !== '') {
            this.queryUniversities();
        }
    }

    handleSelect() {
        this.props.closeModal();
        this.props.setSelectedUniversity(this.state.selectedUniversity);
    }

    getUniversityList(): JSX.Element[] {
        let i=0;
        const UniversityList: JSX.Element[] = this.state.universities.map((university: IUniversity) => {
            return (
                <TouchableOpacity key={i++} 
                    style={{borderWidth: 0.5, height: 50}}
                    onPress={() => this.setState({
                        selectedUniversity: university,
                        search: university.name,
                        universities: []
                    })}>
                    <Text style={{fontSize: 16, margin: 5}}>{university.name}</Text>
                </TouchableOpacity>
            )
        });
        return UniversityList;
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
            >
                <SafeAreaView style={{flex: 1}}>
                    <View style={{margin: 20, borderWidth: 0.5, backgroundColor: "#f7f7f7", flex: 1, flexDirection: "column", alignItems: "center"}}>
                        <Text style={{fontSize: 30, margin: 20}}>Search for a University</Text>
                        <View style={{borderWidth: 0.5, borderRadius: 4, width: "80%"}}>
                            <TextInput 
                                onChangeText={(newSearch) => this.handleSearchChange(newSearch)}
                                value={this.state.search}
                                placeholder="University Name" 
                                style={{fontSize: 25, margin: 10}}
                            />
                        </View>
                        <ScrollView style={{margin: 20, width: "90%"}}>
                            {this.getUniversityList()}
                        </ScrollView>
                        <View style={{flexDirection: "row", margin: 20}}>
                            <TouchableOpacity onPress={() => {this.props.closeModal(); this.setState({universities: []})}} style={{backgroundColor: "#a3a3a3", borderWidth: 0.5, borderRadius: 3, height: 40, marginRight: 15}}>
                                <Text style={{fontSize: 20, margin: 5}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleSelect()} style={{backgroundColor: '#f7f7f7', borderWidth: 0.5, borderRadius: 3, height: 40}}>
                                <Text style={{fontSize: 20, margin: 5}}>Select</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }
}

export default UniversitySelectorModal;