
import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert

} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from "@react-native-async-storage/async-storage"


import { Button } from '../components/button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function UserIdentification(){
    const navigation = useNavigation();

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();


    const handleInputBlur = () => {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    const handleInputFocus = () => {
        setIsFocused(true);
    }

    const handleInputChange = (value : string) => {
        setIsFilled(!!value);
        setName(value);
    }
    

    const handleSubmit = async () => {
        if(!name)
            return Alert.alert('Me diz como chamar você 😣');
        
        try {
            await AsyncStorage.setItem('@plantmanager:user', name);
            navigation.navigate('Confirmation', {
                title:'Prontinho',
                subtitle:'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle:'Começar',
                icon:'smile',
                nextScreen:'PlantSelect'

            });
        } catch (error) {
            Alert.alert('Não foi possível salvar o seu nome 😣');
        }
    }
  


    return(
        <SafeAreaView style={style.container}>
            <KeyboardAvoidingView
              style={style.container}
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View  style={style.content}>
                        <View style={style.form}>
                            <View style={style.header}>
                                <Text style={style.emoji}>
                                {isFilled ? '😄' : '😀'} 
                                </Text>
                                <Text style={style.title}>
                                    Como podemos {'\n'} chamar você?
                                </Text>
                            </View>
                        
                            <TextInput 
                                style={[
                                    style.input,
                                    (isFocused || isFilled)  && {borderColor: colors.green}
                                ]}
                                placeholder="Digite seu nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            <View style={style.footer}>
                                <Button title="Confirmar" onPress={handleSubmit}></Button>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({

    container:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'space-around'
    },

    content:{
        flex:1,
        width:'100%'
    },
    form:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:54,
        alignItems:'center',
        
    },
    header:{
        alignItems:'center',
    },
    emoji:{
        fontSize:44
    },

    input:{
        borderBottomWidth:1,
        borderColor:colors.gray,
        color: colors.heading,
        width:'100%',
        fontSize:18,
        marginTop:50,
        padding:10,
        textAlign:'center'

    },
    title:{
        fontSize:24,
        textAlign:'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 32,
        marginTop:20
    },
    footer:{
        width:'100%',
        marginTop:40,
        paddingHorizontal:20
    }


})