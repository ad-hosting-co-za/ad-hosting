-- Insert initial admin user role (replace UUID with actual admin user ID)
INSERT INTO public.roles (user_id, roles)
VALUES 
    ('00000000-0000-0000-0000-000000000000', ARRAY['admin']::role[])
ON CONFLICT (user_id) 
DO UPDATE SET roles = ARRAY['admin']::role[];

-- You can add more seed data here as needed 