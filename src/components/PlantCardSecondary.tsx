import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated
} from 'react-native';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {SvgFromUri} from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps{
    data:{
        name: string;
        photo: string;
        hour: string;
    },
    handleRemove:() => void;
}


export function PlantCardSecondary({data, handleRemove, ...rest} : PlantProps){

    return(
    <Swipeable
        overshootRight={false}
        renderRightActions={() =>(
            <Animated.View>
                <View>
                    <RectButton
                        style={style.buttonRemove}
                        onPress={handleRemove}
                    >
                    <Feather name="trash" size={32} color={colors.white}>

                    </Feather>
                    </RectButton>
                </View>
            </Animated.View>
        )}
    >
        <RectButton 
            style={[
                style.container,
            ]}
            activeOpacity={0.7}
            {...rest}
        >
        
            <SvgFromUri uri={data.photo} width={50} height={50}/>
            <Text 
                style={[
                    style.title,
                ]}>

                {data.name}
            </Text>
            <View style={style.details}>
                <Text style={style.timeLabel}>
                    Regas às
                </Text>
                <Text style={style.time}>
                    {data.hour}
                </Text>
            </View>
        </RectButton>
   </Swipeable>
    )
}

const style = StyleSheet.create({

    container:{
      maxWidth:'100%',
      paddingHorizontal:10,
      paddingVertical:25,
      borderRadius:20,
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:colors.shape,
      marginVertical:5,
     
    },

    title:{
        flex:1,
        fontSize:17,
        marginLeft:10,
        fontFamily:fonts.heading,
        color:colors.heading
    },

    details:{
        alignItems:'flex-end'
    },

    timeLabel:{
        fontSize:16,
        fontFamily:fonts.heading,
        color:colors.body_light
    },

    time:{
        marginTop:5,
        fontSize:16,
        fontFamily:fonts.heading,
        color:colors.body_dark
    },

    buttonRemove:{
        width:100,
        height: 85,
        backgroundColor: colors.red,
        marginTop:15,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
        right:20,
        paddingLeft:15
    }

})