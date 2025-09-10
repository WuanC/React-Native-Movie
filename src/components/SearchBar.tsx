import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';


interface ISearchBarProps{
    value: string;
    onChangeText: (text: string) => void;
    onSubmit:() => void;
    placeholder: string    
}


const SearchBar= ({value, onChangeText, onSubmit, placeholder = "Enter keyword"} : ISearchBarProps) => {



    return(
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder= {placeholder}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            onSubmitEditing={onSubmit}
        />
    </View>);
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        marginVertical: 8,
    },
    input: {
        height: 40,
        fontSize: 16,
        paddingHorizontal: 8,
    },
});

export default SearchBar;