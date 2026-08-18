import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// 既定構成のまま。ISR/キャッシュは使っていない（/goals は force-dynamic、
// 他は静的）ので、インクリメンタルキャッシュは設定しない。
export default defineCloudflareConfig();
