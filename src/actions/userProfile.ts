
import type { User } from "@/types/user.type"
import { supabase } from "@/lib/supabase"

export async function updateUsername(user: User){
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("user_id", user.user_id)
    .select()

  if (error) {
    console.error("Error updating profile name:", error);
    return null;
  }

  return data;
}

export async function deleteUser(user: User) {
  const { error } = await supabase
  .from("users")
  .delete()
  .eq("user_id", user.user_id)
  
  if (error) {
    throw new Error('Failed to delete user: ' + error.message)
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

  return null;
}