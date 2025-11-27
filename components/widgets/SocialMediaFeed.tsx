
import React, { useState, useEffect } from 'react';
import { SocialPost } from '../../types';
import { Twitter, Facebook, Instagram, MessageCircle, Heart, Share2 } from 'lucide-react';

export const SocialMediaFeed: React.FC = () => {
    const [posts, setPosts] = useState<SocialPost[]>([]);

    useEffect(() => {
        const MOCK_POSTS: SocialPost[] = [
            { id: '1', platform: 'Twitter', user: 'Naija Decides', handle: '@naija_votes', content: 'Huge queues in Alimosho! People are determined to vote today. #NigeriaDecides2023', timestamp: '2m ago', likes: 1204 },
            { id: '2', platform: 'Facebook', user: 'Emeka U.', handle: 'Emeka U.', content: 'My PU in Enugu is very organized. BVAS worked in seconds!', timestamp: '5m ago', likes: 89 },
            { id: '3', platform: 'TikTok', user: 'Slay Queen', handle: '@slay_vote', content: '[Video] Dancing while waiting to vote! 🇳🇬', timestamp: '12m ago', likes: 5400 },
            { id: '4', platform: 'Twitter', user: 'Election Monitor', handle: '@monitor_ng', content: 'Alert: Logistics delay reported in 3 wards in Rivers State. INEC officials just arrived.', timestamp: '15m ago', likes: 340 },
        ];
        setPosts(MOCK_POSTS);
    }, []);

    const getIcon = (platform: string) => {
        switch(platform) {
            case 'Twitter': return <Twitter size={10} className="text-[#1DA1F2]" />;
            case 'Facebook': return <Facebook size={10} className="text-[#4267B2]" />;
            case 'Instagram': return <Instagram size={10} className="text-[#E1306C]" />;
            case 'TikTok': return <MessageCircle size={10} className="text-black" />;
            default: return <MessageCircle size={10} />;
        }
    };

    return (
        <div className="h-full flex flex-col bg-white overflow-hidden">
            <div className="p-2 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase">Public Social Stream</h4>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                {posts.map(post => (
                    <div key={post.id} className="border border-gray-100 rounded p-2 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                            <div className="flex items-center gap-1.5">
                                {getIcon(post.platform)}
                                <span className="text-[10px] font-bold text-gray-900">{post.user}</span>
                                <span className="text-[9px] text-gray-400">{post.handle}</span>
                            </div>
                            <span className="text-[9px] text-gray-400">{post.timestamp}</span>
                        </div>
                        <p className="text-[10px] text-gray-700 leading-snug mb-1.5">
                            {post.content}
                        </p>
                        <div className="flex items-center gap-3 text-gray-400">
                            <div className="flex items-center gap-1 text-[9px]">
                                <Heart size={10} /> {post.likes.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1 text-[9px]">
                                <Share2 size={10} /> Share
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
