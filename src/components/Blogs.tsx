const Blog = () => {
  const posts = [
    { id: 1, title: "Summer Sale Tips", date: "2025-09-20" },
    { id: 2, title: "New Collection Launch", date: "2025-09-18" },
  ];

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded p-4 shadow hover:shadow-lg transition">
            <h2 className="font-semibold text-xl">{post.title}</h2>
            <p className="text-gray-500 text-sm">Published on {post.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
