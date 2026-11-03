"use client";

import { useEffect, useState, useCallback } from "react";
import Sidebar from "@/app/admin/Sidebar";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { dummyComments } from "@/data/portfolioData";
import Swal from "sweetalert2";
import {
  Trash2,
  Pin,
  Heart,
  MessageSquare,
  RefreshCcw,
  Send,
} from "lucide-react";

interface CommentReply {
  username: string;
  message: string;
  created_at: string;
}

interface CommentAdminItem {
  id: number;
  name: string;
  comment: string;
  image_url: string | null;
  likes: number;
  liked_by_admin?: boolean;
  replies?: CommentReply[];
  is_pinned: boolean;
  created_at?: string;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<CommentAdminItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState<Record<number, string>>({});

  const fetchComments = useCallback(async () => {
    setLoading(true);

    if (!isSupabaseConfigured) {
      setComments((dummyComments as unknown as CommentAdminItem[]) || []);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        setComments((dummyComments as unknown as CommentAdminItem[]) || []);
      } else {
        setComments((data as CommentAdminItem[]) || []);
      }
    } catch {
      setComments((dummyComments as unknown as CommentAdminItem[]) || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();

    if (!isSupabaseConfigured) return;

    const channel = supabase
      .channel("comments-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchComments]);

  const deleteComment = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Comment?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "#0f0f0f",
      color: "#fff",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#27272a",
    });

    if (!result.isConfirmed) return;

    await supabase.from("comments").delete().eq("id", id);

    setComments((prev) => prev.filter((item) => item.id !== id));

    Swal.fire({
      title: "Deleted",
      text: "Comment removed successfully",
      icon: "success",
      timer: 1600,
      showConfirmButton: false,
      background: "#0f0f0f",
      color: "#fff",
    });
  };

  const togglePin = async (id: number, current: boolean) => {
    const newValue = !current;

    await supabase
      .from("comments")
      .update({
        is_pinned: newValue,
      })
      .eq("id", id);

    setComments((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              is_pinned: newValue,
            }
          : item
      )
    );
  };

  const addLike = async (id: number, likes: number, liked: boolean) => {
    const newLiked = !liked;

    const newLikes = newLiked
      ? (likes || 0) + 1
      : Math.max((likes || 1) - 1, 0);

    await supabase
      .from("comments")
      .update({
        likes: newLikes,
        liked_by_admin: newLiked,
      })
      .eq("id", id);

    setComments((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              likes: newLikes,
              liked_by_admin: newLiked,
            }
          : item
      )
    );
  };

  const sendReply = async (commentId: number) => {
    const text = replyText[commentId];

    if (!text?.trim()) return;

    const target = comments.find((x) => x.id === commentId);

    const oldReplies = target?.replies || [];

    const newReply = {
      username: "Admin",
      message: text,
      created_at: new Date().toISOString(),
    };

    const updatedReplies = [...oldReplies, newReply];

    await supabase
      .from("comments")
      .update({
        replies: updatedReplies,
      })
      .eq("id", commentId);

    setComments((prev) =>
      prev.map((item) =>
        item.id === commentId
          ? {
              ...item,
              replies: updatedReplies,
            }
          : item
      )
    );

    setReplyText((prev) => ({
      ...prev,
      [commentId]: "",
    }));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="lg:ml-[250px] min-h-screen px-4 sm:px-6 lg:px-8 pt-[90px] lg:pt-6 pb-6">
        <div className="py-6 lg:py-8">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Comments</h1>

              <p className="text-sm text-white/40 mt-1">
                Manage visitor messages and interactions
              </p>
            </div>

            <button
              onClick={fetchComments}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm text-white/70 hover:text-white"
            >
              <RefreshCcw size={15} />
              Refresh
            </button>
          </div>

          {/* LIST */}
          {loading ? (
            <div className="text-white/40 text-sm">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] h-[240px] flex items-center justify-center text-white/35 text-sm">
              No comments yet
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment, i) => (
                <div
                  key={`admin-comment-${comment.id}-${i}`}
                  className={`rounded-2xl border transition-all p-4 sm:p-5 ${
                    comment.is_pinned
                      ? "border-yellow-500/30 bg-yellow-500/[0.03]"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <div className="flex flex-col xl:flex-row justify-between gap-4">
                    {/* LEFT */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-semibold text-[15px]">
                          {comment.name}
                        </span>

                        {comment.is_pinned && (
                          <span className="text-[9px] px-2 py-[3px] rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-500/20">
                            PINNED
                          </span>
                        )}

                        {comment.liked_by_admin && (
                          <span className="text-[9px] px-2 py-[3px] rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/20">
                            LIKED
                          </span>
                        )}
                      </div>

                      <p className="text-[13px] text-white/60 leading-6 mb-3 break-words">
                        {comment.comment}
                      </p>

                      {comment.image_url && (
                        <img
                          src={comment.image_url}
                          alt="Comment attachment"
                          className="rounded-2xl border border-white/10 w-full max-w-full sm:max-w-[260px] object-cover mb-4"
                        />
                      )}

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/35">
                        <span>{comment.likes || 0} likes</span>

                        <span>
                          {comment.created_at
                            ? new Date(comment.created_at).toLocaleDateString()
                            : ""}
                        </span>
                      </div>
                    </div>

                    {/* ACTION */}
                    <div className="flex xl:flex-col flex-row gap-2 shrink-0">
                      <button
                        onClick={() =>
                          addLike(
                            comment.id,
                            comment.likes,
                            Boolean(comment.liked_by_admin)
                          )
                        }
                        className={`px-3 py-2 rounded-xl border text-xs flex items-center justify-center gap-2 transition ${
                          comment.liked_by_admin
                            ? "bg-pink-500/15 border-pink-500/30 text-pink-300"
                            : "border-white/10 hover:bg-white/5 text-white/70"
                        }`}
                      >
                        <Heart size={14} />
                        {comment.liked_by_admin ? "Liked" : "Like"}
                      </button>

                      <button
                        onClick={() =>
                          togglePin(comment.id, Boolean(comment.is_pinned))
                        }
                        className={`px-3 py-2 rounded-xl border text-xs flex items-center justify-center gap-2 transition ${
                          comment.is_pinned
                            ? "bg-yellow-500/15 border-yellow-500/30 text-yellow-300"
                            : "border-white/10 hover:bg-white/5 text-white/70"
                        }`}
                      >
                        <Pin size={14} />
                        {comment.is_pinned ? "Unpin" : "Pin"}
                      </button>

                      <button
                        onClick={() => deleteComment(comment.id)}
                        className="px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center justify-center gap-2 hover:bg-red-500/20 transition"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* REPLIES */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                        <MessageSquare size={13} />
                        Replies ({comment.replies.length})
                      </div>

                      {comment.replies.map((r, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/70"
                        >
                          <span className="font-semibold text-white/90 mr-2">
                            {r.username}:
                          </span>
                          <span>{r.message}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* REPLY INPUT */}
                  <div className="flex gap-2 mt-4 pt-3 border-t border-white/5">
                    <input
                      placeholder="Reply as Admin..."
                      value={replyText[comment.id] || ""}
                      onChange={(e) =>
                        setReplyText({
                          ...replyText,
                          [comment.id]: e.target.value,
                        })
                      }
                      className="flex-1 px-3 py-2 rounded-xl bg-[#0f0f0f] border border-white/10 outline-none text-xs"
                    />

                    <button
                      onClick={() => sendReply(comment.id)}
                      className="px-3 py-2 rounded-xl bg-white text-black hover:opacity-90 transition flex items-center gap-1.5 text-xs font-medium"
                    >
                      <Send size={12} />
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
