import {defineField, defineType} from 'sanity'

export const motherhoodSettings = defineType({
  name: 'motherhoodSettings',
  title: 'Motherhood',
  type: 'document',
  fields: [
    defineField({name: 'kicker', title: 'Section Label', type: 'string', initialValue: 'Motherhood Notes'}),
    defineField({name: 'title', title: 'Section Title', type: 'string'}),
    defineField({name: 'description', title: 'Main Text', type: 'text', rows: 4}),
    defineField({name: 'secondParagraph', title: 'Second Paragraph', type: 'text', rows: 4}),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', title: 'Alt text', type: 'string'},
        {name: 'caption', title: 'Caption', type: 'string'}
      ]
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      description: 'Examples: pregnancy diary, birth preparation, books, gentle routines.',
      type: 'array',
      of: [{type: 'string'}]
    })
  ],
  preview: {
    prepare: () => ({title: 'Motherhood'})
  }
})
