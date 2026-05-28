# Project Persistence Guidelines

## Critical Rules
1. **Preserve Uploaded Works State (`aria_custom_works`)**:
   - The user's uploaded images and custom gallery works *MUST* always be retrieved and saved in browser `localStorage` under the keys `aria_custom_works` and `aria_preset_edits`.
   - Never remove, clear, overwrite, or reset these states in code. Any component updates or features must seamlessly preserve existing localStorage data.
   - All newly uploaded files are automatically compressed/resized up to 1200px and overlaid with a beautiful, transparent bas-relief "芷澄 Aria Yang" watermark before saving.

2. **No Deletion of Uploaded Media / Preset Updates**:
   - Do not delete or overwrite code blocks that load or manage dynamic data from `localStorage`.
   - Maintain the `addWatermarkToImage` canvas function which guarantees watermark stamping and prevents localStorage storage limits from being exceeded.

3. **Homepage Heading Styling**:
   - The title styled as "芷澄-Aria Yang作品集" under the main display headers must maintain its font size (`text-[2.5rem]` / 2.5em scale) and letter spacing as configured in `src/App.tsx`.
