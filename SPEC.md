# AI Founder Atlas — 網站規格書（v2.0, 2026-11-02）

> 網站：AI 創業案例庫，https://ai-founder-atlas.pages.dev 。網站內容一律 **English**，目標讀者為英語系的創業者與產品人。
> 本文件說明「網站長什麼樣、怎麼運作」；**怎麼寫、怎麼研究、怎麼上線**見 `PUBLISHING.md`（寫作規則以 PUBLISHING.md 為準）。
> 歷史：本專案原為計算機網站（handy-calc），後改為提示詞庫（ProofedPrompts），2026-11 轉為 AI 創業案例庫。舊網址全部以 301 導向，見第 6 節。

---

## 0. 硬性限制

1. **不花錢**：不買網域、不用付費工具/API、不開付費方案。要買任何東西先問使用者。
2. **不呼叫 AI API**：網站任何地方都不在執行時呼叫 AI。
3. **全靜態（SSG）**：所有頁面在 build 時產生，沒有後端、沒有資料庫。正文與數字必須在 HTML 裡，不能只靠前端 JS 才出現（很多 AI 爬蟲不執行 JS）。
4. **不捏造**：數字、人物、資歷、搜尋量都要有來源；作者一律為 `Editorial team`。
5. AdSense 核准前**完全停用**。

---

## 1. Tech Stack

| 用途 | 工具 |
|---|---|
| 框架 | Astro 5（content collections，純靜態輸出），TypeScript，純 CSS（`src/styles/global.css`） |
| Sitemap | `@astrojs/sitemap`（`lastmod` = 案例的 `updated`） |
| 結構化資料 | JSON-LD，型別用 `schema-dts` 檢查 |
| OG 圖片 | `satori` + `@resvg/resvg-js`，build 時產生 1200×630 純文字卡片（不用 AI 圖） |
| 字型 | Fraunces（自帶，見 `IMAGE_SOURCES.md`）＋系統字型 |
| 測試 | Vitest（內容規則＋整站 build 測試），`astro check` |
| 效能稽核 | Lighthouse CI（`lighthouserc.json`，只警告不擋部署） |
| 部署 | GitHub Actions → `wrangler pages deploy` → Cloudflare Pages 專案 `ai-founder-atlas` |
| 分析 | Cloudflare Web Analytics（cookieless，有設定 token 才載入） |

---

## 2. 網站結構

```
/                               首頁：全部案例＋篩選（產業、產品型態、月營收、創立年份；沒有 JS 時全部顯示）
/cases/                         全部案例列表
/cases/<slug>/                  案例頁（內容來源：src/content/cases/<slug>.md）
/industries/  /industries/<slug>/          依產業分類（主題中心 hub，產業定義在 src/site.ts INDUSTRIES）
/types/  /types/<slug>/  /types/app/<sub>/ 依產品型態分類（SaaS、App、Tool、Service、Content）
/authors/<slug>/                作者頁（Editorial team）
/about/ /contact/ /editorial-policy/ /privacy-policy/ /terms/ /404
/og/<slug>.png                  OG 圖片
/sitemap-index.xml /robots.txt /llms.txt /rss.xml /search-index.json
```

`src/` 目錄：

```
src/
  site.ts            網站名稱、網址、產業／產品型態／營收區間分類
  content.config.ts  案例 frontmatter schema（Zod，格式錯誤會 build fail）
  content/cases/     案例 Markdown；cases.test.ts 檢查寫作規則
  content/authors/   作者資料
  components/        Header、Footer、Breadcrumbs、CaseCards、CaseListPage、CaseSearch、JsonLd、AdSlot
  layouts/           BaseLayout（meta、OG、canonical）、PageLayout
  lib/               案例查詢工具、OG 圖產生
  pages/             路由（見上）
  ads.ts             廣告開關
  ads.build.test.ts  整站 build 測試（廣告、sitemap、結構化資料、站內連結、舊網址不可復活）
```

---

## 3. 案例頁

內容規則（關鍵字流程、章節、表格、原話、來源標籤、FAQ）全部在 `PUBLISHING.md` 0.1，並由 `cases.test.ts` 強制檢查。頁面由版型自動組成：

1. Breadcrumb → H1（= `title`，含 `primaryKeyword`）→ 分類連結（產業・產品型態）
2. 首段 answer（= `summary`，也是 meta description）＋ TL;DR 框（AEO）
3. 作者（Editorial team）＋ Updated 日期
4. 「At a glance」表格（營收、團隊人數、定價、成立時間、創辦人，含來源標籤）
5. 本文（5–7 個問句章節，含營收章、比較章、最後的重點條列；至少一張表格與一句創辦人原話）
6. FAQ 區塊
7. Data summary 數據框（由 frontmatter 產生，含來源標籤）
8. Sources 列表

結構化資料：`Article`（`datePublished`、`dateModified`、`image`、`author`、`about` = Organization＋founders）＋ `FAQPage`＋ `BreadcrumbList`。`og:type=article`、`twitter:card=summary_large_image`。

---

## 4. SEO／AEO／GEO 技術設定

寫作面的知識見 `PUBLISHING.md` 0.1、0.2。技術面：

- **Canonical**：每頁自我指向的絕對網址，統一結尾斜線。
- **robots.txt**（`src/pages/robots.txt.ts`）：全站允許並宣告 sitemap。AI 搜尋引用用的爬蟲（`OAI-SearchBot`、`Claude-SearchBot`、`PerplexityBot`、`Googlebot`）不可封鎖。
- **llms.txt**：build 時自動產生。Google 已說明它對排名沒有幫助，保留但不再投入。
- **sitemap／RSS／search-index**：build 時自動重建，不手動改。
- **Core Web Vitals** 目標（p75）：LCP ≤ 2.5s、INP ≤ 200ms、CLS ≤ 0.1。
- **Lighthouse** 目標：Performance ≥ 90、Accessibility ≥ 95、SEO ≥ 95。

---

## 5. 廣告

- `PUBLIC_ADS_ENABLED=true` **且** 設定 `PUBLIC_ADSENSE_CLIENT` 才會開啟；否則 `AdSlot` 完全不輸出（不留空框，避免版面跳動）。
- 開啟後每頁最多 4 個廣告位，標示 "Advertisement"，不貼近按鈕、不擠壓首屏內容。
- 遵守 AdSense Program policies；英國／歐盟用戶需 Google 認證的 CMP（開啟廣告時才做）。

---

## 6. 舊網址

`public/_redirects` 把計算機時期（`/cooking/`、`/home-diy/`、`/crafts/`、`/date-time/`、`/units/`、`/ai-costs/` 等）與提示詞時期（`/prompts/`、`/guides/`、`/idea-to-prompt/` 等）的網址全部 301 到首頁或對應產業頁，保留舊網址累積的搜尋權重。

- **不要刪除** `_redirects` 裡的舊規則，也**不要重用**這些網址。
- `ads.build.test.ts` 會檢查舊目錄沒有被重新產生、站內沒有連到舊網址。

---

## 7. 必要頁面

About（網站目的、方法論、AI 輔助揭露）、Contact、Editorial policy（來源標準、標籤定義、更正方式）、Privacy policy、Terms、Author page、404（含案例搜尋）。內容不可捏造人物或資歷。

---

## 8. 驗收標準

- `npx astro check`、`npm test`、`npm run build` 全部通過（CI 也會跑）。
- 每個案例符合 `PUBLISHING.md` 0.1，且至少連到 2 個其他案例。
- sitemap、robots、canonical、llms.txt、RSS 正確；Rich Results Test 無錯誤。
- 廣告關閉；沒有任何付費支出。
