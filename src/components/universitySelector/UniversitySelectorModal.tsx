import React, {Component} from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';

import { IUniversity } from '../../interfaces/IUniversity';
import getUniversities from '../../api/getUniversities';
import { Appbar, Searchbar, List, ActivityIndicator } from 'react-native-paper';

type UniversitySelectorProps = {
    visible: boolean,
    closeModal: Function,
    setSelectedUniversity: Function
}

type UniversitySelectorState = {
    universities: IUniversity[],
    search: string,
    loading: boolean,
}

class UniversitySelectorModal extends Component<UniversitySelectorProps, UniversitySelectorState> {
    constructor(props: UniversitySelectorProps) {
        super(props);
        this.state = {
            universities: [],
            search: '',
            loading: false,
        }
    }

    async handleSearchChange(newSearch: string) {
        if (newSearch !== '') {
            await this.setState({search: newSearch, loading: true});

            const universities: IUniversity[] = await getUniversities(newSearch);
            if (universities) {
                this.setState({universities: universities, loading: false});
            }
        } else {
            this.setState({universities: [], search: '', loading: false});
        }
    }

    handleSelect(university: IUniversity) {
        this.props.closeModal();
        this.props.setSelectedUniversity(university);
        this.setState({universities: [], search: '', loading: false})
    }

    getUniversityList(): JSX.Element[] {
        const UniversityList: JSX.Element[] = this.state.universities.map((university: IUniversity) => {
            return (
                <List.Item
                    title={university.name}
                    onPress={() => this.handleSelect(university)}
                    style={{borderBottomWidth: 1, borderLeftWidth: 1, margin: 8, borderColor: 'blue'}}
                />
            )
        });
        return UniversityList;
    }

    render() {
        return (
            <Modal
                animationType="slide"
                visible={this.props.visible}
            >
                <SafeAreaView style={{flex: 1}}>
                    <Appbar.Header>
                        <Appbar.BackAction onPress={() => {this.props.closeModal(); this.setState({universities: []})}} />
                        <Appbar.Content title='Select a University' />
                    </Appbar.Header>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={(newSearch: string) => this.handleSearchChange(newSearch)}
                        value={this.state.search}
                        style={{margin: 15}}
                    />
                    {this.state.loading ? (
                        <ActivityIndicator />
                    ) : (
                        <ScrollView>
                            {this.getUniversityList()}
                        </ScrollView>
                    )}

                </SafeAreaView>
            </Modal>
        )
    }
}

export default UniversitySelectorModal;