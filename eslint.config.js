import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'trafficbot', 'cc-nim', 'my-notion-worker', 'server', 'ssh_server', 'traffic-generator-python', 'trffic', 'v-bot', 'aws', 'Attached_assets', '.cache', '.config', '.claude', '.local', '.config_backup', '.gemini_backup', '.pythonlibs', '.canvas', '.antigravitycli', '.seo-backup-*', 'node_modules', 'cuong-thong-gio', 'backend_extracted', 'extracted_images', '~'] },
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
)
