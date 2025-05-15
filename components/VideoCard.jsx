import { View, Text, Image, TouchableOpacity} from 'react-native';
import { icons } from '../constants';
import { useState } from 'react';
import { Video, ResizeMode } from 'expo-av';

const VideoCard = ({video: {title, thumbnail, video, creator}}) => {
    const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
        <View className="flex-row gap-3 items-start">
            <View className="justify-center ite flex-row flex-1">
                <View className="w-[46px] h-[46px] border-secondary-200 justify-center items-center p-0.5">
                    <Image source={{uri: creator?.avatar}} className="w-full h-full rounded-lg" resizeMode='cover'/>
                </View>
                <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-gray-100 font-psemibold text-sm" numberOfLines={1}>{title}</Text>
                    <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>{creator?.username}</Text>
                </View>
            </View>
            <View className="pt-2">
                <Image source={icons.menu} className="h-5 w-5" resizeMode='contain'/>
            </View>
        </View>
        {play? (
            <View className="w-full h-60 rounded-2xl mt-3 bg-white/10">
                <Video
                    source={require("../assets/videos/9jaflaver.com-Rudeboy-Together-Official-Video-ft.-Patoranking.mp4")}
                    style={{ width: '100%', height: '100%', borderRadius: 20 }}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                    if (status.didJustFinish) {
                        setPlay(false);
                    }
                    }}
                />
            </View>
        ):(
            <TouchableOpacity activeOpacity={0.7} onPress={()=>setPlay(true)} className="w-full h-60 rounded-xl mt- relative justify-center items-center">
                <Image source={{uri: thumbnail}}  className="w-full h-full rounded-xl mt-3" resizeMode='cover'/>
                <Image source={icons.play} className="w-12 h-12 absolute" resizeMode='contain'/>
            </TouchableOpacity>
        )
        }
    </View>
  )
}

export default VideoCard