import React, { useEffect, useState, useCallback } from 'react';
import {Text,
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/core';


import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { EnviromentButton } from '../components/EnviromentButton';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantProps } from '../libs/storage';


interface EnviromentProps{
  key: string;
  title: string
}


export function PlantSelect(){

  const navigation = useNavigation();

  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const handleEnviromentSelected = async (enviroment : string) => {
    setEnviromentSelected(enviroment);

    if(enviroment == 'all'){
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter(plant =>
      plant.environments.includes(enviroment)
    );

    setFilteredPlants(filtered);

  }

  async function fetchPlants(){

    const {data} = await api.get(`/plants?_sort=name&_order=asc&_page=${page}&_limit=8`)
    
    if(!data)
      return setLoading(true);

    if(page > 1){
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data])
    }else{
      setFilteredPlants(data)
      setPlants(data);
    }
    
    setLoading(false);
    setLoadMore(false);
  }

  const handleFetchMore = (distance: number) => {
    if(distance < 1 || loadMore)
      return;

    setLoadMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }


  const handlePlantSelect = (plant : PlantProps) =>{

    navigation.navigate('PlantSave', {plant})

  }

  useEffect(() =>{
    async function fetchEnviroment(){
      const {data} = await api.get(`/plants_environments?_sort=title&_order=asc`)
      setEnviroments([{
          key:'all',
          title:'Todos',
        },
        ...data,
      ]);
    }
    fetchEnviroment()
  },[])


  useEffect(() =>{
    fetchPlants()
  },[])

  if(loading)
    return <Load/>

  return(
    <View style={style.container}>
      <View style={style.header}>
        <Header/>
        <Text  style={style.title}>
          Em qual ambiente
        </Text>
        <Text  style={style.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>
      <View>
        <FlatList
          data={enviroments}
          keyExtractor={(item, index) => String(item.key)}
          renderItem={({item}) => (
            <EnviromentButton
              title={item.title} 
              active={item.key == enviromentSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.enviromentList}
          ListFooterComponent={
           <View style={{width:33}}></View>
          }
        
        />
      </View>

      <View style={style.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item, index) => String(item.id)}
          renderItem={({item}) => (
              <PlantCardPrimary
                data={item}
                onPress={() =>handlePlantSelect(item)}
              />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}    
          contentContainerStyle={style.contentContainerStyle}
          onEndReachedThreshold={0.2}
          onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}
          ListFooterComponent={
            loadMore ?
              <ActivityIndicator color={colors.green} size="large"></ActivityIndicator>
            :
              null
          }
        />
      </View>
    
    </View>
  )
}


const style = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:colors.background,
  },

  header:{
    paddingHorizontal:30
  },

  title:{
    fontSize:17,
    color:colors.heading,
    fontFamily:fonts.heading,
    lineHeight:20,
    marginTop:15
  },

  subtitle:{
    fontSize:17,
    color:colors.heading,
    fontFamily:fonts.text,
    lineHeight:20,
    marginTop:15
  },

  enviromentList:{
    height:40,
    justifyContent:'center',
    paddingBottom:5,
    marginLeft:32,
    marginVertical: 32
  },

  plants:{
    flex:1,
    paddingHorizontal:32,
    justifyContent:'center',
  },

  contentContainerStyle:{

  }
})