import React from 'react';
import {Text, StyleSheet} from 'react-native'
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps{
    title: string,
    active?: boolean
}


export function EnviromentButton({title, active = false, ... rest } : EnviromentButtonProps){
    return(
    <RectButton 
        style={[
            style.container,
            active && style.containerActive
        ]}
        activeOpacity={0.7}
        {...rest}
    >
        <Text 
            style={[
                style.text,
                active && style.textActive
            ]}>

            {title}
        </Text>
   </RectButton>
    )
}

const style = StyleSheet.create({

    container:{
      backgroundColor:colors.shape,
      height:40,
      width:76,
      borderRadius:12,
      justifyContent:'center',
      alignItems:'center',
      marginHorizontal:5
    },

    containerActive:{
        backgroundColor:colors.green_light,
    },

    text:{
        fontSize:16,
        color:colors.heading,
        fontFamily:fonts.text
    },

    textActive:{
        fontFamily:fonts.heading,
        color:colors.green_dark,
    }
  

})