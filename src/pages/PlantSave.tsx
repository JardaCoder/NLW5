import React, {useState} from 'react';
import {
    Alert,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    Image,
    Platform,
    ScrollView,
    Dimensions
} from 'react-native'
import {SvgFromUri} from 'react-native-svg';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/core';
import { getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {format, isBefore} from  'date-fns';

import { Button } from '../components/button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import waterDrop from '../assets/waterdrop.png'
import { PlantProps, savePlant } from '../libs/storage';



interface Params {
    plant: PlantProps
   
}

export function PlantSave(){

    const navigation = useNavigation();
    const route = useRoute();
    const {plant} =  route.params as Params;
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    const handleChangeTime = (event: Event, dateTime: Date | undefined) => {

        if(Platform.OS === 'android'){
            setShowDatePicker(oldState => !oldState);
        }
        
        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha um horário no futuro! ⏱')
        }

        if(dateTime)
            setSelectedDateTime(dateTime as Date)
    }
    
    const handleOpenDateTimePickerForAndroid = () => {
        setShowDatePicker(oldState => !oldState);
    }

    const handleSave = async () => {
        
        try {
          await savePlant({
              ...plant,
              dateTimeNotification: selectedDateTime
          })  

          navigation.navigate('Confirmation', {
            title:'Tudo certo',
            subtitle:'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
            buttonTitle:'Muito obrigado :D',
            icon:'hug',
            nextScreen:'MyPlants'

        })

        } catch (error) {
            Alert.alert('Não foi possível salvar. 😣')
        }
    }


    
    
    return(
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow:1}}
        >
            <View style={style.container}>
                <View style={style.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}

                    />
                    <Text style={style.plantName}>
                    {plant.name}
                    </Text>
                    <Text style={style.plantAbout}>
                        {plant.about}
                    </Text>

                </View>

                <View style={style.controller}>
                    <View  style={style.tipContainer}>
                        <Image
                            source={waterDrop}
                            style={style.tipImage}
                        />
                        <Text style={style.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>

                    <Text style={style.alertLabel}>
                        Escolha o melhor horário para ser lembrado:
                    </Text>

                    {showDatePicker &&(
                        <DateTimePicker
                        value={selectedDateTime}
                        mode="time"
                        display="spinner"
                        onChange={handleChangeTime}
                    />
                    )}
                    {Platform.OS === 'android' &&(
                        <TouchableOpacity 
                            onPress={handleOpenDateTimePickerForAndroid}
                            style={style.dateTimePickeButton}
                        >
                            <Text style={style.dateTimePickeText}>
                            {`Mudar ${format(selectedDateTime, 'HH:mm')}` }
                            </Text>
                        </TouchableOpacity>
                    
                    )}
                

                    <Button title="Cadastrar planta" onPress={handleSave}/>

                </View>

            </View>
        </ScrollView>

    );
}


const style = StyleSheet.create({

    container:{
      flex:1,
      justifyContent:'space-between',
      backgroundColor:colors.shape,
    },

    plantInfo:{
        flex:1,
        paddingHorizontal:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.shape,
        marginTop:getStatusBarHeight(),
        minHeight:370
       
    },

    controller:{
        backgroundColor:colors.white,
        paddingHorizontal:20,
        paddingTop:20,
        paddingBottom:getBottomSpace() || 20
    },

    plantName:{
        fontFamily:fonts.heading,
        fontSize:24,
        color:colors.heading,
        marginTop:15
    },

    plantAbout:{
        textAlign:'center',
        fontFamily:fonts.text,
        color:colors.heading,
        fontSize:17,
        marginTop:10
    },

    tipContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:colors.blue_light,
        padding:20,
        borderRadius:20,
        position:'relative',
        bottom:60
    },

    tipImage:{
        width:56,
        height:56
    },

    tipText:{
        flex:1,
        marginLeft:20,
        fontFamily:fonts.text,
        color:colors.blue,
        fontSize:17,
        textAlign:'justify',
    },

    alertLabel:{
        textAlign:'center',
        fontFamily:fonts.complement,
        color:colors.heading,
        fontSize:12,
        marginBottom:5,
    },

    dateTimePickeButton:{
        width:'100%',
        alignItems:'center',
        paddingVertical:40
    },

    dateTimePickeText:{
        color:colors.heading,
        fontSize:24,
        fontFamily:fonts.text
    }
  

  })