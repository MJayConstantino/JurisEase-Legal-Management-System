"use server"

import type { User } from "@/types/user.type"
import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache";
import { createSupabaseClient } from '../utils/supabase/server'

export async function updateUsername(user: User){
  const { data, error } = await supabase
    .from("users")
    .update({ user_name: user.user_name })
    .eq("user_id", user.user_id)
    .select()

  if (error) {
    console.error("Error updating profile name:", error);
    return null;
  }
  revalidatePath(`/${user.user_id}`)

  return data;
}

export async function deleteUser(user: User) {
  const { error: deleteUserError } = await supabase
  .from("users")
  .delete()
  .eq("user_id", user.user_id)
  
  if (deleteUserError) {
    throw new Error('Failed to delete user: ' + deleteUserError.message)
  }

  const bucketName = "user";
  const folderPath = `${user.user_id}/`;

  const { data: files, error: listError } = await supabase.storage
    .from(bucketName)
    .list(folderPath, { limit: 100 });

  if (listError) {
    throw new Error("Failed to list files: " + listError.message);
  }

  if (files && files.length > 0) {
    const filePaths = files.map(file => `${folderPath}${file.name}`);

    const { error: deleteFilesError } = await supabase.storage
      .from(bucketName)
      .remove(filePaths);

    if (deleteFilesError) {
      throw new Error("Failed to delete user files: " + deleteFilesError.message);
    }
  }
}


export async function uploadAvatar(file: File, userId: string) {
  const { data: files, error: listError } = await supabase
    .storage
    .from('user')
    .list(userId);

  if (listError) {
    console.error('Error listing files:', listError);
  }

  if (files && files.length > 0) {
    const pathsToDelete = files.map(file => `${userId}/${file.name}`);
    const { error: removeError } = await supabase
      .storage
      .from('user')
      .remove(pathsToDelete);

    if (removeError) {
      console.error('Error deleting old avatar files:', removeError);
    }
  }

  const filePath = `${userId}/${file.name}`;
  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from('user')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
  } else {
    console.log('Uploaded successfully:', uploadData);
  }

  revalidatePath(`/${userId}`)
}

export async function findExistingAvatar(userId: string) {
  const extensions = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'tiff'];

  for (const ext of extensions) {
    const filePath = `${userId}/profile.${ext}`;
    const { data } = supabase.storage.from('user').getPublicUrl(filePath);
    const publicUrl = data.publicUrl;

    try {
      const response = await fetch(publicUrl, { method: 'HEAD' });
      if (response.ok) {
        return publicUrl;
      }
    } catch (error) {
      console.error('Error checking avatar existence for', ext, error);
    }
  }
  revalidatePath(`/${userId}`)

  return null;
}

export async function fetchUserName(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("users")
    .select("user_name")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching user name:", error);
    return null;
  }
  revalidatePath(`/${userId}`)

  return data?.user_name || null;
}

export async function fetchUsersAction(userId: string) {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('users')
    .select('user_id, user_name, user_email')
    .eq('user_id', userId)
    .single();

  if (error) {
    throw new Error('Error fetching user: ' + error.message);
  }

  return data;
}

