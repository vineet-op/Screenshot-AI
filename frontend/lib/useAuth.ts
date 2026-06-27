"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthState {
    userId: string | null;
    checking: boolean;
}

/**
 * Client-side auth guard.
 *
 * The auth cookie is owned by the backend domain (e.g. *.onrender.com), so the
 * Next.js Edge middleware on the frontend domain cannot read it. Instead, each
 * protected page verifies the session by calling /api/auth/me, which carries the
 * cookie because the request goes to the backend origin.
 */
export function useAuth(): AuthState {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        let active = true;

        const verify = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`, {
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error("Not authenticated");
                }

                const data = await res.json();
                if (active) {
                    setUserId(data.userId);
                    setChecking(false);
                }
            } catch {
                if (active) {
                    setChecking(false);
                    router.replace("/login");
                }
            }
        };

        verify();

        return () => {
            active = false;
        };
    }, [router]);

    return { userId, checking };
}
