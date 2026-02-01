import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jdfzviczleyhvequmqen.supabase.co';
const supabaseAnonKey = 'sb_publishable_miqIGt7ORenEeIm1OEq6TQ_dmE48b8T';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
