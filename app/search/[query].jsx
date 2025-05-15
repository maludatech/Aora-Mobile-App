import { View, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import { searchPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useLocalSearchParams } from 'expo-router';

const Search = () => {
  const query = useLocalSearchParams();

  const {data: posts, refetch} = useAppwrite(()=>searchPosts(query.query));

  useEffect(()=>{
    refetch();
  }, [query])

  return (
    <SafeAreaView className="bg-primary flex-1 h-full text-white" style={{flex: 1, backgroundColor: "#161622"}}>
      <FlatList data={posts} keyExtractor={(item)=>item.$id}  renderItem={({item})=>(
        <VideoCard video={item}/>
      )}
      ListHeaderComponent={()=>(
        <View className="my-6 px-4">
          <Text className="font-pmedium text-sm text-gray-100"> Search Results</Text>
          <Text className="font-psemibold text-2xl text-gray-100">{query?.query || ""}</Text> 
          <View className="mt-4 mb-6">
            <SearchInput initialQuery={query}/>
          </View>
        </View>
      )}
      ListEmptyComponent={()=>(
        <EmptyState title="No Videos Found" subtitle="No videos found for this search query"/>
      )}
      />
    </SafeAreaView>
  )
}

export default Search;