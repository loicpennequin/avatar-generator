import OpenProps from 'open-props';
import fs from 'fs';
import { join } from 'path';

const layersDir = join(process.cwd(), 'src/layers');
const layers = fs
  .readdirSync(layersDir)
  .filter((fileOrDir) => {
    const isDirectory = fs.lstatSync(join(layersDir, fileOrDir)).isDirectory();
    const hasNuxtConfig = fs.existsSync(
      join(layersDir, fileOrDir, 'nuxt.config.ts')
    );

    return isDirectory && hasNuxtConfig;
  })
  .map((dir) => `./src/layers/${dir}`);

export default defineNuxtConfig({
  extends: layers,

  srcDir: 'src',

  runtimeConfig: {
    authSecret: '',
    discordClientId: '',
    discordClientSecret: '',
    githubClientId: '',
    githubClientSecret: '',
    googleClientId: '',
    googleClientSecret: '',
    openaiKey: '',
    awsAccessKey: '',
    awsSecretAccessKey: '',
    awsS3Bucket: ''
  },

  experimental: {
    inlineSSRStyles: false
  },

  build: {
    transpile: ['trpc-nuxt']
  },

  typescript: {
    typeCheck: 'build'
  },

  css: [
    'open-props/postcss/normalize',
    '~/styles/theme.css',
    '~/styles/global.css'
  ],

  modules: [
    '@vue-macros/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxtjs/device',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    'nuxt-typed-router',
    '@nuxt/image-edge',
    '@sidebase/nuxt-auth'
    // '@nuxt/devtools'
  ],

  postcss: {
    plugins: {
      './scripts/postcss-jit-fix.js': OpenProps,
      'postcss-custom-media': {
        preserve: false
      },
      'postcss-nesting': { noIsPseudoSelector: false }
    }
  },

  i18n: {
    locales: [
      {
        code: 'en',
        icon: 'circle-flags:uk',
        file: 'en.json',
        label: 'English'
      },
      {
        code: 'fr',
        icon: 'circle-flags:fr',
        file: 'fr.json',
        label: 'Français'
      }
    ],
    lazy: {
      skipNuxtState: true
    },
    langDir: 'locales/',
    defaultLocale: 'en',
    strategy: 'prefix',
    vueI18n: {
      legacy: false
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: ''
  },

  auth: {
    basePath: '/api/auth',
    enableSessionRefreshOnWindowFocus: true
  },

  macros: {
    betterDefine: true
  }
});
