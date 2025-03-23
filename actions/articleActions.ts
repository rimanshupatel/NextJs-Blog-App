"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const createArticleSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  content: z.string().min(10),
});

type CreateArticleFormState = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
};

export const createArticles = async (
  prevState: CreateArticleFormState,
  formData: FormData
): Promise<CreateArticleFormState> => {
  // Parse and validate form data
  const result = createArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  });

  // Return validation errors if any
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors, // Use `errors` (plural)
    };
  }

  // Check if user is authenticated
  const { userId } = await auth();
  if (!userId) {
    return {
      errors: {
        formErrors: ["You must be logged in to create an article."],
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { clearUserID: userId },
  });
  if (!existingUser) {
    return {
      errors: {
        formErrors: ["User not found"],
      },
    };
  }
  // start creating image

  const imageFile = formData.get("featuredImage") as File | null;
  if (!imageFile || imageFile.name === "undefined") {
    return {
      errors: {
        featuredImage: ["image file is required"],
      },
    };
  }

  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadResult: UploadApiResponse | undefined = await new Promise(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" }, // ✅ Fix: Ensure correct file type handling
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    }
  );

  const imageUrl = uploadResult?.secure_url;

  if (!imageUrl) {
    return {
      errors: {
        featuredImage: ["Failed to upload image. Please try again."],
      },
    };
  }

  try {
    await prisma.articles.create({
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
        authorID: existingUser.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formErrors: ["some other error occurred "],
        },
      };
    }
  }
  revalidatePath("/dashboard");
  // Redirect to dashboard after successful submission
  redirect("/dashboard");
};
