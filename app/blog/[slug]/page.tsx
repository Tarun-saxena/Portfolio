import React from "react";

interface Params {
    slug: string;
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { slug } = await params;
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Blog Post: {slug}</h1>
            <p>Post content coming soon!</p>
        </div>
    );
}
