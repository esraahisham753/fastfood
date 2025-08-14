import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.esraacodes.es-fastfood",
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseID: "689a14880017238eec9b",
    userCollectionID: "689a149e002fb76a0545",
    categoryCollectionID: "689e083a0000e8a0c5a0"
};

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectID)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

export const createUser = async ({name, email, password}: CreateUserParams) => {
    try
    {
        const newAccount = await account.create(ID.unique(), email, password, name);

        if (!newAccount) throw new Error('Error: Cannot create a new account');

        await signIn({email, password});

        const avatarUrl = avatars.getInitialsURL(name);
        // console.log(avatarUrl);

        return await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionID,
            ID.unique(),
            {
                accountID: newAccount.$id,
                email, name, password,
                avatar: avatarUrl
            }
        );
    }
    catch(e)
    {
        throw new Error(e as string);
    }
}

export const signIn = async ({email, password}:SignInParams) => {
    try
    {
        const userSession = await account.createEmailPasswordSession(email, password);
    }
    catch (e)
    {
        throw new Error(e as string);
    }

}

export const getCurrentUser = async () => {
    try
    {
        const currentAccount = await account.get();

        if (!currentAccount) throw new Error('Cannot find an account');

        const documents = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionID,
            [
                Query.equal("accountID", currentAccount.$id)
            ]
        );

        if (!documents) throw new Error(`Cannot find user with this id: ${currentAccount.$id}`);

        return documents.documents[0];
    }
    catch (e)
    {
        console.log(e as string);
        throw new Error(e as string);
    }

}