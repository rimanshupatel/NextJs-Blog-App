import { Navbar } from "@/components/Home/Header/Navbar";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  // Display fallback UI if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">You are not logged in</h1>
        <SignInButton>
          <Button variant="outline">Login</Button>
        </SignInButton>
      </div>
    );
  }

  // Check if the user exists in the database
  const loggedInUser = await prisma.user.findUnique({
    where: { clearUserID: user.id },
  });

  // Create a new user if they don't exist in the database
  if (!loggedInUser) {
    await prisma.user.create({
      data: {
        name: `${user.firstName} ${user.lastName}`,
        clearUserID: user.id,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
      },
    });
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
