"use client";

import { FormEvent, startTransition, useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { createArticles } from "@/actions/articleActions";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function CreateArticlePage() {
  const [content, setContent] = useState("");

  const [formState, action, isPending] = useActionState(createArticles, {
    errors: {}, // Initialize with an empty errors object
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("content", content);

    // Wrap the action call in startTransition
    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Article Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter article title"
              />
              {formState.errors?.title && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.title.join(", ")}
                </span>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select Category</option>
                <option value="web-development">Story</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
              </select>
              {formState.errors?.category && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.category.join(", ")}
                </span>
              )}
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input
                id="featuredImage"
                name="featuredImage"
                type="file"
                accept="image/*"
              />
              {formState.errors?.featuredImage && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.featuredImage.join(", ")}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label>Content</Label>
              <ReactQuill theme="snow" value={content} onChange={setContent} />
              {formState.errors?.content && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.content.join(", ")}
                </span>
              )}
            </div>

            {/* Form-level errors */}
            {formState.errors?.formErrors && (
              <span className="font-medium text-sm text-red-500">
                {formState.errors.formErrors.join(", ")}
              </span>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button disabled={isPending} type="submit">
                {isPending ? "Loading..." : "Publish Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
