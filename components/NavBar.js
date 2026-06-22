"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

// This navbar is DUMB on purpose. It shows the same links no matter who is
// looking, even when nobody is logged in. Part of your job is to make it adapt
// to the auth state: show the user's name + role and a "Sign Out" button when
// they are logged in, and just a "Login" link when they are not.
//
// Hint: this is a client component, so you can already call useAuth() in here.

export default function NavBar() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleLogout() {
    setIsSigningOut(true);
    await logout();
    setIsSigningOut(false);
  }

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-indigo-600">
          PostHub
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/posts"
            className="text-slate-600 transition-colors hover:text-indigo-600"
          >
            Posts
          </Link>
          <Link
            href="/admin"
            className="text-slate-600 transition-colors hover:text-indigo-600"
          >
            Admin
          </Link>
          {loading ? (
            <div className="h-9 w-24 rounded-lg bg-slate-100" />
          ) : isAuthenticated ? (
            <>
              <div className="hidden text-right sm:block">
                <p className="font-medium text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.role}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isSigningOut}
                className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-60"
              >
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white
                         transition-colors hover:bg-indigo-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
