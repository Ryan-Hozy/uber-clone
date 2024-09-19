import InputField from "@/components/InputField";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";

const Profile = () => {
    const { user } = useUser();
    return (
        <SafeAreaView>
            <ScrollView className="px-5" contentContainerStyle={{paddingBottom: 120}}>
                <Text className="text-2xl font-JakartaBold my-5">My Profile</Text>
                <View className="flex items-center justify-center my-5">
                <Image
                    source={{
                        uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
                    }}
                    style={{ width: 110, height: 110, borderRadius: 110/2}}
                    className="rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300 "
                />
                </View>
                <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
                    <View className="flex flex-col items-center justify-start w-full">
                        <InputField
                            label="First Name"
                            placeholder={user?.firstName || "Not Found"}
                            containerStyle="w-full"
                            inputStyle="p-3.5"
                            editable={false}
                        />

                         <InputField
                            label="Last Name"
                            placeholder={user?.lastName || "Not Found"}
                            containerStyle="w-full"
                            inputStyle="p-3.5"
                            editable={false}
                        />

                         <InputField
                            label="Email"
                            placeholder={user?.primaryEmailAddress?.emailAddress || "Not Found"}
                            containerStyle="w-full"
                            inputStyle="p-3.5"
                            editable={false}
                        />

                         <InputField
                            label="Phone"
                            placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
                            containerStyle="w-full"
                            inputStyle="p-3.5"
                            editable={false}
                        />

                    </View>
                </View>
            </ScrollView>
                
        </SafeAreaView>
    );
};

export default Profile;