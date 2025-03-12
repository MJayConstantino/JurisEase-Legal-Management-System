"use client";

import { signout } from "@/app/test/login/actions";

export function Signout() {
  return (
    <form action={signout}>
      <button type="submit">Sign out</button>
    </form>
  );
}
