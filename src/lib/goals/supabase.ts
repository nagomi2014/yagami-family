import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let _readClient: SupabaseClient | null = null;
let _adminClient: SupabaseClient | null = null;

export function getReadClient(): SupabaseClient {
  if (!url || !anonKey) {
    throw new Error(
      "Supabase 未設定: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY を .env.local に追加してください"
    );
  }
  if (!_readClient) {
    _readClient = createClient(url, anonKey, {
      auth: { persistSession: false },
    });
  }
  return _readClient;
}

export function getAdminClient(): SupabaseClient {
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase 管理用キー未設定: SUPABASE_SERVICE_ROLE_KEY を .env.local に追加してください"
    );
  }
  if (!_adminClient) {
    _adminClient = createClient(url, serviceRoleKey, {
      auth: { persistSession: false },
    });
  }
  return _adminClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}
