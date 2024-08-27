import { ScrollView, View, Text, Image, TextInput, Button } from "react-native";
import { Link, useRouter } from "expo-router";
import { images, icons } from "../constants";
import InputField from "@/components/InputField";
import { useState, useCallback } from "react";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import { useSignIn } from '@clerk/clerk-expo'
import React from 'react'

const SignIn = () => {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [form, setForm ] = useState({email:"", password:""})

    const onSignInPress = useCallback(async () => {
        if (!isLoaded) return;
    
        try {
          const signInAttempt = await signIn.create({
            identifier: form.email,
            password: form.password
          })
    
          if (signInAttempt.status === 'complete') {
            await setActive({ session: signInAttempt.createdSessionId })
            router.replace("/(root)/(tabs)/(home)")
          } else {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(signInAttempt, null, 2))
          }
        } catch (err: any) {
          console.error(JSON.stringify(err, null, 2))
        }
      }, [isLoaded, form])
    

    return (
       <ScrollView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
            <View className="relative w-full h-[250px]">
                <Image
                    source={images.signUpCar}
                    className="z-0 w-full h-[250px]"
                />
                <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                    Welcome Back!
                </Text>
            </View>
            <View>
                <InputField 
                    label="Email"
                    placeholder="Enter Your Email"
                    icon={icons.email}
                    value={form.email}
                    onChangeText={(value) => setForm({...form, email: value })}
                />
                <InputField 
                    label="Password"
                    placeholder="Enter Your Password"
                    icon={icons.lock}
                    secureTextEntry={true}
                    value={form.password}
                    onChangeText={(value) => setForm({...form, password: value })}
                />

                <CustomButton title="Sign In" onPress={onSignInPress}
                    className="mt-6"
                />
                
                <OAuth/>

                <Link href="/sign-up" className="text-lg text-center text-general-200 mt-10">
                    <Text>Don't have an account? </Text>
                    <Text className="text-primary-500">Log In</Text>    
                    
                </Link>
            </View>

        </View>


       </ScrollView>
    );
};

export default SignIn;