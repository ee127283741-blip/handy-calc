# 發布流程（Operator bot 用）

本文件說明 operator bot 如何新增 prompt（提示詞）、新增文章（tutorial / guide）、加入 prompt 效果示範圖（proof image），以及內容如何上線。

網站定位：**Prompt 資料庫是主要產品**（網頁設計、視覺特效、互動、動態、影片剪輯、運鏡、圖像生成、寫作、產業別），加上 AI 知識教學文章，以及純前端的 **Idea → Prompt** 工具（`/idea-to-prompt/`）。網站名稱為「AI Founder Atlas」，正式網址 https://ai-founder-atlas.pages.dev（Cloudflare Pages 專案名稱 `ai-founder-atlas`）。

## 0. 原則

- 網站內容一律 **English**；本文件為繁體中文。
- **不花錢**：不買網域、不用付費工具/API。網站任何地方**都不呼叫 AI API**（Idea → Prompt 是 `src/lib/ideaToPrompt.ts` 的規則＋模板純函式）。
- **不捏造**：數字、價格、搜尋量都要有來源；查不到就寫「查不到」。作者一律為 `Editorial team`，不可捏造人物或資歷。
- 寧缺勿濫：避免 scaled content abuse / doorway pages。不要做只換一個字的 prompt（例如「Landing page prompt for dentists」「…for plumbers」），改用變數。

## 0.1 AI 創業案例寫作標準（每日新增 case 必讀）

檔案：`src/content/cases/<slug>.md`，網址 `/cases/<slug>/`。`src/content/cases.test.ts` 會強制檢查以下規則，不符合 `npm test` 會失敗。

**關鍵字優先流程（寫任何字之前先做）：**

1. 先定 `primaryKeyword`（1 個，小寫，例如 `photo ai revenue`）與 `secondaryKeywords`（3–5 個長尾，例如 `pieter levels photo ai`、`photo ai mrr`）。候選來源：`/workspace/seo-audit/keywords.md`。
2. 用 Google autocomplete 檢查是否為真實搜尋詞：`curl -s 'https://suggestqueries.google.com/complete/search?client=firefox&q=photo%20ai%20revenue'`。若 autocomplete 給出更自然的寫法（例：`base44 acquisition` 而非 `base44 acquisition wix`；`gamma ai revenue` 而非 `gamma app revenue`），改用它。沒有建議的詞可以保留，但不要編造搜尋量。
3. 關鍵字裡的人名、公司名要跟 frontmatter `founders`／`company` 一致；不一致時只有在找到來源時才改 frontmatter，否則改關鍵字。
4. `primaryKeyword` 必須（不分大小寫）出現在：`title`（= `<title>` 與 H1）、`summary`（= 首段 `<p class="answer">` 與 meta description）。`npm test` 會在原始檔與 build 後的 HTML 兩邊都檢查；og:image alt 由 title 產生，所以也會包含。
5. H2 一律是「公司名＋主題問句」（例 `How much revenue does Photo AI make?`），仍須符合下方 8 章順序。
6. FAQ 3–5 題，問句盡量用 secondaryKeywords 的長尾說法；答案只能用本文已有、附來源的事實。
7. 改寫 title／summary 時**數字、日期、來源標籤不可變動或新增**。

**自動產生的 SEO 輸出：** `/og/<slug>.png`（build 時用 satori + resvg 產生 1200×630 純文字卡片，不用 AI 圖）、`og:type=article`、`twitter:card=summary_large_image`、Article JSON-LD（`datePublished` = `published`、`dateModified` = `updated`、`image`、`author`，型別用 `schema-dts` 檢查）、FAQPage JSON-LD、sitemap `lastmod` = `updated`。CI 另有 Lighthouse CI job（`lighthouserc.json`，對 `dist/` 起靜態伺服器跑，assertion 只警告，不擋部署）。

**Frontmatter**（schema 在 `src/content.config.ts`）：除既有欄位（`mrr`、`totalRevenue`、`teamSize`、`metrics`、`sources`…）外必填：

- `tldr`：2–3 句的直接答案（AEO），包含公司做什麼、最關鍵的營收數字＋日期＋來源標籤。顯示在頁首。
- `primaryKeyword`、`secondaryKeywords`、`published`（首次發布日，`YYYY-MM-DD`）：見上方關鍵字流程。
- `faq`：3–5 題，`q` 用真實搜尋問句並以 `?` 結尾，`a` 是可獨立引用的答案（含標籤）。會渲染成 FAQ 區塊並輸出 FAQPage JSON-LD（與 Article JSON-LD 並列）。
- 每個數字：`label`（founder-reported / verified / media-reported / unverified）＋ `sourceUrl`，日期只寫 `YYYY-MM`；沒有數字就寫 `Not disclosed` 並用 `not-disclosed`。

**本文：長篇敘事章節，流暢段落，禁止條列（`-`、`*`、`1.`）與 H1/H3。** 結構固定：

