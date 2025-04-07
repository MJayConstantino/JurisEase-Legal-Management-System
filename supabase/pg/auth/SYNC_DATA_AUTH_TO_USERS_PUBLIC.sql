-- Step 1: Create the Function
CREATE OR REPLACE FUNCTION sync_user_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Fetch data from the auth.users table and insert into public.users
  INSERT INTO public.users (user_id, user_email, user_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql security definer;

-- Step 2: Create the Trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION sync_user_data();
