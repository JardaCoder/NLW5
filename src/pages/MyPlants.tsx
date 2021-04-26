import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    FlatList,
    Alert,
    ScrollView
} from 'react-native'
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';


import { Header } from '../components/Header';
import colors from '../styles/colors';
import waterDrop from '../assets/waterdrop.png'
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';


export function MyPlants(){

    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();


    useEffect(() =>{

        const loadStorageData = async () => {
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            )

            setNextWatered(`Não esqueceça de regar a ${plantsStoraged[0].name} em ${nextTime}`)
            setPlants(plantsStoraged);
           setLoading(false);

        }

        loadStorageData();
    
    },[])

    const handleRemove = (plant: PlantProps) => {
        Alert.alert('Remover', `Deseja remover a ${plant.name}`,[
            {
                text:'Não 🙏🏻',
                style:'cancel'
            },
            {
                text:'Sim 😥',
                onPress: async () =>{
                    try {
                        
                        await removePlant(plant.id);
                        setPlants((oldData) =>(
                            oldData.filter(item => item.id != plant.id))
                        )
                        
                    } catch (error) {
                        Alert.alert('Não foi possível remover! 😥')
                    }
                }
            }
        ])
    }

    if(loading){
      return  <Load/>
    }

    return(
            <View style={style.container}>
                <Header/>

                <View  style={style.spotlight}>
                    <Image
                        style={style.spotlightImage} 
                        source={waterDrop}
                    />
                    <Text style={style.spotlightText}>
                    {nextWatered}
                    </Text>

                </View>

                <View style={style.plants}>
                    <Text style={style.plantsTitle}>
                        Próximas regadas
                    </Text>

                    <FlatList
                        data={plants}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({item}) =>(
                        <PlantCardSecondary 
                                data={item}
                                handleRemove={() => handleRemove(item) }
                                />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{flexGrow:1}}
                       
                    />


                </View>
            </View>
    );
}

const style = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:30,
        paddingTop:50,
        backgroundColor: colors.background,
    },

    spotlight:{
        backgroundColor:colors.blue_light,
        paddingHorizontal:30,
        borderRadius:20,
        height:110,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

    spotlightImage:{
        width:60,
        height:60
    },

    spotlightText:{
        flex:1,
        color:colors.blue,
        paddingHorizontal:20,
        textAlign:'justify'
    },

    plants:{
        flex:1,
        width:'100%'
    },

    plantsTitle:{
        fontSize:24,
        fontFamily:fonts.heading,
        color:colors.heading,
        marginVertical:20,
    }


})