1. 開頭（無標題）：場景或對比的 hook，≥50 字。
2. 8 個 H2，**全部是真實搜尋問句、以 `?` 結尾**，依序涵蓋：
   1. 為什麼創辦／解決什麼痛點（例：`Why did Pieter Levels start Photo AI?`）
   2. 產品怎麼運作（`How does X work?`）
   3. 怎麼做出來（含 `built`）
   4. 行銷、銷售、定價（含 market / price / sell / customers）
   5. 轉折與挑戰（含 challenge / risk / hard）
   6. 成果：營收＋日期（含 revenue / money / make）
   7. 分析為什麼成功（`Why did X work?`）
   8. 給讀者的教訓（含 learn / lessons）
3. 每章 ≥40 字，全文 ≥450 字（目標 800 字以上，但**不可為了字數灌水或補事實**）。

**數字與來源規則（最重要）：**

- frontmatter 每個有數字的 figure，其 `sourceUrl` 必須以 markdown 連結出現在本文，且本文要出現它的標籤文字，例如 `$100K a month ([founder-reported, Indie Hackers](https://…))`。
- 任何含 `$數字` 的段落必須有來源連結；若只是回顧（timeline）可重複前文已附來源的同一數字；真的沒有來源的數字必須寫明 `no linked source`。
- 有 `Not disclosed` 的欄位，本文要明說 not disclosed。
- 絕不誇大、不推估、不加入來源沒有的事實；分析與教訓段落只能是對既有事實的解讀。
- 寫可獨立被引用的事實句（主詞＋數字＋日期＋標籤＋來源），方便 AI 引擎摘錄。

**站內連結：** 本文至少連到 2 個其他存在的 case（`[Photo AI](/cases/photo-ai/)`），優先同產業或同策略。

**自動產生：** TL;DR 框、作者（Editorial team）＋ Updated 日期、FAQ、文末「data summary」數據框（由 frontmatter 產生）、Sources 列表，不需在本文手寫。

## 1. 新增 prompt

檔案位置：`src/content/prompts/<category>/<slug>.md`，網址為 `/prompts/<category>/<slug>/`。

`category` 必須是：`web-design`、`visual-effects`、`interaction`、`motion`、`video-editing`、`camera-moves`、`image-generation`、`writing`、`industry`（定義在 `src/site.ts` 的 `PROMPT_CATEGORIES`）。

Frontmatter（Zod schema 在 `src/content.config.ts`，不符合會 **build fail**）：

```yaml
title: "SaaS Landing Page Design Spec Prompt"   # ≤ 70 字元，全站唯一
slug: saas-landing-page-design-spec
category: web-design
purpose: "1–2 句說明這個 prompt 做什麼（40–300 字元，也用作 meta description）"
variables:
  - name: product_name            # 只能用 a-z、0-9、底線
    description: "要填什麼"
    example: "Ledgerly"
tools: ["ChatGPT", "Claude"]      # 建議使用的工具
image: /prompt-proofs/web-design/saas-landing-page-design-spec.webp   # 選填，見第 3 節
imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"   # 選填
tags: ["landing-page", "ui"]      # 用來找相關 prompt
published: 2026-11-01
updated: 2026-11-01
```

本文（body）：

1. **第一個 fenced code block（```text）就是完整 prompt**，頁面會顯示在 `<pre>` 並附 Copy 按鈕。變數寫成 `{{variable_name}}`，會自動高亮。
2. 之後可加 `## Tips`，每條用 `- ` 開頭（頁面只讀取 `- ` 開頭的行）。

Build 時自動檢查：prompt 內用到的 `{{變數}}` 必須都在 `variables` 宣告，宣告的變數也必須都有用到，否則 build fail。

撰寫要求：

- 原創、具體、可直接使用：明確的角色、輸入、輸出格式、限制條件；設計類要有色彩（hex＋對比度）、字級、間距、狀態、動態與無障礙要求；影像/影片類要有構圖、鏡頭、光線、比例與 negative prompt。
- 至少在一個列出的工具實際跑過一次再發布。
- 不引用在世藝術家名字作為風格；人物用一般描述，不用真實可辨識人物。
- 每個 category 至少保持 3 個 prompt（有測試檢查）。

## 2. 新增文章（tutorial / guide）

```bash
npm run new:guide -- --slug how-to-write-a-system-prompt --category prompting
```

`--category` 必須是知識 hub：`ai-productivity`、`ai-business`、`ai-tools`、`ai-privacy`、`ai-costs`（AI Plans & Costs）、`prompting`（Prompting Tutorials）。產生 `src/content/guides/<slug>.mdx`，網址固定為 `/guides/<slug>/`。填完 TODO、至少 1 個來源，`status: published` 後會出現在所屬 hub。

