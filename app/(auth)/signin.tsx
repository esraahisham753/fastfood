import CustomButtom from "@/components/CustomButtom";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Button, Modal, Text, View } from "react-native";

const signin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const { setUser } = useAuthStore();

  const submit = async () => {
    const { email, password } = form;

    setIsSubmitting(true);

    if (!email || !password)
      return Alert.alert("Error", "Please enter valid email and password");

    try {
      const session = await signIn({ email, password });
      
      if (session)
      {
        setUser(session);
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
      >
        <View>
          <Text>Login Successful</Text>
          <Button title="Go to the homepage" onPress={() => router.replace('/')}/>
        </View>
      </Modal>
    </>
  );
};

export default signin;
