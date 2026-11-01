# 發布流程（Operator bot 用）

本文件說明 operator bot 如何新增一個計算機（calculator）或一篇文章（guide），以及內容如何上線。

## 0. 原則

- 網站內容一律 **English**；本文件為繁體中文。
- **不花錢**：不買網域、不用付費工具/API。
- **不捏造**：數字、公式、搜尋量都要有來源；查不到就寫「查不到」。作者一律為 `Editorial team`，不可捏造人物或資歷。
- 寧缺勿濫：每週 2–4 個高品質頁面，避免 scaled content abuse / doorway pages（不要做「10 cups to grams」「11 cups to grams」這種只換數字的頁面，用同一頁的表格）。

## 1. 新增計算機

```bash
npm run new:calculator -- --category cooking --slug butter-converter
```

`--category` 必須是：`cooking`、`home-diy`、`crafts`、`date-time`、`units`。腳本會產生：

| 檔案 | 用途 |
|---|---|
| `src/content/calculators/<slug>.mdx` | 頁面內容與 frontmatter（`status: draft`） |
| `src/calculators/<name>.ts` | 純函式計算邏輯 |
| `src/calculators/<name>.test.ts` | Vitest 測試 |
| `src/components/calculators/<Name>.astro` | 計算機 UI（vanilla TS island） |

接著：

1. **註冊元件**：在 `src/components/calculators/index.ts` 的 `WIDGETS` 加入 `<Name>`。
2. **實作邏輯**：寫在 `src/calculators/<name>.ts`，每個常數註明來源。
3. **測試**：至少 5 組已知答案（與權威來源對照），把 `it.todo` 換成真的測試。
4. **寫內容**（MDX 本文順序固定）：Worked example → How it works（公式、變數、假設與限制）→ Quick reference table。H1、direct answer、計算機、FAQ、Related、Sources、作者/更新日期、免責聲明由 `CalculatorLayout` 自動產生。
5. **Frontmatter 檢查**（Zod schema 在 `src/content.config.ts`，不符合會 **build fail**）：
   - `faqs` 3–6 題（建議 4–6），答案要能獨立閱讀。
   - `sources` 至少 2 個，每個 URL 都要先用 `curl -sL -o /dev/null -w '%{http_code}' <url>` 確認回傳 200。
   - `directAnswer` ≤ 70 字（目標 40–60 字），`metaDescription` 70–170 字元，`title` ≤ 70 字元且全站唯一。
   - `related` 填同類工具的 slug（只能填已上線的）。
6. **自我檢查**：helpful content 自評、無重複頁、internal links ≥ 3、sources ≥ 2。
7. 把 `status` 改成 `published`。`draft` 頁面在 production build 不會產生，dev 模式（`npm run dev`）可預覽。

新的 category hub 會自動列出新工具；units hub 有工具後會自動取代「coming soon」文字。

## 2. 新增文章（guide）

```bash
npm run new:guide -- --slug how-to-measure-flour --category cooking
```

產生 `src/content/guides/<slug>.mdx`，填完 TODO、至少 1 個來源，`status: published` 後會出現在 `/guides/<slug>/` 及所屬 category hub。記得從相關計算機頁面連過去。

## 3. 本機驗證

```bash
npm ci
npm test          # Vitest
npx astro check   # 型別檢查
npm run build     # 產生 dist/（含 sitemap、robots.txt、llms.txt）
npm run preview   # 本機預覽 http://localhost:4321
```

選配：`npx lighthouse http://localhost:4321/<path>/ --form-factor=mobile --chrome-flags="--headless --no-sandbox"`，目標 Performance ≥ 90、SEO = 100、Accessibility ≥ 95。

## 4. 上線

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

## 5. 維護

- 每 90 天依 GSC 查詢資料更新內容；只有實質修改才更新 `updated` 日期。
- 定期檢查所有 `sources` 連結是否仍為 200。
