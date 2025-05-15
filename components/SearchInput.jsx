import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { icons } from "../constants";
import { useState } from 'react';
import CustomButton from "./CustomButton"
import { router, usePathname } from 'expo-router';

const SearchInput = ({initialQuery}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || " ");

  return (
      <View className="flex w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary-100 items-center mt-4 flex-row space-x-4">
        <TextInput
          className="text-base mt-0.5 text-white flex-1 font-pregular"
          value={query}
          placeholder={"Search for a video topic"}
          placeholderTextColor={"#CDCDE0"}
          onChangeText={(text) => setQuery(text)}
        />
       <TouchableOpacity onPress={()=>{
        if(!query){
          return Alert.alert("Missing query", "Please input something to search results across database")
        }
        if(pathname.startsWith("/search")) router.setParams({query})
        else router.push(`/search/${query}`)
       }}>
        <Image source={icons.search} className="w-5 h-5" resizeMethod='contain'/>
       </TouchableOpacity>
      </View>    
  );
};

export default SearchInput;
