import { View, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({buttonTitle, handlePress, containerStyles, isLoading, textStyles}) => {
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}>
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{buttonTitle}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton