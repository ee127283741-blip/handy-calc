# 發布流程（Operator bot 用）

本文件說明 operator bot 如何研究、撰寫、更新 AI 創業案例（case），以及內容如何上線。

網站定位：**AI 創業案例庫**（`/cases/`），每個案例都有附來源與標籤的營收、團隊、成長數據。網站名稱為「AI Founder Atlas」，正式網址 https://ai-founder-atlas.pages.dev（Cloudflare Pages 專案名稱 `ai-founder-atlas`）。

## 0. 原則

- 網站內容一律 **English**；本文件為繁體中文。
- **不花錢**：不買網域、不用付費工具/API。網站任何地方**都不呼叫 AI API**。
- **不捏造**：數字、價格、搜尋量都要有來源。作者一律為 `Editorial team`，不可捏造人物或資歷。
- 寧缺勿濫：避免 scaled content abuse / doorway pages。不要做只換一個名字的近似案例頁。

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
- 任何含 `$數字` 的段落必須有來源連結；若只是回顧（timeline）可重複前文已附來源的同一數字。
- **沒有來源的說法一律刪除，絕不保留**：找不到可連結、且內容確實支持該說法的來源時，刪掉整句或該數字，並讓前後文仍然通順。不可用「no linked source」「unverified, no link」之類的字樣保留它（測試會擋）。來源只支持較弱的說法時（例如「a hefty bill」而非具體金額），只寫來源支持的部分。
- 有 `Not disclosed` 的欄位，本文要明說 not disclosed。
- 絕不誇大、不推估、不加入來源沒有的事實；分析與教訓段落只能是對既有事實的解讀。
- 寫可獨立被引用的事實句（主詞＋數字＋日期＋標籤＋來源），方便 AI 引擎摘錄。

**站內連結：** 本文至少連到 2 個其他存在的 case（`[Photo AI](/cases/photo-ai/)`），優先同產業或同策略。

## 0.2 SEO／GEO／AEO 補充知識（2026-11 整理）

