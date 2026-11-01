# Niche Calculator & Converter Site — 實作規格書 (v1.0, 2026-11-01)

> 交付對象：工程師 bot。語言：繁中說明 + English technical terms。網站內容：**English only**，目標市場 US / UK / CA / AU。
> 製作規範（老闆指示）：**每次製作一律使用 `claude` CLI（低 effort 設定）**；遇到不懂的 SEO/AEO/GEO/關鍵字知識，先查資料或 GitHub 開源工具再做，不要憑空猜。

---

## 0. 硬性限制 (Constraints)
1. **不花錢**：不買網域、不買付費工具/API、不開付費方案。要買網域必須先問使用者。
2. 先用免費 hosting：**Cloudflare Pages** `*.pages.dev` 子網域（備案：GitHub Pages）。
3. **Static-first**：全部頁面 build 時預先產生 (SSG)，計算邏輯在 client-side 小型 JS island 執行，無後端、無資料庫。
4. AdSense 在核准前**完全停用**（只保留版位 placeholder，不載入任何 ad script）。
5. 搜尋量數據：**沒有來源就寫「查不到」**，禁止捏造數字。

---

## 1. Tech Stack（已驗證 repo 存在，2026-11-01 HTTP 200）
| 用途 | 工具 | URL |
|---|---|---|
| SSG framework | Astro（content collections + islands） | https://github.com/withastro/astro |
| Cloudflare 部署 | Astro adapters / 直接 static output 上 Pages | https://github.com/withastro/adapters ・ https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/ |
| Meta tags | astro-seo | https://github.com/jonasmerlin/astro-seo |
| Sitemap | @astrojs/sitemap（官方 integration） | https://docs.astro.build/en/guides/integrations-guide/sitemap/ |
| JSON-LD 型別 | schema-dts (Google, TypeScript types for schema.org) | https://github.com/google/schema-dts |
| 數學運算/單位 | mathjs（含 units、精確 fraction/bignumber） | https://github.com/josdejong/mathjs |
| 單位換算 | convert-units | https://github.com/convert-units/convert-units |
| 日期計算 | date-fns（或 dayjs） | https://github.com/date-fns/date-fns ・ https://github.com/iamkun/dayjs |
| llms.txt 規範 | llms-txt proposal | https://github.com/AnswerDotAI/llms-txt ・ https://llmstxt.org/ |
| CI 效能/SEO 稽核 | Lighthouse CI | https://github.com/GoogleChrome/lighthouse-ci |
| 全站稽核 | Unlighthouse | https://github.com/harlan-zw/unlighthouse |
| Schema 驗證 | Rich Results Test / Schema Markup Validator | https://search.google.com/test/rich-results ・ https://validator.schema.org/ |

建議 TypeScript + 純 CSS（或 Tailwind）。計算 island 用 vanilla TS 或 Preact，JS bundle 每頁 < 30 KB gzip。

---

## 2. 研究摘要與依據 (Best Practices, cited)

### 2.1 Technical SEO
- **Core Web Vitals** 目標（p75）：LCP ≤ 2.5s、INP ≤ 200ms、CLS ≤ 0.1。https://web.dev/articles/vitals ・ https://developers.google.com/search/docs/appearance/core-web-vitals
- **Sitemap**：自動產生 `sitemap-index.xml`，`lastmod` 只在內容真的變更時更新。https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- **robots.txt**：允許全站，宣告 sitemap；不封鎖 CSS/JS。https://developers.google.com/search/docs/crawling-indexing/robots/intro
- **Canonical**：每頁 self-referencing absolute canonical；統一 trailing slash、https、無 query string。https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- **Structured data**（JSON-LD）：https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
  - `WebApplication`（SoftwareApplication 子型別）：每個 calculator 頁。注意 Google 的 Software App rich result 需要 rating/offers，**不可偽造評分**；無評分時仍可標記但不期待 rich result。https://developers.google.com/search/docs/appearance/structured-data/software-app
  - `BreadcrumbList`：所有內頁。https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
  - `FAQPage`：**自 2023-08 起 FAQ rich result 僅限知名政府/健康網站顯示**；仍可標記（幫助機器理解/AEO），但不期待 SERP 展開。https://developers.google.com/search/blog/2023/08/howto-faq-changes
  - `HowTo`：**Google 已停用 HowTo rich result**（同上連結）。可省略，或僅保留在語意 HTML（ordered list）。
  - `Organization` + `WebSite`（首頁）、`Person`（作者頁）、`Article`（文章）。
- **Mobile-first / HTTPS / 語意 HTML**：Cloudflare Pages 預設 HTTPS。

