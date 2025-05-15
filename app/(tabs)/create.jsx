import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from "../../components/FormField"
import { useState } from 'react';
import { Video, ResizeMode } from 'expo-av';
import { icons } from '../../constants';
import CustomButton from '../../components/CustomButton';
import * as ImagePicker from "expo-image-picker"
import { router } from 'expo-router';
import { createVideo } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/globalProvider';

const Create = () => {
  const {user} = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt:""
  })

  const openPicker = async(selectType) => {
     // No permissions request is necessary for launching the image library
     let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image" ? ImagePicker.MediaTypeOptions.Images: ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });


    if(!result.canceled){
      if(selectType === "image"){
        setForm({...form, thumbnail: result.assets[0]})
      }
      if(selectType === "video"){
        setForm({...form, video: result.assets[0]})
      }
    }
  }

  const submit = async() => {
    if(!form.prompt || !form.thumbnail || !form.thumbnail || !form.video){
      return Alert.alert("Please fill in all the fields")
    }
    setUploading(true)
    try{
      await createVideo({...form, userId: user.$id});
      Alert.alert("Success", "Post uploaded successfully")
      router.push("/home")
    }catch(error){
      Alert.alert("Error", error.message)
    }finally{
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt:""
      })
      setUploading(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full" style={{backgroundColor: "#1E1E2D", flex: 1}}>
      <ScrollView className="my-6 px-4">
        <Text className="text-white text-2xl font-psemibold">Upload Video</Text>
        <FormField title={"Video Title"} value={form.title} placeholder={"Give your video a catchy title...."} handleChangeText={(value) => setForm({ ...form, title: value })} otherStyles={"mt-10"} />
        <View className="mt-7 space-y-2 ">
          <Text className="text-base text-gray-100 mb-4 font-pmedium ">
            Upload Video
          </Text>
          <TouchableOpacity onPress={()=>openPicker("video")}>
              {form.video ? (
                <Video source={{uri: form.video.uri}} className="w-full h-64 rounded-2xl" resizeMode={ResizeMode.COVER}/>
              ):(
                <View className="w-full h-40 px-4 bg-[#232533] rounded-2xl justify-center items-center">
                  <View className="w-14 h-14 border-2 border-dashed border-[#FF9001] justify-center items-center">
                    <Image source={icons.upload} resizeMode='contain' className="w-1/2 h-1/2"/>
                  </View>
                </View>
              )}
            </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 mb-4 font-pmedium ">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={()=>openPicker("image")}>
              {form.thumbnail ? (
               <Image source={{uri: form.thumbnail.uri}} resizeMode='cover' className="w-full h-64 rounded-2xl"/>
              ):(
                <View className="w-full h-16 border-2 border-[#232533] flex-row space-x-2 px-4 bg-[#232533] rounded-2xl justify-center items-center">
                  <Image source={icons.upload} resizeMode='contain' className="w-5 h-5"/>
                  <Text className="text-sm text-gray-100 font-pmedium">
                    Choose a file
                  </Text>
                </View>
              )}
            </TouchableOpacity>
        </View>
        <FormField title={"AI Prompt"} value={form.prompt} placeholder={"The prompt you used to create this video"} handleChangeText={(value)=>setForm({...form, prompt: value})} otherStyles={"mt-7"}/>
        <CustomButton buttonTitle={"Submit & Publish"} handlePress={submit} containerStyles={"mt-7"} isLoading={uploading}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create