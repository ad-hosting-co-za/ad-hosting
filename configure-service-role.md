# Setting Up Supabase Admin Access

To properly verify and manage your Supabase resources, you need to set up the service role key for admin access. This key has elevated privileges and can bypass Row Level Security (RLS) policies.

## Steps to Obtain the Service Role Key

1. Log in to your Supabase dashboard at https://app.supabase.com
2. Select your project: "kgdthezjfdnoedvwryus"
3. Go to "Project Settings" (the gear icon in the sidebar)
4. Select "API" from the settings menu
5. In the "Project API keys" section, find the "service_role" key (this is hidden by default)
6. Click "Reveal" to see the key
7. Copy the service_role key for the next step

## Setting the Environment Variable

### In PowerShell (temporary)

```powershell
$env:SUPABASE_SERVICE_ROLE_KEY = "your-service-role-key-here"
```

### In your .env file (recommended)

Add the following line to your `.env` file:

```
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Then you can load it in your scripts:

```javascript
// In your JavaScript files
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
```

## Testing the Configuration

After setting the environment variable, run:

```
node fix-verification.js
```

## Safety Warning

⚠️ **IMPORTANT**: The service role key provides full access to your database, bypassing all security rules. Never:

- Commit this key to version control
- Use it in client-side code
- Share it with unauthorized personnel

Always use it in secure server-side contexts only. 