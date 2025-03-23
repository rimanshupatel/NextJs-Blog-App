"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const updateArticlesSchema = z.object({
  title: z.string().min(3).max(50),
  category: z.string().min(3).max(50),
  content: z.string().min(3),
});

type updateArticlesFormState = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
};

export const updateArticlesActions = async (
  articleId: string,
  prevState: updateArticlesFormState,
  formData: FormData
): Promise<updateArticlesFormState> => {
  const result = updateArticlesSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const existingArticle = await prisma.articles.findUnique({
    where: { id: articleId },
  });

  if (!existingArticle) {
    return {
      errors: {
        formErrors: ["Articles not Found"],
      },
    };
  }
  const { userId } = await auth();
  if (!userId) {
    return {
      errors: {
        formErrors: ["you must be logged in to update a article"],
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: { clearUserID: userId },
  });

  if (!user || existingArticle.authorID !== user.id) {
    return {
      errors: {
        formErrors: ["you are not authorized to edit this articles"],
      },
    };
  }
  let imageUrl = existingArticle.featuredImage;
  const imageFile = formData.get("featuredImage") as File | null;
  if (imageFile && imageFile.name !== "undefined") {
    try {
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

      if (uploadResult?.secure_url) {
        imageUrl: uploadResult.secure_url;
      } else {
        return {
          errors: {
            featuredImage: ["Failed to upload image. Please try again."],
          },
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          errors: {
            formErrors: [error.message],
          },
        };
      } else {
        return {
          errors: { formErrors: ["Error uploading image. Please try again."] },
        };
      }
    }
  }

  try {
    await prisma.articles.update({
      where: { id: articleId },
      data: {
        title: result.data.title,
        category: result.data.category,
        featuredImage: imageUrl,
        content: result.data.content,
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
          formErrors: ["Failed to update the article. Please try again."],
        },
      };
    }
  }
  redirect("/dashboard");
};
