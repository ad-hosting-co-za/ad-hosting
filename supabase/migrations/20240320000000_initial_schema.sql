-- Drop existing objects if they exist (in reverse order of dependencies)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TRIGGER IF EXISTS on_role_update ON public.roles;
DROP FUNCTION IF EXISTS public.handle_role_update();
DROP FUNCTION IF EXISTS public.has_role(role);
DROP TYPE IF EXISTS public.role;

-- Create custom types
CREATE TYPE public.role AS ENUM ('admin', 'editor', 'user');

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.roles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    roles role[] NOT NULL DEFAULT ARRAY['user']::role[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create function to handle role updates
CREATE OR REPLACE FUNCTION public.handle_role_update()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for role updates
DROP TRIGGER IF EXISTS on_role_update ON public.roles;
CREATE TRIGGER on_role_update
    BEFORE UPDATE ON public.roles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_role_update();

-- Create function to automatically create profile and role entries
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id)
    VALUES (NEW.id)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.roles (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security (idempotent)
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before creating new ones
DROP POLICY IF EXISTS "Users can read their own role" ON public.roles;
DROP POLICY IF EXISTS "Only admins can update roles" ON public.roles;
DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create policies
CREATE POLICY "Users can read their own role"
    ON public.roles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Only admins can update roles"
    ON public.roles FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM public.roles
        WHERE user_id = auth.uid()
        AND 'admin' = ANY(roles)
    ));

CREATE POLICY "Users can read their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Create function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(required_role role)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.roles
        WHERE user_id = auth.uid()
        AND required_role = ANY(roles)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create content table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.content (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title text NOT NULL,
    content jsonb NOT NULL,
    published boolean DEFAULT false,
    author_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL
);

-- Enable Row Level Security for content
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

-- Drop existing content policies
DROP POLICY IF EXISTS "Anyone can view published content" ON public.content;
DROP POLICY IF EXISTS "Authors can view their own content" ON public.content;
DROP POLICY IF EXISTS "Authors can create content" ON public.content;
DROP POLICY IF EXISTS "Authors can update their own content" ON public.content;
DROP POLICY IF EXISTS "Authors can delete their own content" ON public.content;

-- Create content policies
CREATE POLICY "Anyone can view published content"
    ON public.content FOR SELECT
    USING (published = true);

CREATE POLICY "Authors can view their own content"
    ON public.content FOR SELECT
    USING (auth.uid() = author_id);

CREATE POLICY "Authors can create content"
    ON public.content FOR INSERT
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own content"
    ON public.content FOR UPDATE
    USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own content"
    ON public.content FOR DELETE
    USING (auth.uid() = author_id); 