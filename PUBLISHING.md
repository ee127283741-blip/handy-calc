# 發布流程（Operator bot 用）

本文件說明 operator bot 如何新增一個計算機（calculator）或一篇文章（guide）、如何更新 AI 價格資料，以及內容如何上線。

網站定位：給小型企業與上班族的實用 AI 指南與計算機。

## 0. 原則

- 網站內容一律 **English**；本文件為繁體中文。
- **不花錢**：不買網域、不用付費工具/API。
- **不捏造**：數字、公式、搜尋量都要有來源；查不到就寫「查不到」。作者一律為 `Editorial team`，不可捏造人物或資歷。
- 寧缺勿濫：每週 2–4 個高品質頁面，避免 scaled content abuse / doorway pages（不要做「GPT-6 cost for 1,000 tokens」「…for 2,000 tokens」這種只換數字的頁面，用同一頁的計算機與表格）。

## 1. 新增計算機

```bash
npm run new:calculator -- --category ai-costs --slug embedding-cost-calculator
```

`--category` 必須是：`ai-costs`、`ai-business`、`ai-productivity`、`prompts`。腳本會產生：

| 檔案 | 用途 |
|---|---|
| `src/content/calculators/<slug>.mdx` | 頁面內容與 frontmatter（`status: draft`） |
| `src/calculators/<name>.ts` | 純函式計算邏輯 |
| `src/calculators/<name>.test.ts` | Vitest 測試 |
| `src/components/calculators/<Name>.astro` | 計算機 UI（vanilla TS island） |

接著：

1. **註冊元件**：在 `src/components/calculators/index.ts` 的 `WIDGETS` 加入 `<Name>`。
2. **實作邏輯**：寫在 `src/calculators/<name>.ts`，每個常數註明來源。**價格不可寫在這裡**，一律從 `src/data/ai-pricing.ts` 匯入（見第 3 節）。
3. **測試**：至少 5 組已知答案（與權威來源對照），把 `it.todo` 換成真的測試。
4. **寫內容**（MDX 本文順序固定）：Worked example → How it works（公式、變數、假設與限制）→ Quick reference table。H1、direct answer、計算機、FAQ、Related、Sources、作者/更新日期、免責聲明由 `CalculatorLayout` 自動產生。
5. **Frontmatter 檢查**（Zod schema 在 `src/content.config.ts`，不符合會 **build fail**）：
   - `faqs` 3–6 題（建議 4–6），答案要能獨立閱讀。
   - `sources` 至少 2 個（價格類一律用官方定價頁），每個 URL 都要先用 `curl -sL -o /dev/null -w '%{http_code}' <url>` 確認回傳 200。
   - `directAnswer` ≤ 70 字（目標 40–60 字），`metaDescription` 70–170 字元，`title` ≤ 70 字元且全站唯一。
   - `related` 填同類工具的 slug（只能填已上線的）。
6. **自我檢查**：helpful content 自評、無重複頁、internal links ≥ 3、sources ≥ 2。
7. 把 `status` 改成 `published`。`draft` 頁面在 production build 不會產生，dev 模式（`npm run dev`）可預覽。

category hub 會自動列出新工具；沒有工具的 category 會顯示「coming soon」，有工具後自動取代。

## 2. 新增文章（guide）

```bash
npm run new:guide -- --slug how-to-write-a-system-prompt --category ai-productivity --tool llm-api-cost-calculator
```

產生 `src/content/guides/<slug>.mdx`，填完 TODO、至少 1 個來源，`status: published` 後會出現在 `/guides/<slug>/` 及所屬 category hub。記得從相關計算機頁面連過去。

- `tool`：相關計算機 slug（必須已上線），頁面會自動顯示連結。
- `faqs`：選填；有填就顯示 FAQ 並輸出 FAQPage JSON-LD。
- `lastVerified`：文中事實（價格等）最後查證日期，會顯示在頁面上。
- 廣告開啟時，`src/remark-ad-after-p2.mjs` 會在第 2 個段落後插入廣告位，所以開頭至少寫 2 個完整段落（不要用清單或標題開頭）。

## 2.1 文章研究流程

每篇文章動筆前都必須完成：

