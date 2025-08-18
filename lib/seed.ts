import {ID, Permission, Role} from "react-native-appwrite";
import { appwriteConfig, databases, storage } from "./appwrite";
import dummyData from "./data";

interface Category {
    name: string;
    description: string;
}

interface Customization {
    name: string;
    price: number;
    type: "topping" | "side" | "size" | "crust" | string; // extend as needed
}

interface MenuItem {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    category_name: string;
    customizations: string[]; // list of customization names
}

interface DummyData {
    categories: Category[];
    customizations: Customization[];
    menu: MenuItem[];
}

// ensure dummyData has correct shape
const data = dummyData as DummyData;

async function clearAll(collectionId: string): Promise<void> {
    const list = await databases.listDocuments(
        appwriteConfig.databaseID,
        collectionId
    );

    await Promise.all(
        list.documents.map((doc) =>
            databases.deleteDocument(appwriteConfig.databaseID, collectionId, doc.$id)
        )
    );
}

async function clearStorage(): Promise<void> {
    const list = await storage.listFiles(appwriteConfig.bucketID);

    await Promise.all(
        list.files.map((file) =>
            storage.deleteFile(appwriteConfig.bucketID, file.$id)
        )
    );
}

async function uploadImageToStorage(imageUrl: string) {
    try {
        console.log('Downloading image from:', imageUrl);
        const response = await fetch(imageUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status}`);
        }

        const blob = await response.blob();
        const fileName = imageUrl.split("/").pop()?.split('?')[0] || `file-${Date.now()}.png`;

        const file = {
            name: fileName,
            type: blob.type || 'image/png',
            size: blob.size,
            uri: imageUrl,
        } as any;

        console.log('Uploading file:', fileName);

        // Create file with public read permissions
        const uploadedFile = await storage.createFile(
            appwriteConfig.bucketID,
            ID.unique(),
            file,
            [
                Permission.read(Role.any()), // Allow anyone to read the file
            ]
        );

        const fileUrl = storage.getFileViewURL(appwriteConfig.bucketID, uploadedFile.$id);
        console.log('File uploaded successfully:', fileUrl);

        return fileUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

async function seed(): Promise<void> {
    // 1. Clear all
    await clearAll(appwriteConfig.categoryCollectionID);
    await clearAll(appwriteConfig.customizationCollectionID);
    await clearAll(appwriteConfig.menuCollectionID);
    await clearAll(appwriteConfig.menuCustomizationCollectionID);
    await clearStorage();

    // 2. Create Categories
    const categoryMap: Record<string, string> = {};
    for (const cat of data.categories) {
        const doc = await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.categoryCollectionID,
            ID.unique(),
            cat
        );
        categoryMap[cat.name] = doc.$id;
    }

    // 3. Create Customizations
    const customizationMap: Record<string, string> = {};
    for (const cus of data.customizations) {
        const doc = await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.customizationCollectionID,
            ID.unique(),
            {
                name: cus.name,
                price: cus.price,
                type: cus.type,
            }
        );
        customizationMap[cus.name] = doc.$id;
    }

    // 4. Create Menu Items
    const menuMap: Record<string, string> = {};
    for (const item of data.menu) {
        const uploadedImage = await uploadImageToStorage(item.image_url);

        const doc = await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.menuCollectionID,
            ID.unique(),
            {
                name: item.name,
                description: item.description,
                image_url: uploadedImage,
                price: item.price,
                rating: item.rating,
                calories: item.calories,
                protein: item.protein,
                category: categoryMap[item.category_name],
            }
        );

        menuMap[item.name] = doc.$id;

        // 5. Create menu_customizations
        for (const cusName of item.customizations) {
            await databases.createDocument(
                appwriteConfig.databaseID,
                appwriteConfig.menuCustomizationCollectionID,
                ID.unique(),
                {
                    menu: doc.$id,
                    customization: customizationMap[cusName],
                }
            );
        }
    }

    console.log("✅ Seeding complete.");
}

export default seed;