import React, { useState } from 'react';
import { MessageSquare, Tag, ThumbsUp, MessageCircle, Filter, Plus } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const samplePosts: Post[] = [
  {
    id: 1,
    title: "Tips for System Design Interviews",
    content: "I recently went through several system design interviews. Here are my key learnings...",
    author: "TechPro",
    category: "Interview Tips",
    likes: 24,
    comments: 8,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    title: "How to prepare for Google interviews?",
    content: "I'm preparing for Google interviews. Looking for advice on preparation strategy...",
    author: "CodeMaster",
    category: "Big Tech",
    likes: 15,
    comments: 12,
    timestamp: "5 hours ago"
  },
  {
    id: 3,
    title: "Best resources for DSA practice",
    content: "What are the best platforms and resources for practicing Data Structures and Algorithms?",
    author: "AlgoNinja",
    category: "Resources",
    likes: 32,
    comments: 18,
    timestamp: "1 day ago"
  }
];

const categories = [
  "All Topics",
  "Interview Tips",
  "Big Tech",
  "Resources",
  "Career Advice",
  "Resume Help",
  "Job Search",
  "Technical Skills"
];

const Forum = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const filteredPosts = selectedCategory === "All Topics"
    ? samplePosts
    : samplePosts.filter(post => post.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Discussion Forum</h1>
        <button
          onClick={() => setShowNewPostModal(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Discussion
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold">Categories</h2>
            </div>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === category
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.timestamp}</span>
                    <span className="flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{post.content}</p>
              
              <div className="flex items-center space-x-6 text-gray-500">
                <button className="flex items-center hover:text-indigo-600 transition-colors">
                  <ThumbsUp className="h-5 w-5 mr-1" />
                  {post.likes}
                </button>
                <button className="flex items-center hover:text-indigo-600 transition-colors">
                  <MessageCircle className="h-5 w-5 mr-1" />
                  {post.comments}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Discussion</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter discussion title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  {categories.filter(cat => cat !== "All Topics").map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={6}
                  placeholder="Write your discussion content..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowNewPostModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;