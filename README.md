# SAC Executive KPI Card — Cloudflare Pages starter

This starter contains a simple configurable SAP Analytics Cloud custom widget and a browser preview.

## Files
- `executive-kpi.json` — SAC custom widget manifest. Upload this JSON to SAC after changing its JavaScript URL.
- `executive-kpi.js` — Web Component loaded by SAC.
- `index.html` — optional browser preview.
- `README.md` — this guide.

## A. Deploy the JavaScript to Cloudflare Pages (free static hosting)
1. Sign in to Cloudflare and open **Workers & Pages**.
2. Choose **Create application** → **Pages** → **Upload assets** (the exact labels may vary).
3. Create a project, for example `sac-executive-kpi`.
4. Upload the files in this folder. Keep `executive-kpi.js` at the project root. `index.html` is only a preview page.
5. Deploy. Cloudflare gives you a URL similar to `https://sac-executive-kpi.pages.dev`.
6. Verify that this URL opens in a browser:
   `https://YOUR-PROJECT.pages.dev/executive-kpi.js`
   It should show JavaScript source, not a 404 page.

## B. Point the SAC manifest to your deployed JavaScript
1. Open `executive-kpi.json` in a text editor.
2. Replace `https://YOUR-PROJECT.pages.dev/executive-kpi.js` with your exact deployed JavaScript URL.
3. Save the JSON.

## C. Upload the widget to SAC
1. Your SAC role must include **Create** permission for **Custom Widget**.
2. In the SAC start page, open **Stories** or **Analytic Applications** → **Custom Widgets**.
3. Choose **Create (+)** and upload the edited `executive-kpi.json`.
4. Open an **Optimized Story** in edit mode.
5. Add the widget from the Custom Widgets section.

## D. Configure / script values
The manifest exposes properties for title, actual, budget, achievement, growth, period, status and colors.
The widget also exposes script methods. Example SAC script (after adding the widget and using its generated instance name):

```javascript
ExecutiveKPI_1.setTitle("Net Profit");
ExecutiveKPI_1.setKpiData("AED 45.2M", "AED 42.0M", "107.6%", "+8.4%");
ExecutiveKPI_1.setAccentColor("#159B67");
```

The generated instance name may differ; use the actual name shown in your SAC story's Outline panel.

## Important scope
- This is a starter visual component with configurable display properties and script methods.
- The sample values are not yet connected to an SAC model through data binding. The script method lets you set values from SAC scripting; a separate data-binding implementation is needed to consume model result sets directly.
- Hosting the JavaScript is required by the SAC custom-widget architecture. The manifest JSON is uploaded to SAC; the JavaScript is fetched by the user's browser from the HTTPS URL.
- For production, use an organization-approved host, configure integrity hashes, and review your tenant's allowed domains / security policies.
- Test in the target SAC tenant and browser. This sample is not SAP-certified.
