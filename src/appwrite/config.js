import conf from "../conf/conf";

// const docID = ID.unique()
// const fileID = ID.unique()

import { Client, ID, TablesDB, Query, Storage } from "appwrite";

export class Service{
    client = new Client()
    tablesDB;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.tablesDB = new TablesDB(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title, docID = ID.unique(), content, featuredImage, status, userId}){
        try {
            return await this.tablesDB.createDocument(
                conf.appwriteDatabase,
                conf.appwriteCollectionId,
                docID,
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

    async updatePost(docID = ID.unique(), {title, content, featuredImage, status}){
        try {
            return await this.tablesDB.updateDocument(
                conf.appwriteDatabase,
                conf.appwriteCollectionId,
                docID,
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

    async deletePost(docID = ID.unique()){
        try {
            await this.tablesDB.deleteDocument(
            conf.appwriteDatabase,
            conf.appwriteCollectionId,
            docID
        )

        return true;
        } catch (error) {
            console.log("appwrite services :: deletePost :: error", error);
            return false
        }
    }

    async getPost(docID = ID.unique()){
        try {
            await this.tablesDB.getDocument(
            conf.appwriteDatabase,
            conf.appwriteCollectionId,
            docID,
        )            
        } catch (error) {
            console.log("appwrite services :: getPost :: error", error);
            return false
        }
    }
    
    async getPosts(querries = [Query.equal("status", "active")]){
        try {
            await this.tablesDB.listDocuments(
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
                bucketID: conf.appwriteBucketId,
                fileID: ID.unique(),
                file
            })

        } catch (error) {
            console.log("appwrite services :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileID){
        try {
            await this.storage.deleteFile({
                bucketID: conf.appwriteBucketId,
                fileID,             
            })
        return true
            
        } catch (error) {
            console.log("appwrite services :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileID){
        this.storage.getFilePreview({
                bucketID: conf.appwriteBucketId,
                fileID,
        })
    }
}


const service = new Service()

export default service