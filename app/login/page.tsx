"use client";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    const createUserIfNeeded = async () => {
      if (status === "authenticated" && session?.user?.name && !loadingUser) {
        setLoadingUser(true);

        try {
          await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: session.user.name.toLowerCase().replace(/\s+/g, ""),
            }),
          });

          // after ensuring user exists → redirect
          router.replace("/admin/links");
        } catch (err) {
          console.error("User creation failed:", err);
        } finally {
          setLoadingUser(false);
        }
      }
    };

    createUserIfNeeded();
  }, [status, session, router, loadingUser]);

  if (status === "loading" || loadingUser) {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="flex justify-between h-screen">
      <div className="lg:basis-1/2 w-full">
        <div className="flex h-[20%] pt-[5%] pl-[5%] text-4xl font-semibold tracking-normal">
          <span
            className="flex h-[40%] cursor-pointer"
            onClick={() => router.push("/")}
          >
            Linktree
          </span>
        </div>

        <div className="flex text-3xl font-extrabold justify-center">
          Welcome back
        </div>

        <div className="flex text-lg text-gray-500 justify-center pt-8">
          Log in to your Linktree
        </div>

        <div className="flex justify-center py-12">
          <button
            onClick={() => signIn("github")}
            className="flex justify-center items-center gap-3 p-3 w-[70%] font-bold text-lg rounded-xl border border-gray-300 hover:border-gray-100"
          >
            <FaGithub className="text-xl" />
            Continue with Github
          </button>
        </div>
      </div>

      <div className="hidden basis-1/2 lg:flex bg-yellow-300 w-full">
        right
      </div>
    </div>
  );
}