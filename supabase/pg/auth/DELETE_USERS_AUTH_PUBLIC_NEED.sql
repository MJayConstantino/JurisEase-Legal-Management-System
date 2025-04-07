-- Function to delete the associated row in public.users
CREATE OR REPLACE FUNCTION delete_user_in_public_users()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public.users WHERE user_id = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for DELETE operation on auth.users
CREATE TRIGGER on_auth_user_deleted
AFTER DELETE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION delete_user_in_public_users();

-- Function to delete the associated row in auth.users
CREATE OR REPLACE FUNCTION delete_user_in_auth_users()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM auth.users WHERE id = OLD.user_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for DELETE operation on public.users
CREATE TRIGGER on_public_user_deleted
AFTER DELETE ON public.users
FOR EACH ROW
EXECUTE FUNCTION delete_user_in_auth_users();
