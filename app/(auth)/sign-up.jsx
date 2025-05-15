import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { CreateUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/globalProvider';


const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setIsLogged, setUser} = useGlobalContext();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleEmailChange = (text) => setForm({ ...form, email: text });
  const handleUsernameChange = (text) => setForm({ ...form, username: text });
  const handlePasswordChange = (text) => setForm({ ...form, password: text });

  const submit = async() =>{
    if(!form.username || !form.password || !form.email){
      Alert.alert("Error", "Please fill in all the field")
    }
    setIsSubmitting(true);
    try{
      const result = await CreateUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);
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
          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">Sign up to Aora</Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={handleUsernameChange}
            otherStyles="mt-10"
          />
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
        <CustomButton buttonTitle={"Sign Up"} handlePress={submit} containerStyles={"mx-4"} isLoading={isSubmitting}/>
        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
          <Link href={"/sign-in"} className='text-lg font-psemibold text-secondary'>Sign In</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
