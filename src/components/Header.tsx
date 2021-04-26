import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native'
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import userImg from '../assets/jardel.png';


export function Header(){

    const [name, setName] = useState<string>();


    useEffect(() =>{
        const getName = async () =>{
            let name = await AsyncStorage.getItem('@plantmanager:user');
            setName(name || ''); 
        }

        getName();
    }, [name])

    return(
        <View style={style.container}>
            <View>
                <Text style={style.greeting}>Olá,</Text>
                <Text style={style.name}>{name}</Text>
            </View>

            <Image style={style.image} source={userImg}/>
        </View>
    )
}

const style = StyleSheet.create({

    container:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:20,
        marginTop:getStatusBarHeight(),
    },

    greeting:{
        fontSize:32,
        color:colors.heading,
        fontFamily:fonts.text
    },

    name:{
        fontSize:32,
        color:colors.heading,
        fontFamily:fonts.heading,
        lineHeight:40
    },

    image:{
        width:70,
        height:70,
        borderRadius:40,
    }
  

})