1. **搜尋目標關鍵字**：用網路搜尋查目標關鍵字（必要時加上同義詞，例如舊產品名）。
2. **閱讀排名前 5–10 名的頁面**：記下它們涵蓋的重點、資料日期、方案名稱與價格是否過時、有沒有實際計算。
3. **在 `content-briefs/<slug>.md` 寫 brief（English）**：目標關鍵字、搜尋意圖、讀過的 URL、競品共同重點、缺口／弱點、我們的大綱，最後一行寫 `Gap summary:`。
4. **撰寫原創內容**：涵蓋共同重點並補足缺口；必須有真實計算（列出算式）、官方來源連結，以及醒目的工具連結（frontmatter `tool` + 內文連結）。
5. **絕不改寫或轉述競品文字**，也不引用競品的價格或數據。
6. **價格一律以 `src/data/ai-pricing.ts` 為準**，並連到其中的官方 `sourceUrl`；若官方頁面與資料檔不符，先依第 3 節更新資料檔。

## 3. AI 價格資料更新流程

所有價格**只**存在 `src/data/ai-pricing.ts`（`API_MODELS`：每 1M tokens 的 USD 價格；`PLANS`：訂閱方案月費 USD）。計算機與頁面都從這裡讀取，不可在其他檔案寫死價格數字（MDX 的 worked example 例外，改價後要一併重算）。

1. 打開檔案中每個條目的 `sourceUrl`（官方定價頁），逐一比對 `inputPerM`、`outputPerM`、`cachedInputPerM`、`longPrompt`、`monthlyUSD`。
2. 價格有變：更新數字，並把 `lastVerified` 改成今天（`YYYY-MM-DD`）。價格沒變也要更新 `lastVerified`，代表今天確認過。
3. 官方公告未來調價：在 `schedule` 加 `{ from: 'YYYY-MM-DD', inputPerM, outputPerM }`（從該日起生效），計算機會依當天日期自動套用並顯示即將調價。生效日過後，可把新價格移到 `inputPerM`/`outputPerM` 並刪掉該 schedule 條目。
4. 官方頁面查不到、無法確認為 USD 數字的條目：**直接刪除**，不可保留舊值或用第三方網站的數字。刪除前用 `grep -rn '<id>' src` 確認沒有預設選項或測試還在引用。
5. 若改價影響計算機 MDX 的 `directAnswer`、worked example、表格或 FAQ 中的數字，依程式重新計算後更新，並更新該頁 `updated`。
6. 驗證：

   ```bash
   npm test          # 測試中寫死的期望值若因改價失敗，確認新數字正確後更新測試
   npx astro check
   npm run build
   ```

7. 全部通過後 commit 並 push 到 `main`，GitHub Actions CI 通過後自動部署。

## 4. 本機驗證

```bash
npm ci
npm test          # Vitest
npx astro check   # 型別檢查
npm run build     # 產生 dist/（含 sitemap、robots.txt、llms.txt）
npm run preview   # 本機預覽 http://localhost:4321
```

選配：`npx lighthouse http://localhost:4321/<path>/ --form-factor=mobile --chrome-flags="--headless --no-sandbox"`，目標 Performance ≥ 90、SEO = 100、Accessibility ≥ 95。

## 5. 上線

1. 開分支、commit、開 PR → GitHub Actions CI（`.github/workflows/ci.yml`：astro check、vitest、build）必須全綠。
2. Cloudflare Pages 會為 PR 建立 preview 網址，檢查頁面。
3. Merge（或 `git push` 到 `main`）→ Cloudflare Pages 自動部署 production 到 `*.pages.dev`。
4. 部署後 sitemap 與 `llms.txt` 會在 build 時自動重建，不需手動改。
5. 選配：在 Google Search Console 用 URL Inspection 請求索引。

### Cloudflare Pages 設定（第一次）

- Build command：`npm run build`，Output directory：`dist`，Node 版本：20（環境變數 `NODE_VERSION=20`）。
- 環境變數：
  - `SITE_URL`：正式網址，例如 `https://<project>.pages.dev`（預設 `https://PLACEHOLDER.pages.dev`，影響 canonical、sitemap、robots、llms.txt）。
  - `PUBLIC_ADS_ENABLED`：維持 `false`，AdSense 核准前不可開啟；`false` 時 `AdSlot` 完全不輸出。
  - `PUBLIC_CF_BEACON_TOKEN`：Cloudflare Web Analytics token；有設定才會載入 beacon。

## 6. 維護

- 每 90 天依 GSC 查詢資料更新內容；只有實質修改才更新 `updated` 日期。
- 定期檢查所有 `sources` 連結是否仍為 200。
- AI 價格至少每月依第 3 節查證一次。
- 舊的料理／DIY／手作／日期頁面已移除，`public/_redirects` 以 301 導回首頁；不要重用那些網址。
