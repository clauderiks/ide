import React, { useState } from 'react';
import { MessageSquare, GitPullRequest, ThumbsUp, MessageCircle, PlusCircle, CheckCircle2, Tag } from 'lucide-react';
import { ForumPost, Language } from '../types';

interface CommunityForumProps {
  language: Language;
}

const initialPosts: ForumPost[] = [
  {
    id: 'post-1',
    title: 'How to configure custom Vim keybindings for section navigation?',
    author: 'dev-guy-99',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    category: 'Q&A',
    replies: 14,
    upvotes: 38,
    createdAt: '2 hours ago',
    content: 'Is there a way to map "Ctrl+d" to scroll down half a page in the PR inspector view?',
    tags: ['keybindings', 'vim', 'config.yml']
  },
  {
    id: 'post-2',
    title: 'Feature Proposal: Native GraphQL query caching with Redis backend',
    author: 'cloud-ninja',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    category: 'Feature Request',
    replies: 29,
    upvotes: 82,
    createdAt: '1 day ago',
    content: 'Would love to see redis backend option for multi-machine enterprise team caching.',
    tags: ['redis', 'caching', 'graphql']
  },
  {
    id: 'post-3',
    title: 'PR #104 Review Status: Automated Daily Cloud Backup & 1-Click Restore',
    author: 'dlvhdr',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    category: 'Showcase',
    replies: 7,
    upvotes: 115,
    createdAt: '3 days ago',
    content: 'PR #104 is now open for community review! Includes AES-256 cloud encryption worker.',
    tags: ['pull-request', 'backup', 'cloud']
  }
];

export const CommunityForum: React.FC<CommunityForumProps> = () => {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'Feature Request' | 'Bug' | 'Q&A' | 'Showcase'>('Q&A');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const post: ForumPost = {
      id: `post-${Date.now()}`,
      title: newTitle,
      author: 'community-member',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      category: newCategory,
      replies: 0,
      upvotes: 1,
      createdAt: 'Just now',
      content: newContent,
      tags: [newCategory.toLowerCase().replace(/\s+/g, '-')]
    };

    setPosts([post, ...posts]);
    setNewTitle('');
    setNewContent('');
    setShowCreateModal(false);
  };

  const handleUpvote = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 font-mono select-none space-y-6">
      {/* Top Banner & Action */}
      <div className="p-5 rounded-none bg-black border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold font-mono text-white flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>Community Forum & Technical Support Discussions</span>
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Exchange ideas, ask questions, submit feature requests, and follow open-source Pull Request contributions.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          id="new-discussion-btn"
          className="px-3.5 py-2 rounded-none bg-emerald-600 hover:bg-emerald-500 border border-emerald-400 text-white font-mono text-xs font-bold transition flex items-center space-x-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Start New Discussion</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Main Forum Posts */}
        <div className="lg:col-span-2 space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-none bg-zinc-950 border border-zinc-800 space-y-3 hover:border-emerald-500/50 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded-none bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-bold">
                    {post.category}
                  </span>
                  <span className="text-zinc-500">• {post.createdAt}</span>
                </div>

                <div className="flex items-center space-x-2 text-xs text-zinc-400 font-mono">
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.replies} replies</span>
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-white font-mono leading-snug">
                {post.title}
              </h3>

              <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                {post.content}
              </p>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src={post.avatar} alt={post.author} className="w-5 h-5 rounded-none border border-zinc-700 object-cover" />
                  <span className="text-xs font-mono text-zinc-400">@{post.author}</span>
                </div>

                <button
                  onClick={() => handleUpvote(post.id)}
                  className="px-2.5 py-1 rounded-none bg-black border border-zinc-800 hover:border-emerald-500/60 text-zinc-300 hover:text-emerald-400 font-mono text-xs transition flex items-center space-x-1.5"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{post.upvotes} Upvotes</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right PR Guidelines & Contribution Info */}
        <div className="space-y-6 font-mono">
          <div className="p-5 rounded-none bg-zinc-950 border border-zinc-800 space-y-4">
            <h3 className="text-xs font-bold text-white flex items-center space-x-2">
              <GitPullRequest className="w-4 h-4 text-emerald-400" />
              <span>Pull Request Guidelines</span>
            </h3>

            <div className="space-y-2 text-xs text-zinc-300 leading-relaxed">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Fork repo and create feature branch from <code className="text-emerald-400">main</code>.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Run unit tests before submitting: <code className="text-emerald-400">go test ./...</code></span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Format source files with <code className="text-emerald-400">gofmt -s -w .</code></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 font-mono select-none">
          <div className="bg-black border border-zinc-800 rounded-none p-5 max-w-lg w-full shadow-[0_0_30px_rgba(0,0,0,0.9)] space-y-4">
            <h3 className="text-sm font-bold text-white">Start a Discussion</h3>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Summarize your discussion topic..."
                  className="w-full p-2 rounded-none border border-zinc-800 bg-zinc-950 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2 rounded-none border border-zinc-800 bg-zinc-950 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Q&A">Q&A / Help</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Bug">Bug Report</option>
                  <option value="Showcase">Showcase</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Content Details</label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Provide context, reproduction steps, or details..."
                  className="w-full p-2 rounded-none border border-zinc-800 bg-zinc-950 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 rounded-none bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-zinc-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-none bg-emerald-600 hover:bg-emerald-500 border border-emerald-400 text-white font-bold"
                >
                  Post Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
