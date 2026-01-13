import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'
import BottomNav from '../../components/BottomNav'

const Home = () => {
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/api/item`, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                setVideos(response.data.items)
            })
            .catch(() => { /* noop: optionally handle error */ })
    }, [])

    async function likeVideo(item) {
        const response = await axios.post(`${import.meta.env.VITE_API}/api/item/like`, { itemId: item._id }, {withCredentials: true})

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
    }

    async function saveVideo(item) {
        const response = await axios.post(`${import.meta.env.VITE_API}/api/item/save`, { itemId: item._id }, { withCredentials: true })
        
        if(response.data.save){
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
        }else{
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
        }
    }

    return (
        <div className="flex flex-col h-screen w-full bg-white dark:bg-gray-950 pb-20">
            <div className="flex-1 overflow-hidden">
                <ReelFeed
                    items={videos}
                    onLike={likeVideo}
                    onSave={saveVideo}
                    showSaveButton={true}
                    emptyMessage="No videos available."
                />
            </div>
            <BottomNav />
        </div>
    )
}

export default Home