### 2.2 On-page SEO
- Title：`{Primary Keyword} – Free {X} Calculator | {SiteName}`，≤ 60 字元左右；唯一。https://developers.google.com/search/docs/appearance/title-link
- Meta description：唯一、描述頁面能做什麼，~150 字元。https://developers.google.com/search/docs/appearance/snippet
- 一頁一個 H1，H2 依 template 固定結構。
- Internal linking：descriptive anchor text；每個 calculator 連到同類 3–5 個 related tools + 所屬 category hub + 相關文章。https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- URL：短、小寫、hyphen：`/cooking/cups-to-grams/`。https://developers.google.com/search/docs/crawling-indexing/url-structure

### 2.3 AEO (Answer Engine Optimization)
- H1 下方第一段放 **40–60 字 direct answer**（例："1 cup of all-purpose flour weighs about 120–125 grams."）。
- 問句式 H2（"How many grams are in a cup of flour?"）+ 簡潔答案 + 表格 (conversion table) — 表格與清單是 featured snippet 常見格式。https://developers.google.com/search/docs/appearance/featured-snippets
- 每頁 FAQ 區塊 4–6 題，答案自足（不依賴上下文）。

### 2.4 GEO (Generative Engine Optimization: ChatGPT / Perplexity / Google AI Overviews)
- Google 對 AI features 的官方說法：沒有特別的額外要求，照一般 SEO best practice、可被索引、提供獨特有用內容。https://developers.google.com/search/docs/appearance/ai-features
- 研究依據：GEO 論文（Aggarwal et al., 2023）指出加入 **引用來源、統計數字、引述** 可提升在生成式引擎中的可見度。https://arxiv.org/abs/2311.09735
- 實作：
  - `/llms.txt`（Markdown 索引：網站簡介 + 各 category 與 calculator 連結 + 一句說明），選配 `/llms-full.txt`。https://llmstxt.org/ （注意：尚非正式標準，主要 LLM 是否採用未確定，成本低所以做。）
  - 清楚可引用的 facts：公式、數值、單位、資料來源（USDA、NIST、King Arthur 等）用明確句子寫出。
  - robots.txt **允許** OAI-SearchBot / ChatGPT-User / PerplexityBot / Google-Extended（決策：允許，以利被引用；使用者可改）。https://platform.openai.com/docs/bots ・ https://docs.perplexity.ai/guides/bots
  - 每頁顯示 "Last updated" 與作者。
- **E-E-A-T**：About、Author page（真實背景說明，**不可捏造人物/資歷**；可用「Editorial team」並誠實揭露 AI 輔助製作）、Editorial policy、Sources。https://developers.google.com/search/docs/fundamentals/creating-helpful-content

### 2.5 Google Spam Policies / Helpful Content（必須遵守）
- Spam policies：https://developers.google.com/search/docs/essentials/spam-policies
  - 禁止 **scaled content abuse**（大量產生低價值頁面，不論是否 AI）→ 每頁必須有真正可用的工具 + 獨特 worked example + 驗證過的資料。
  - 禁止 doorway pages（例：只換數字的 "10 cups to grams"、"11 cups to grams" 千頁）→ 數值變體頁只在有獨立搜尋需求且有獨特內容時才做，否則用同一頁的表格。
  - 禁止 keyword stuffing、hidden text、site reputation abuse。
- AI 內容指引：AI 生成可接受，但必須是有用、原創、經過人工/事實檢查。https://developers.google.com/search/blog/2023/02/google-search-and-ai-content
- Helpful content 自評問題清單（Who/How/Why）納入 Editorial policy。

---

## 3. Site Structure

```
/                         Home (search box + category hubs + popular tools)
/cooking/                 Cooking & Baking Conversion hub
/home-diy/                Home & DIY hub
/crafts/                  Crafts (Crochet / Knitting / Sewing) hub
/date-time/               Date & Time hub
/units/                   Unit Conversion hub
/{category}/{tool-slug}/  Calculator pages
/guides/{slug}/           Supporting articles (how-to, explainers)
/about/  /contact/  /privacy-policy/  /terms/  /editorial-policy/  /authors/{slug}/
/sitemap-index.xml  /robots.txt  /llms.txt  /404
```
Category hub：H1 + 簡介 + 工具卡片列表 + 相關 guides + BreadcrumbList + CollectionPage schema。

---

## 4. First 15 Calculators（keyword ideas；search volume：**查不到**，未使用付費工具。上線後以 GSC impressions 驗證；可用免費 Google Trends / Keyword Planner 估範圍）

