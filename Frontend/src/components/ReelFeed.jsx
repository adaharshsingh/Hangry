import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Reusable feed for vertical reels
// Props:
// - items: Array of video items { _id, video, description, likeCount, savesCount, commentsCount, comments, foodPartner }
// - onLike: (item) => void | Promise<void>
// - onSave: (item) => void | Promise<void>
// - showSaveButton: boolean (default: true) - show or hide the save button
// - emptyMessage: string
const ReelFeed = ({ items = [], onLike, onSave, showSaveButton = true, emptyMessage = 'No videos yet.' }) => {
  const videoRefs = useRef(new Map())
  const [mutedStates, setMutedStates] = useState({})
  const [pausedStates, setPausedStates] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            if (!pausedStates[video.id]) {
              video.play().catch(() => { /* ignore autoplay errors */ })
            }
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [items, pausedStates])

  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return }
    videoRefs.current.set(id, el)
  }

  const toggleMute = (itemId) => {
    setMutedStates(prev => {
      const newState = !prev[itemId]
      const video = videoRefs.current.get(itemId)
      if (video) video.muted = newState
      return { ...prev, [itemId]: newState }
    })
  }

  const togglePause = (itemId) => {
    setPausedStates(prev => {
      const newState = !prev[itemId]
      const video = videoRefs.current.get(itemId)
      if (video) {
        if (newState) {
          video.pause()
        } else {
          video.play().catch(() => {})
        }
      }
      return { ...prev, [itemId]: newState }
    })
  }

  return (
    <div className="w-full h-full bg-black overflow-hidden">
      <div className="h-full w-full overflow-y-auto scroll-smooth snap-y snap-mandatory" role="list">
        {items.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-400 text-xl">{emptyMessage}</p>
          </div>
        )}

        {items.map((item) => (
          <section key={item._id} className="relative w-full h-screen min-h-screen flex items-center justify-center bg-black snap-start" role="listitem">
            <video
              id={item._id}
              ref={setVideoRef(item._id)}
              className="absolute inset-0 w-full h-full object-contain"
              src={item.video}
              muted={mutedStates[item._id] ?? true}
              playsInline
              loop
              preload="metadata"
              onClick={() => togglePause(item._id)}
            />

            {/* Play/Pause Center Indicator */}
            {pausedStates[item._id] && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="bg-white/30 rounded-full p-4 backdrop-blur-sm">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            )}

            {/* Mute Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleMute(item._id)
              }}
              className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              aria-label={mutedStates[item._id] ? 'Unmute' : 'Mute'}
            >
              {mutedStates[item._id] ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.98 8.223A7.5 7.5 0 015.064 12.5M3 12a9 9 0 0117.938 1M3.828 9.172a4 4 0 015.656 0M9 11a1 1 0 011-1v0a1 1 0 011-1m0 0a1 1 0 00-1 1v0a1 1 0 001 1m0-3V8m0 4v4m6-1a9 9 0 01-9-9m11.357-1a4.5 4.5 0 00-6.364 0"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.536 8.464a5 5 0 010 7.072M17.657 6.343a8 8 0 010 11.314M9.172 6.828L6.343 9.657M4 12a8 8 0 0110.82 7.18"/>
                </svg>
              )}
            </button>

            {/* Overlay with gradient and actions */}
            <div className="absolute inset-0 flex flex-col items-end justify-end pointer-events-none">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />

              {/* Actions panel */}
              <div className="absolute right-4 bottom-24 flex flex-col gap-4 z-20 pointer-events-auto">
                {/* Like */}
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={onLike ? () => onLike(item) : undefined}
                    className="text-white hover:text-red-500 transition-colors"
                    aria-label="Like"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                    </svg>
                  </button>
                  <p className="text-white text-xs font-semibold">{item.likeCount ?? item.likesCount ?? item.likes ?? 0}</p>
                </div>

                {/* Save */}
                {showSaveButton && (
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className="text-white hover:text-blue-500 transition-colors"
                      onClick={onSave ? () => onSave(item) : undefined}
                      aria-label="Bookmark"
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                      </svg>
                    </button>
                    <p className="text-white text-xs font-semibold">{item.savesCount ?? item.bookmarks ?? item.saves ?? 0}</p>
                  </div>
                )}

                {/* Comments */}
                <div className="flex flex-col items-center gap-2">
                  <button className="text-white hover:text-green-500 transition-colors" aria-label="Comments">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                    </svg>
                  </button>
                  <p className="text-white text-xs font-semibold">{item.commentsCount ?? (Array.isArray(item.comments) ? item.comments.length : 0)}</p>
                </div>
              </div>

              {/* Content at bottom */}
              <div className="relative w-full px-4 pb-24 z-10 pointer-events-auto">
                <p className="text-white text-base font-medium line-clamp-2 drop-shadow-lg mb-3" title={item.description}>{item.description}</p>
                {item.food && (
                  <Link className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all" to={"/food/" + (item.food._id)} aria-label="Visit store">Visit store</Link>
                )} 
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default ReelFeed