import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/globalProvider';

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setIsLoggedIn, setUser} = useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleEmailChange = (text) => setForm({ ...form, email: text });
  const handlePasswordChange = (text) => setForm({ ...form, password: text });

  const submit = async() =>{
    if(!form.password || !form.email){
      Alert.alert("Error", "Please fill in all the field")
    }
    setIsSubmitting(true);
    try{
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    }catch(error){
      Alert.alert("Error", error.message)
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full" style={{ backgroundColor: '#161622', flex: 1 }}>
      <ScrollView>
        <View className="w-full justify-center px-4 my-2 h-full">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">Log in to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={handleEmailChange}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={handlePasswordChange}
            otherStyles="mt-7"
          />
        </View>
        <CustomButton buttonTitle={"Sign In"} handlePress={submit} containerStyles={"mx-4"} isLoading={isSubmitting}/>
        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
          <Link href={"/sign-up"} className='text-lg font-psemibold text-secondary'>Sign Up</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
