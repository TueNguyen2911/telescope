import { createClient } from '@supabase/supabase-js';

const { SERVICE_ROLE_KEY, SUPABASE_URL } = process.env;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function buildLogExistsInStorage(sha) {
  try {
    const { publicUrl } = await supabase.storage.from('build_logs').getPublicUrl(`${sha}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
async function uploadBuildLog(log_text) {
  const { data, error } = await supabase.storage
    .from('build_logs')
    .upload('public/avatar1.png', log_text);
  console.log(data);
}

export { buildLogExistsInStorage, uploadBuildLog };
