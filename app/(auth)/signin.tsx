import CustomButtom from "@/components/CustomButtom";
import CustomInput from "@/components/CustomInput";
import { images } from "@/constants";
import { signIn } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Modal, Text, View } from "react-native";

const signin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const { fetchAuthenticatedUser } = useAuthStore();

  const submit = async () => {
    const { email, password } = form;

    setIsSubmitting(true);

    if (!email || !password)
      return Alert.alert("Error", "Please enter valid email and password");

    try {
      const session = await signIn({ email, password });
      if (session) {
        await fetchAuthenticatedUser();
        setShowSuccessModal(true);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <View className="gap-10 bg-white rounded-lg p-5 mt-5">
        <CustomInput
          placeholder="Enter email"
          value={form.email}
          keyboardType="email-address"
          label="Email"
          onChangeText={(text) => {
            setForm((prev) => ({ ...prev, email: text }));
          }}
        />
        <CustomInput
          placeholder="Enter password"
          value={form.password}
          secureTextEntry={true}
          label="Password"
          onChangeText={(text) => {
            setForm((prev) => ({ ...prev, password: text }));
          }}
        />
        <CustomButtom
          title="Sign In"
          onPress={submit}
          isLoading={isSubmitting}
        />
        <View className="flex flex-row justify-center mt-5 gap-2">
          <Text className="base-regular text-gray-100">
            Don't have an account?
          </Text>
          <Link href="/signup" className="base-bold text-primary">
            Sign Up
          </Link>
        </View>
      </View>
      {/* Overlay when modal is shown */}
      {showSuccessModal && (
        <View className="absolute inset-0 bg-black/50 z-10" />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSuccessModal}
      >
        <View className="flex-1 justify-end bg-transparent">
          <View className="bg-white rounded-t-3xl w-full h-[480px] flex flex-col px-6">
            <View className="border-b-2 border-gray-200 w-[25%] self-center mt-4" />
            <View className="flex-1 flex flex-col gap-4 items-center justify-center">
              <Image source={images.success} className="size-48" resizeMode="contain"/>
              <Text className="h3-bold mb-4 mt-4">Login Successful</Text>
              <Text className="text-center mb-6 text-gray-200">You're all set to continue where you left off.</Text>
            </View>
            <View className="pb-6">
              <CustomButtom title="Go to the homepage" onPress={() => router.replace('/(tabs)')} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default signin;
