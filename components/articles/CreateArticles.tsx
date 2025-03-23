"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "../ui/button";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const CreateArticles = () => {
  const [content, setContent] = useState("");
  const handleSubmit = () => {
    console.log("submitted");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>create a article</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>article title</Label>
            <Input
              type="input"
              id="title"
              name="title"
              placeholder="enter article title"
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <select
              id="category"
              name="category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select Category</option>
              <option value="technology">Technology</option>
              <option value="programming">Programming</option>
              <option value="web-development">Web Development</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <ReactQuill theme="snow" value={content} onChange={setContent} />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Publish</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateArticles;
