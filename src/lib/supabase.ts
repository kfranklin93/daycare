import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Jobs related helpers
export const getJobs = async () => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const getJobById = async (id: string) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
};

export const createJob = async (jobData: any) => {
  const { data, error } = await supabase
    .from('jobs')
    .insert([jobData])
    .select();
  
  return { data, error };
};

export const updateJob = async (id: string, jobData: any) => {
  const { data, error } = await supabase
    .from('jobs')
    .update(jobData)
    .eq('id', id)
    .select();
  
  return { data, error };
};

export const deleteJob = async (id: string) => {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);
  
  return { error };
};

// Applications related helpers
export const getApplications = async (userId: string) => {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('applicant_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const createApplication = async (applicationData: any) => {
  const { data, error } = await supabase
    .from('applications')
    .insert([applicationData])
    .select();
  
  return { data, error };
};

// User profiles related helpers
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { data, error };
};

export const updateUserProfile = async (userId: string, profileData: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select();
  
  return { data, error };
};

// Organization related helpers
export const getOrganization = async (orgId: string) => {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', orgId)
    .single();
  
  return { data, error };
};

export const updateOrganization = async (orgId: string, orgData: any) => {
  const { data, error } = await supabase
    .from('organizations')
    .update(orgData)
    .eq('id', orgId)
    .select();
  
  return { data, error };
};