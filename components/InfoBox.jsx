import { View, Text } from 'react-native';

const InfoBox = ({title, subtitle, containerStyles, titleStyles}) => {
  return (
    <View className={`${containerStyles}`}>
      <Text className={`text-white text-center ${titleStyles} font-psemibold`}>{title}</Text>
      <Text className="text-sm text-center text-gray-100 font-pregular">{subtitle}</Text>
    </View>
  )
}

export default InfoBox