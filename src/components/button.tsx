import React from 'react';
import {TouchableOpacity, Text, StyleSheet, TouchableOpacityProps} from 'react-native'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps{
    title: string
}


export function Button({title, ... rest } : ButtonProps){
    return(
    <TouchableOpacity 
        style={style.container}
        activeOpacity={0.7}
        {...rest}
    >
        <Text style={style.text}>
            {title}
        </Text>
   </TouchableOpacity>
    )
}

const style = StyleSheet.create({

    container:{
      backgroundColor:colors.green,
      height:56,
      borderRadius:16,
      justifyContent:'center',
      alignItems:'center'
    },

    text:{
        fontSize:16,
        color:colors.white,
        fontFamily:fonts.heading
    }
  

})