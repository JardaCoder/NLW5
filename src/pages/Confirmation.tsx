import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';


import { Button } from '../components/button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params{
    title: string;
    subtitle: string;
    buttonTitle:string;
    icon: 'smile' | 'hug';
    nextScreen: string;

}

const emojis ={
    hug:'🤗',
    smile:'😄'
}

export function Confirmation(){

    const navigation = useNavigation();
    const routes = useRoute();
    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params as Params;

    const handleMoveOn = () => {
        navigation.navigate(nextScreen)
    }

    return(
        <SafeAreaView style={style.container}>
            <View  style={style.content}>
                <Text style={style.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style={style.title}>
                    {title}
                </Text>

                <Text style={style.subtitle}>
                   {subtitle}
                </Text>

                <View style={style.footer}>
                    <Button title={buttonTitle} onPress={handleMoveOn}></Button>
                </View>
            
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-around'
    },

    content:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        padding:30
    },

    emoji:{
        fontSize:78
    },

    title:{
        fontSize:22,
        textAlign:'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 38,
        marginTop:15
    },
    subtitle:{
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingHorizontal: 10,
        color:colors.heading
    },
    footer:{
        width:'100%',
        marginTop:20,
        paddingHorizontal:50,
        
    }


})