`SPEC.md` 第 4 節是技術設定，0.1 是案例的硬性規則；本節補寫作面的 SEO／GEO／AEO 知識。衝突時：0.1 ＞ 本節 ＞ SPEC。整理自 [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo)（MIT）的 seo-geo／seo-content／seo-cluster、[GEO 論文](https://arxiv.org/abs/2311.09735)、[AutoGEO（ICLR 2026）](https://github.com/cxcscmu/AutoGEO)、[awesome-generative-engine-optimization](https://github.com/amplifying-ai/awesome-generative-engine-optimization)。第三方研究的百分比只當方向參考，不可寫進網站內容。

**核心觀念：GEO／AEO 就是 SEO。** Google 的 [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)（2026-05 發布）明說：AI Overviews／AI Mode 用的是同一套排名與品質系統，沒有另外的「AI 索引」。頁面必須先能被 Google 收錄、可顯示摘要，才有機會被 AI 引用。所以先把 Google 排名做好，AI 引用會跟著來。

**Google 明說「不需要做」的事（不要浪費時間）：**
- 為 AI 另做 `llms.txt` 或特殊標記：對 Google 排名與引用沒有幫助（站上已有的 `llms.txt` 保留，可能對其他 AI 有用，但不要再投入）。
- 把內容切成小塊、為 AI 改寫特定句型、塞一堆長尾關鍵字變體。
- 製造假的品牌提及（在論壇、部落格自己貼自己）。
- 寫到某個字數目標：字數不是排名因素。0.1 的字數下限是「內容夠完整」的底線，不是目標。
- 假更新日期：只改 `updated` 不改內容會被視為作弊（同第 3 節）。

**真正有效的事（寫每篇 case 都要做到）：**
1. **獨特、第一手、非大路貨的內容**。Google 的例子：「首購族 7 個訣竅」是大路貨；「我們為什麼放棄驗屋還省了錢」是第一手經驗。對本站來說，就是**別人沒整理過的數字時間軸、來源比對、互相矛盾的說法**；「Why did X work?」分析段要提出具體、有依據的觀點，不要寫人人都會寫的通則。
2. **答案往前放**。AI 引用大多來自頁面前段：TL;DR 與首段就要有最關鍵的數字＋日期＋標籤；每個 H2 的**第一句**就直接回答該問句，再展開敘事。
3. **引用來源、具體數字、引述**是 GEO 論文中提升 AI 可見度最有效的三招（關鍵字堆砌無效）。前兩項 0.1 已強制；引述可用：每章最多一句、25 字以內的創辦人原話，加引號並附來源連結。
4. **實體寫清楚**：首次提到時寫全名，例如「Pieter Levels, the founder of Photo AI」，不要只寫「he」「the app」。公司名、創辦人名、產品名全文一致，跟 frontmatter 相同。AI 要能判斷「這段在講誰」才會引用。
5. **新鮮度**：AI 偏好近期更新的頁面。每 90 天（第 6 節）檢查每個 case 有沒有新數字；**有新的、有來源的數字才更新**，並照第 3 節保留舊數字當時間軸。
6. **Who／How／Why 自我檢查**（Google [helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)）：誰寫的（Editorial team，About 有說明）、怎麼做的（來源與標籤公開）、為什麼存在（幫讀者了解這家公司怎麼賺錢，不是為了搶點擊）。三題答不出好答案的案例不要做。

**選題：主題群組（hub-and-spoke），不要零散寫。**
- `industries/` 頁面是「主題中心」（hub），每個 case 是「分支」（spoke）。新 case 優先補**已有 2 篇以上的產業**，或一次規劃同一產業 3 篇，讓 hub 頁變強。
- 選題前用 Google autocomplete 試這些修飾詞，找真實問句：`revenue`、`how much`、`founder`、`how it works`、`pricing`、`alternative`、`vs`、`acquisition`、`open source`。
- 搜尋結果前 10 名高度重疊的兩個關鍵字＝同一篇；不要拆成兩篇近似頁（呼應 0「寧缺勿濫」）。
- 開源公司是好題材：GitHub 星數、貢獻者、release 時間都是公開可連結的數字。星數一律寫成「X GitHub stars as of YYYY-MM（[verified, GitHub](repo 連結)）」，它是熱度不是營收，不可拿來推估營收。

**技術面（已做好，改動時別弄壞）：**
- 內容是 Astro 靜態 HTML。很多 AI 爬蟲不執行 JavaScript，所以**正文與數字不可只靠前端 JS 才出現**。
- `robots.txt` 用 `User-agent: *` 全部允許。AI **搜尋引用**看的是 `OAI-SearchBot`（ChatGPT）、`Claude-SearchBot`（Claude）、`PerplexityBot`、`Googlebot`（AI Overviews／AI Mode）；`GPTBot`、`ClaudeBot`、`Google-Extended` 是**訓練用**，擋不擋都不影響 AI 搜尋引用。不要擋搜尋用的爬蟲。
- 本文規定不用條列（0.1），比較型資料改由 frontmatter 產生的 data summary 表格呈現。

**站外（選配，不花錢、不造假才做）：** AI 引用跟「品牌在 Reddit、YouTube、Wikipedia 被提到」的關聯比反向連結強。只能用真實、有價值的方式出現（例如在相關討論中回答問題並揭露身分），不可自導自演或大量貼連結。

**自動產生：** TL;DR 框、作者（Editorial team）＋ Updated 日期、FAQ、文末「data summary」數據框（由 frontmatter 產生）、Sources 列表，不需在本文手寫。

## 1. 新增 case

1. 選公司：必須有至少一個可公開連結的營收／成長數字來源（創辦人訪談、主流媒體、官方公告）。沒有來源就不做這個案例。
2. 依 0.1 的關鍵字流程定 `primaryKeyword`／`secondaryKeywords`。
3. 建立 `src/content/cases/<slug>.md`（`slug` 小寫、連字號，與檔名一致），可複製一個既有案例當範本，再把所有內容換掉。
4. 填 frontmatter（schema：`src/content.config.ts`；格式錯誤會 build fail），本文依 0.1 的 8 章結構撰寫。
5. 至少連到 2 個既有案例；必要時也在相關舊案例加回連。
6. 跑第 4 節的本機驗證。

## 2. 案例研究流程

1. **先找原始來源**：創辦人親口說法（podcast、X/LinkedIn 貼文、訪談）＞主流媒體報導＞資料庫（Latka 等）。二手部落格只能當線索，要追到它引用的原文。
2. **逐句核對**：每個數字、日期、事實都要在來源文字裡找到；來源說「first week $5K MRR」就不能寫成「$5K a month at launch」。
3. **標籤**：創辦人或公司自己說的 → `founder-reported`（經媒體轉述也算，寫成 `founder-reported via …`）；媒體自行取得 → `media-reported`；有公開財報／第三方稽核 → `verified`；來源本身說法存疑或互相矛盾 → `unverified`（仍必須有連結）。
4. **日期**：只寫 `YYYY-MM`，而且只有來源明確時才寫；不知道就不寫日期。
5. **來源清單**：每個用到的 URL 都加進 frontmatter `sources`（`title`、`url`、`publisher`、選填 `date`）。
6. **查不到就刪**：見 0.1，沒有來源的說法不留。
7. 絕不改寫或抄襲來源文字；用自己的話敘述，並附連結。

## 3. 更新既有 case

1. 有新數字時，新增到 `metrics`（保留舊數字作為時間軸），必要時更新 `mrr`／`teamSize`／`tldr`／`faq`，並在本文時間軸段落補上同一來源連結。
2. 發現既有說法沒有來源或來源不支持：先找替代來源，找不到就刪除（同 0.1）。
3. 只有實質修改才更新 `updated`（`YYYY-MM-DD`）；`published` 不動。
4. 不可在改寫標題、摘要時順手更動數字、日期或標籤。

## 4. 本機驗證

```bash
npm ci
npm test          # Vitest：case 內容規則 + 兩次 build 的整站測試（廣告、搜尋索引、RSS、sitemap、結構化資料、站內連結）
npx astro check   # 型別檢查
npm run build     # 產生 dist/（含 sitemap、robots.txt、llms.txt、rss.xml、search-index.json）
npm run preview   # 本機預覽 http://localhost:4321
```

選配：`npx lighthouse http://localhost:4321/<path>/ --form-factor=mobile --chrome-flags="--headless --no-sandbox"`，目標 Performance、SEO、Accessibility、Best Practices 皆 100。

## 5. 上線

1. 開分支、commit、開 PR → GitHub Actions CI（`.github/workflows/ci.yml`：astro check、vitest、build）必須全綠。PR 不會部署，要看頁面請在本機 `npm run preview`。
2. Merge（或 `git push` 到 `main`）→ CI 通過後用 `wrangler pages deploy` 部署 production 到 Cloudflare Pages 專案 `ai-founder-atlas`。不要手動跑 wrangler deploy。
3. sitemap（含 lastmod）、`llms.txt`、`rss.xml`、`search-index.json` 都在 build 時自動重建，不需手動改。
4. 選配：在 Google Search Console 用 URL Inspection 請求索引。

### Cloudflare Pages 設定（第一次）

- Build command：`npm run build`，Output directory：`dist`，Node 版本：20（環境變數 `NODE_VERSION=20`）。
- 環境變數：
  - `SITE_URL`：正式網址，例如 `https://<project>.pages.dev`（預設 `https://ai-founder-atlas.pages.dev`，影響 canonical、sitemap、robots、llms.txt、RSS）。
  - `PUBLIC_ADS_ENABLED`：維持 `false`，AdSense 核准前不可開啟；`false` 時 `AdSlot` 完全不輸出。開啟後每頁最多 4 個廣告位。
  - `PUBLIC_CF_BEACON_TOKEN`：Cloudflare Web Analytics token；有設定才會載入 beacon。

## 6. 維護

- 每 90 天依 GSC 查詢資料更新內容；只有實質修改才更新 `updated` 日期。
- 定期檢查所有 `sources` 連結是否仍為 200。
- 文章中的價格至少每月對照官方頁面查證一次，並更新 `lastVerified`。
- 舊網址不要重用、`public/_redirects` 的舊規則不要刪：計算機時期與提示詞時期的網址都已 301 導向（見 `SPEC.md` 第 6 節）。
