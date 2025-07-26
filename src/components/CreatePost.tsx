import { useMutation } from "@tanstack/react-query";
import { useState, type ChangeEvent, type HTMLElementType } from "react";
import { supabase } from "../supabase-client";

interface PostInput {
  title: string;
  content: string;
}

const createPost = async (post: PostInput, imageFile: File) => {
  const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;
  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, imageFile);
  if (uploadError) throw new Error(uploadError.message);
  const { data: publicUrlData } = supabase.storage
    .from("post-images")
    .getPublicUrl(filePath);

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...post, image_url: publicUrlData.publicUrl });

  if (error) throw new Error(error.message);

  return data;
};

export const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) => {
      return createPost(data.post, data.imageFile);
    },
  });
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;
    mutate({ post: { title, content }, imageFile: selectedFile });
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  return (
    <form className="max-w-2xl mx-auto space-y-4" onSubmit={handleSubmit}>
      {" "}
      <div>
        {" "}
        <label className="block mb-2 font-medium"> Title</label>
        <input
          className="w-full border border-white/10 bg-transparent p-2 rounded"
          type="text"
          id="title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>{" "}
      <div>
        {" "}
        <label className="block mb-2 font-medium">Content</label>
        <textarea
          className="w-full border border-white/10 bg-transparent p-2 rounded"
          required
          rows={5}
          id="content"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>{" "}
      <div>
        {" "}
        <label className="block mb-2 font-medium">Upload Image</label>
        <input
          className="w-full text-gray-200"
          required
          type="file"
          accept="image/*"
          id="image   "
          onChange={handleFileChange}
        />
      </div>
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded cursor-pointer"
        type="submit"
      >
        {" "}
        {isPending ? "creating... " :"Create Post"}
      </button>
      {isError && <p className="text-red-500">error creating post</p>}
    </form>
  );
};
