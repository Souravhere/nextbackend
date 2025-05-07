"use client"
import { apiClient } from '@/lib/api-client'
import { IVideo } from '@/models/Video'
import React, { useEffect, useState } from 'react'


function Home() {

    const [videos, setVideos] = useState<IVideo[]>([])

    useEffect(()=>{
        const fetchVideos = async ()=> {
            try {
                const data = await apiClient.getVideos()
                setVideos(data)
            } catch (error) {
                console.error("Error to fetching videos", error)
            }
        }
    })

  return (
    <div>
        <h1>Hello Bro</h1>
    </div>
  )
}

export default Home
