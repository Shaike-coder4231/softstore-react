import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ВАЖНО: base = '/имя-репозитория/'
// Если репозиторий 'softstore-react' → base: '/softstore-react/'
// Если деплой в username.github.io → base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/softstore-react/',
});