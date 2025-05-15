import { Text, View, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/globalProvider";

export default function App() {
    const { isLoading, isLoggedIn } = useGlobalContext();

    // Always define the hooks first
    if (!isLoading && isLoggedIn) {
        return <Redirect href={"/home"} />;
    }

    return (
        <SafeAreaView className="bg-primary h-full" style={{ backgroundColor: '#161622', flex: 1 }}>
            <StatusBar backgroundColor="#161622" style="light"/>
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="w-full flex flex-col justify-center items-center h-full px-4">
                    <Image source={images.logo} resizeMode="contain" className="w-[130px] h-[84px]"/>
                    <Image source={images.cards} resizeMode="contain" className="max-w-[380px] w-full h-[300px]"/>
                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            Discover Endless Possibilities with{" "}
                            <Text className="text-secondary-200">Aora</Text>
                        </Text>
                        <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 right-24" resizeMode="contain"/>
                    </View>
                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                        Where creativity meets innovation: embark on a journey of limitless explorations with Aora
                    </Text>
                    <CustomButton buttonTitle={"Continue with Email"} handlePress={() => { router.push("/sign-in") }} containerStyles="w-full mt-7"/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
