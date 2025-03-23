'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { withAuth } from '@/contexts/withAuth';
import { runFullVerification, verifySupabaseConnection, verifyTables, verifyStorageBuckets } from '@/supabase/sync';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RefreshCw, CheckCircle, XCircle, AlertCircle, Database, HardDrive } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type VerificationResult = {
  success: boolean;
  connection: boolean;
  tables: Array<{ table: string; exists: boolean; error?: string }>;
  storage: {
    success: boolean;
    buckets?: string[];
    missingBuckets?: string[];
    error?: any;
  };
};

const SupabaseStatus = () => {
  const { user } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);
  const [results, setResults] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runVerification = async () => {
    try {
      setIsVerifying(true);
      setError(null);
      
      const verificationResults = await runFullVerification();
      setResults(verificationResults as VerificationResult);
    } catch (err) {
      console.error('Verification error:', err);
      setError('Failed to run verification: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    runVerification();
  }, []);

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supabase Status</h1>
          <p className="text-muted-foreground mt-2">View and verify your Supabase connection status</p>
        </div>
        <Button 
          onClick={runVerification} 
          disabled={isVerifying}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isVerifying ? 'animate-spin' : ''}`} />
          {isVerifying ? 'Verifying...' : 'Refresh'}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" /> 
              Connection Status
            </CardTitle>
            <CardDescription>
              Verifies the connection to your Supabase project
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isVerifying ? (
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-5 w-40" />
              </div>
            ) : results ? (
              <div className="flex items-center gap-2">
                {results.connection ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
                <span className={results.connection ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>
                  {results.connection ? 'Connected successfully' : 'Connection failed'}
                </span>
              </div>
            ) : (
              <div className="text-muted-foreground">Waiting for verification...</div>
            )}
          </CardContent>
        </Card>

        {/* Tables Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" /> 
              Database Tables
            </CardTitle>
            <CardDescription>
              Verifies all required database tables exist
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isVerifying ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                ))}
              </div>
            ) : results?.tables ? (
              <div className="space-y-3">
                {results.tables.map((table, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {table.exists ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className={table.exists ? 'font-medium' : 'text-red-500 font-medium'}>
                      {table.table}
                    </span>
                    {!table.exists && table.error && (
                      <span className="text-sm text-muted-foreground">({table.error})</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground">Waiting for verification...</div>
            )}
          </CardContent>
        </Card>

        {/* Storage Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" /> 
              Storage Buckets
            </CardTitle>
            <CardDescription>
              Verifies storage buckets are properly configured
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isVerifying ? (
              <div className="space-y-3">
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                ))}
              </div>
            ) : results?.storage ? (
              <div className="space-y-3">
                {results.storage.success ? (
                  <>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Storage buckets verified</span>
                    </div>
                    {results.storage.buckets && results.storage.buckets.length > 0 && (
                      <div className="ml-7 text-sm text-muted-foreground">
                        Available buckets: {results.storage.buckets.join(', ')}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span className="text-red-500 font-medium">Storage verification failed</span>
                    </div>
                    {results.storage.missingBuckets && results.storage.missingBuckets.length > 0 && (
                      <div className="ml-7 text-sm text-red-400">
                        Missing buckets: {results.storage.missingBuckets.join(', ')}
                      </div>
                    )}
                    {results.storage.error && (
                      <div className="ml-7 text-sm text-red-400">
                        Error: {String(results.storage.error)}
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="text-muted-foreground">Waiting for verification...</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default withAuth(SupabaseStatus); 