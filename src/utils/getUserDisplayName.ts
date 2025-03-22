import { User } from "@/types/user.type";

export function getUserDisplayName(uid: string, users: User[]): string {
    const found = users.find((user) => user.user_id === uid);
    return found ? (found.user_name || found.user_email) : "N/A";
  }