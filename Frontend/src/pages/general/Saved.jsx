import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import ReelFeed from '../../components/ReelFeed'
import BottomNav from '../../components/BottomNav'

const Saved = () => {
    const [ videos, setVideos ] = useState([])
    const location = useLocation()
    const selectedReelId = location.state?.selectedReelId

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/api/item/save`, { withCredentials: true })
            .then(response => {
                const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.item._id,
                    video: item.item.video,
                    description: item.item.description,
                    likeCount: item.item.likeCount,
                    savesCount: item.item.savesCount,
                    commentsCount: item.item.commentsCount,
                    foodPartner: item.item.foodPartner,
                }))
                
                // Reorder videos so selected reel is first
                if (selectedReelId) {
                    const selectedIndex = savedFoods.findIndex(food => food._id === selectedReelId)
                    if (selectedIndex > 0) {
                        const selected = savedFoods.splice(selectedIndex, 1)[0]
                        savedFoods.unshift(selected)
                    }
                }
                
                setVideos(savedFoods)
            })
    }, [selectedReelId])

    const removeSaved = async (item) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/api/item/save`, { itemId: item._id }, { withCredentials: true })
            if (!response.data.save) {
                // Item was unsaved, remove it from the list
                setVideos((prev) => prev.filter((v) => v._id !== item._id))
            }
        } catch (error) {
            console.error("Error saving item:", error)
        }
    }

    return (
        <div className="flex flex-col h-screen w-full bg-white dark:bg-gray-950 pb-20">
            <div className="flex-1 overflow-hidden">
                <ReelFeed
                    items={videos}
                    onSave={removeSaved}
                    showSaveButton={true}
                    emptyMessage="No saved videos yet."
                />
            </div>
            <BottomNav />
        </div>
    )
}

export default Saved