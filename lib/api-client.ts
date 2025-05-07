import { IVideo } from "@/models/Video";

export type VideoFormateData = Omit<IVideo, "_id">

type FetchOptions = {
    method?:  "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>
}
class ApiClient{
    private async fetch<T>(
        endpoint:string,
        options: FetchOptions = {}
    ):Promise<T>{
        const {method = "GET", body, headers = {}} = options

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }

        const response = await fetch(`/api${endpoint}`, {
            method,
            headers: defaultHeaders, 
            body: body ? JSON.stringify(body): undefined 
        })

        if(!response.ok){
            throw new Error(await response.text());
        }
        return response.json()
    }

    // db call
    async getVideos(){
        return this.fetch<IVideo[]>("/videos")
    }

    // a singel video call
    async  getAVideo(id:string) {
        return this.fetch<IVideo>(`/videos/${id}`)
    }

    // to upload video
    async uploadVideo(videodata:VideoFormateData){
        return this.fetch("/videos",{
            method:"POST",
            body: videodata
        })
    }
}

export  const apiClient = new ApiClient()