| # | Category | Tool / slug | Target keyword ideas | 備註 |
|---|---|---|---|---|
| 1 | Cooking | Cups to Grams (by ingredient) `/cooking/cups-to-grams/` | cups to grams, flour cups to grams, sugar cups to grams | ingredient density 表，來源 USDA / King Arthur weight chart |
| 2 | Cooking | Oven Temperature Converter `/cooking/oven-temperature-converter/` | fahrenheit to celsius oven, gas mark to celsius | 含 Gas Mark（UK） |
| 3 | Cooking | Recipe Scaler `/cooking/recipe-scaler/` | recipe scaler, scale recipe servings | 輸入份數倍率 |
| 4 | Cooking | Butter Converter `/cooking/butter-converter/` | sticks of butter to grams, tablespoons of butter to grams | US stick vs metric |
| 5 | Cooking | Baking Pan Size Converter `/cooking/cake-pan-size-converter/` | cake pan size conversion, 9x13 to round pan | 面積比 |
| 6 | Home & DIY | Paint Calculator `/home-diy/paint-calculator/` | how much paint do I need, paint calculator | 坪/m²、sq ft，扣門窗 |
| 7 | Home & DIY | Concrete Calculator `/home-diy/concrete-calculator/` | concrete calculator, bags of concrete | cubic yards / m³ / 60–80 lb bags |
| 8 | Home & DIY | Tile / Flooring Calculator `/home-diy/tile-calculator/` | tile calculator, flooring square feet | waste % |
| 9 | Home & DIY | Mulch Calculator `/home-diy/mulch-calculator/` | mulch calculator, how much mulch | cubic yards |
| 10 | Crafts | Crochet/Knitting Yarn Estimator `/crafts/yarn-calculator/` | how much yarn for a blanket, yarn calculator | yarn weight (CYC standards) |
| 11 | Crafts | Knitting Gauge Calculator `/crafts/knitting-gauge-calculator/` | knitting gauge calculator, stitches per inch | |
| 12 | Crafts | Crochet Hook & Knitting Needle Size Converter `/crafts/hook-needle-size-converter/` | crochet hook size chart, US to UK needle size | US/UK/metric 對照 |
| 13 | Date & Time | Days Between Dates `/date-time/days-between-dates/` | days between dates, how many days until | business days 選項 |
| 14 | Date & Time | Age Calculator `/date-time/age-calculator/` | age calculator, how old am I | years/months/days |
| 15 | Units | Cooking-friendly Length & Weight converter hub: Inches↔cm, lbs↔kg `/units/length-converter/` `/units/weight-converter/` | inches to cm, lbs to kg, stone to kg | stone 為 UK 需求 |

上線順序：先 #1,2,6,10,13（覆蓋 5 categories），再其餘。每個工具需單元測試 (Vitest) 驗證已知值。

---

## 5. Calculator Page Template（順序固定）
1. Breadcrumb
2. **H1**：`{Tool name}`（含主關鍵字）
3. **Direct answer / intro**（40–60 字，AEO）
4. **Calculator widget（above the fold，mobile 也要）**：label 清楚、`inputmode="decimal"`、即時計算、US/Metric toggle（依 locale 預設：US→imperial，UK/AU/CA→metric 可切）、Copy result、Reset。無 JS 時顯示公式與表格（progressive enhancement）。
5. *(Ad slot A — disabled)*
6. **Worked example**：一個真實情境的逐步計算。
7. **Formula / How it works**：公式（`<code>` 或 MathML）、變數說明、假設與限制。
8. **Quick reference table**（常用值；featured-snippet friendly）
9. *(Ad slot B — disabled)*
10. **FAQ**（4–6 題，問句 H3，FAQPage JSON-LD）
11. **Related calculators**（3–5）+ related guides
12. **Sources**（外部權威連結，標題 + 機構）
13. **Author / Reviewed by** + "Last updated: YYYY-MM-DD" + Editorial policy 連結
14. Disclaimer（例：estimates only）

JSON-LD：`WebApplication`（name, url, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", offers price 0, isAccessibleForFree）+ `BreadcrumbList` + `FAQPage`（+ `Person` author reference）。

Content frontmatter（`src/content/calculators/*.mdx`）：
```yaml
title, slug, category, h1, metaDescription, directAnswer, primaryKeyword, secondaryKeywords[],
calculator: <componentName>, faqs: [{q,a}], sources: [{title,url,publisher}],
related: [slug], author, reviewedBy?, published, updated, status: draft|published
```
Build 時 schema 驗證（Zod）：缺 sources / faqs < 3 / directAnswer 超長 → build fail。

---

