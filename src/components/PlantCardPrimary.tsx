import React from 'react';
import {TouchableOpacity, Text, StyleSheet, TouchableOpacityProps} from 'react-native'
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import {SvgFromUri} from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps{
    data:{
        name: string;
        photo: string;
    }
}


export function PlantCardPrimary({data, ...rest} : PlantProps){
    return(
    <RectButton 
        style={[
            style.container,
        ]}
        activeOpacity={0.7}
        {...rest}
    >
        <SvgFromUri uri={data.photo} width={70} height={70}/>
        <Text 
            style={[
                style.text,
            ]}>

            {data.name}
        </Text>
   </RectButton>
    )
}

const style = StyleSheet.create({

    container:{
      flex:1,
      maxWidth:'45%',
      backgroundColor:colors.shape,
      borderRadius:10,
      paddingVertical:10,
      alignItems:'center',
      margin:10,
    },

    text:{
        fontSize:16,
        color:colors.green_dark,
        marginVertical:16,
        fontFamily:fonts.heading
    },

    textActive:{
        fontFamily:fonts.heading,
        color:colors.green_dark,
    }
  

})