import {Category, CreateUserParams, GetMenuParams, SignInParams} from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.esraacodes.es-fastfood",
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseID: "689a14880017238eec9b",
    bucketID: "689e12b10034f3304be0",
    userCollectionID: "689a149e002fb76a0545",
    categoryCollectionID: "689e083a0000e8a0c5a0",
    menuCollectionID: "689e086e002c92d298d9",
    customizationCollectionID: "689e1178000ccfe0c9d7",
    menuCustomizationCollectionID: "689e1254001f8e19213a",
};

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectID)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);

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

export const getSearchMenus = async ({category, query}:GetMenuParams) => {
    const queries:string[] = [];

    if (category) queries.push(Query.equal("category", category));

    if (query) queries.push(Query.search("name", query));

    try {
        const menus = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.menuCollectionID,
            queries
        );

        return menus.documents;
    }
    catch (e)
    {
        throw new Error(e as string);
    }
}

export const getCategories = async ()  => {
    try {
        const cats = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.categoryCollectionID,
        );

        return cats.documents;
    }
    catch (e)
    {
        throw new Error(e as string);
    }
}