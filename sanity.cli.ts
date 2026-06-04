import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'chloe-art-of-moving',
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'YOUR_SANITY_PROJECT_ID',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production'
  }
})
