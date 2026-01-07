import conf from "../conf/conf";

// const docID = ID.unique()
// const fileID = ID.unique()

import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service{
    client = new Client()
    Databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.Databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.Databases.createDocument(
                conf.appwriteDatabase,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("appwrite services :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.Databases.updateDocument(
                conf.appwriteDatabase,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite services :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.Databases.deleteDocument(
            conf.appwriteDatabase,
            conf.appwriteCollectionId,
            slug
        )

        return true;
        } catch (error) {
            console.log("appwrite services :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.Databases.getDocument(
            conf.appwriteDatabase,
            conf.appwriteCollectionId,
            slug,
        )            
        } catch (error) {
            console.log("appwrite services :: getPost :: error", error);
            return false
        }
    }

    async getPostsByAuthor(userId) {
        try {
            return await this.Databases.listDocuments(
            conf.appwriteDatabase,
            conf.appwriteCollectionId,
            [Query.equal("userId", userId)]
            )
        } catch (error) {
            console.log("Appwrite :: getPostsByAuthor :: error", error)
            return false
        }
    }
    
    async getPosts(querries = [Query.equal("status", "active")]){
        try {
            return await this.Databases.listDocuments(
            conf.appwriteDatabase,
            conf.appwriteCollectionId,
            querries,
            // [
            //      Query.equal("status", "active")     //First create an index than aplly this
            // ]
            )
        } catch (error) {
            console.log("appwrite services :: listPost :: error", error);
        }
    }
    
    //Upload file service
    
    async uploadFile(file){
        try {
            
            return await this.storage.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file
            })

        } catch (error) {
            console.log("appwrite services :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile({
                bucketID: conf.appwriteBucketId,
                fileId,             
            })
        return true
            
        } catch (error) {
            console.log("appwrite services :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.storage.getFileView(
                conf.appwriteBucketId,
                fileId
        ).toString()
    }
}


const service = new Service()

export default service