- `subtopic`：必須是該 hub 在 `src/site.ts` 定義的 subtopic slug，否則 build fail。
- `faqs`：選填；有填就顯示 FAQ。
- `lastVerified`：文中事實（價格等）最後查證日期，會顯示在頁面上。
- 廣告開啟時，`src/remark-ad-after-p2.mjs` 會在第 2 個段落後插入廣告位，所以開頭至少寫 2 個完整段落。
- 內文連結：連到相關的 guide、`/prompts/<category>/` 或 `/idea-to-prompt/`。站內連結都會被測試檢查（目標必須存在或在 `public/_redirects`）。

### 2.1 文章研究流程

1. **搜尋目標關鍵字**，閱讀排名前 5–10 名的頁面，記下重點、資料日期、缺口。
2. **在 `content-briefs/<slug>.md` 寫 brief（English）**：目標關鍵字、搜尋意圖、讀過的 URL、競品共同重點、缺口、我們的大綱，最後一行寫 `Gap summary:`。
3. **撰寫原創內容**：涵蓋共同重點並補足缺口；有計算就列出算式。
4. **絕不改寫或轉述競品文字**，也不引用競品的價格或數據。
5. **價格**：直接寫成純文字，並連到官方定價頁（例如 `$20/month ([claude.com/pricing](https://claude.com/pricing))`），同時更新 `lastVerified`。網站已無集中的價格資料檔。

## 3. Prompt 效果示範圖（proof image）流程

只有我們自己產生、可重現的圖才能放上去。主要用於 `web-design`、`interaction`、`motion` 類 prompt。

1. 用該 prompt（把變數換成 frontmatter 裡的 `example` 值）在列出的工具產生結果，例如用 `claude` CLI 產生 HTML/CSS，再用 Chromium（headless）截圖。
2. 圖片存成 `public/prompt-proofs/<category>/<slug>.webp`，**1280×800**（頁面 `<img>` 固定 `width="1280" height="800"`，`loading="lazy"`，比例不同會變形），檔案 < 150 KB。
3. 在 frontmatter 填：
   - `image: /prompt-proofs/<category>/<slug>.webp`
   - `imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"`（照實寫用了什麼工具）
4. 把實際使用的完整 prompt 與產生日期記在 `IMAGE_SOURCES.md`。
5. 不可使用他人作品、圖庫圖或未標示來源的 AI 圖；沒有圖就留空，頁面不會顯示。
6. 更新 `updated` 日期。

## 4. 本機驗證

```bash
npm ci
npm test          # Vitest：Idea → Prompt 邏輯 + 兩次 build 的整站測試（廣告、搜尋索引、RSS、sitemap、結構化資料、站內連結）
npx astro check   # 型別檢查
npm run build     # 產生 dist/（含 sitemap、robots.txt、llms.txt、rss.xml、search-index.json）
npm run preview   # 本機預覽 http://localhost:4321
```

選配：`npx lighthouse http://localhost:4321/<path>/ --form-factor=mobile --chrome-flags="--headless --no-sandbox"`，目標 Performance、SEO、Accessibility、Best Practices 皆 100。

## 5. 上線

1. 開分支、commit、開 PR → GitHub Actions CI（`.github/workflows/ci.yml`：astro check、vitest、build）必須全綠。
2. Cloudflare Pages 會為 PR 建立 preview 網址，檢查頁面。
3. Merge（或 `git push` 到 `main`）→ Cloudflare Pages 自動部署 production 到 `*.pages.dev`。
4. sitemap（含 lastmod）、`llms.txt`、`rss.xml`（guides＋prompts）、`search-index.json` 都在 build 時自動重建，不需手動改。
5. 選配：在 Google Search Console 用 URL Inspection 請求索引。

### Cloudflare Pages 設定（第一次）

- Build command：`npm run build`，Output directory：`dist`，Node 版本：20（環境變數 `NODE_VERSION=20`）。
- 環境變數：
  - `SITE_URL`：正式網址，例如 `https://<project>.pages.dev`（預設 `https://ai-founder-atlas.pages.dev`，影響 canonical、sitemap、robots、llms.txt、RSS）。
  - `PUBLIC_ADS_ENABLED`：維持 `false`，AdSense 核准前不可開啟；`false` 時 `AdSlot` 完全不輸出。開啟後每頁最多 4 個廣告位；prompt 頁只在 prompt 與 Copy 按鈕**之後**放 1 個。
  - `PUBLIC_CF_BEACON_TOKEN`：Cloudflare Web Analytics token；有設定才會載入 beacon。

## 6. 維護

- 每 90 天依 GSC 查詢資料更新內容；只有實質修改才更新 `updated` 日期。
- 定期檢查所有 `sources` 連結是否仍為 200。
- 文章中的價格至少每月對照官方頁面查證一次，並更新 `lastVerified`。
- 舊網址不要重用：料理／DIY／手作／日期頁面以 301 導回首頁；已刪除的 3 個 AI 計算機以 301 導到對應文章（見 `public/_redirects`）。
- `/calculators/` 網址保留作為「Browse all」總目錄。
