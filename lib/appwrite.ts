import { CreateUserParams } from "@/type";
import { Account, Avatars, Client, Databases } from "react-native-appwrite";

const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.esraacodes.es-fastfood",
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseID: "689a14880017238eec9b",
    userCollectionID: "689a149e002fb76a0545"
};

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectID)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);

const createUser = async ({name, email, password}: CreateUserParams) => {
    
}