## 6. Ad Slots（規劃但停用）
- 元件 `<AdSlot id="A|B|sidebar" />`：由 `PUBLIC_ADS_ENABLED=false` 控制；false 時**不輸出任何 ad script / 不輸出空白框**（避免 CLS 與空版位）。啟用時預留固定 min-height 防 CLS。
- 位置：A＝計算結果之後（不可緊貼按鈕/輸入框以免誤點）、B＝FAQ 前、desktop sidebar 一格。Above-the-fold 不放廣告擠壓工具。
- 政策遵守：AdSense Program policies（https://support.google.com/adsense/answer/48182）、不誘導點擊、廣告與內容可區分（標 "Advertisement"）、ads.txt 於核准後加入。
- 歐英用戶 (UK) 需 Google-certified CMP / Consent Mode v2：https://support.google.com/adsense/answer/13554116 （啟用 ads 時才做）。
- 申請前條件：≥ 20–30 頁有實質內容、所有必要頁面、無 broken link（經驗值，非官方門檻）。

---

## 7. Required Pages
- **About**：網站目的、誰在維護、方法論、AI 輔助揭露（誠實）。
- **Contact**：email（使用者提供或站方信箱；不放假地址）、表單可用免費方案或 mailto。
- **Privacy Policy**：涵蓋 analytics、cookies、未來 AdSense/第三方廣告 cookie、GDPR/UK GDPR、CCPA 權利說明。
- **Terms of Use**：結果僅供參考、無保證。
- **Editorial Policy**：資料來源標準、事實檢查流程、更新頻率、更正管道、AI 使用政策。
- **Author pages**：真實資訊；不捏造證照。
- 404 頁（含搜尋與熱門工具）。

---

## 8. Analytics
- **Google Search Console**（免費）：Domain/URL-prefix property，`*.pages.dev` 用 HTML meta tag 驗證；提交 sitemap。https://search.google.com/search-console
- **Bing Webmaster Tools**（可從 GSC 匯入；也餵 ChatGPT search/Copilot）。https://www.bing.com/webmasters
- Web analytics 首選 **Cloudflare Web Analytics**（免費、cookieless、不需 consent banner）。https://developers.cloudflare.com/web-analytics/
- GA4 為選配；若加，需 consent banner（UK/EU）。
- 事件：`calc_used`（tool slug）、`copy_result`。

---

## 9. CI / QA
- GitHub repo → Cloudflare Pages 自動部署（main = production，PR = preview）。
- GitHub Actions：`astro check`、Vitest（計算正確性）、Lighthouse CI（預算：Performance ≥ 90、SEO = 100、Accessibility ≥ 95、CLS ≤ 0.1）、link checker（例：lychee https://github.com/lycheeverse/lychee ）、JSON-LD 驗證。
- 每月跑 Unlighthouse 全站掃描。

---

## 10. Publishing Workflow（operator bot 新增工具/文章）
1. **Research**：選 keyword → 查 SERP 意圖、現有競品缺口、權威來源（不知道就查；不要編造搜尋量）。
2. **Scaffold**：`npm run new:calculator -- --category cooking --slug cups-to-grams`（腳本產生 MDX frontmatter 範本 + `src/calculators/<Name>.ts` + test 檔）。文章：`npm run new:guide`。
3. **Implement**：純函式計算邏輯 + 單元測試（至少 5 組已知答案，與權威來源對照）。
4. **Write content**（用 `claude` CLI 低 effort 產生草稿）→ 事實檢查每個數字與來源 → 補 worked example、FAQ。
5. **Self-review checklist**：helpful content 自評、無 doorway/重複頁、title/description 唯一、internal links ≥ 3、sources ≥ 2。
6. 開 PR → CI 全綠 → preview 檢查 → merge → 自動部署。
7. 部署後：sitemap 自動更新、`llms.txt` 由 build script 自動重建、GSC URL Inspection 請求索引（選配）。
8. 每 90 天：依 GSC query 資料更新內容、`updated` 日期（僅實質修改才更新）。
節奏建議：每週 2–4 個高品質頁面，寧缺勿濫（避免 scaled content abuse）。

---

## 11. Repo Layout
```
src/
  calculators/        # pure TS logic + *.test.ts
  components/         # CalculatorShell, AdSlot, FAQ, Sources, Breadcrumbs, JsonLd
  content/calculators/*.mdx  content/guides/*.mdx  content/authors/*.md
  layouts/            # BaseLayout, CalculatorLayout, ArticleLayout
  pages/              # [category]/index.astro, [category]/[slug].astro, legal pages
scripts/              # new-calculator.ts, build-llms-txt.ts
public/robots.txt
lighthouserc.json  .github/workflows/ci.yml
```

## 12. Acceptance Criteria (v1 launch)
- 15 calculators + 5 hubs + 6 required pages 上線於 `*.pages.dev`。
- 所有頁 Lighthouse SEO 100、Perf ≥ 90 (mobile)；Rich Results Test 無錯誤。
- sitemap、robots、canonical、llms.txt 正確；GSC 已提交。
- Ads 完全關閉；無付費支出；網域購買事項已向使用者詢問。
