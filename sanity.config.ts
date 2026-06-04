import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'YOUR_SANITY_PROJECT_ID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'the-art-of-moving',
  title: 'The Art of Moving CMS',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website Content')
          .items([
            S.listItem()
              .title('Home Page')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('About Me')
              .child(S.document().schemaType('aboutMe').documentId('aboutMe')),
            S.listItem()
              .title('Shanghai Life')
              .child(S.document().schemaType('shanghaiLife').documentId('shanghaiLife')),
            S.listItem()
              .title('Motherhood')
              .child(S.document().schemaType('motherhoodSettings').documentId('motherhoodSettings')),
            S.listItem()
              .title('Contact and Social Links')
              .child(S.document().schemaType('contactSettings').documentId('contactSettings')),
            S.divider(),
            ...S.documentTypeListItems().filter((item) =>
              !['siteSettings', 'aboutMe', 'shanghaiLife', 'motherhoodSettings', 'contactSettings'].includes(item.getId() || '')
            )
          ])
    }),
    visionTool()
  ],
  schema: {
    types: schemaTypes
  }
})
