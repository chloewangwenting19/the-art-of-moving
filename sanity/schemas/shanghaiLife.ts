import {defineField, defineType} from 'sanity'

export const shanghaiLife = defineType({
  name: 'shanghaiLife',
  title: 'Shanghai Life',
  type: 'document',
  fields: [
    defineField({name: 'kicker', title: 'Section Label', type: 'string', initialValue: 'Life in Shanghai'}),
    defineField({name: 'title', title: 'Section Title', type: 'string'}),
    defineField({name: 'description', title: 'Section Description', type: 'text', rows: 3}),
    defineField({
      name: 'featureImage',
      title: 'Main Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', title: 'Alt text', type: 'string'},
        {name: 'caption', title: 'Caption', type: 'string'}
      ]
    }),
    defineField({
      name: 'notes',
      title: 'Daily Life Notes',
      description: 'Coffee, citywalk, work, reading, culture, or daily routines.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'text', title: 'Text', type: 'text', rows: 3},
            {name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 10}
          ],
          preview: {
            select: {title: 'title', subtitle: 'label'}
          }
        }
      ]
    }),
    defineField({
      name: 'dailyPhotos',
      title: 'Daily Life Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', title: 'Alt text', type: 'string'},
            {name: 'caption', title: 'Caption', type: 'string'},
            {name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 10}
          ]
        }
      ]
    })
  ],
  preview: {
    prepare: () => ({title: 'Shanghai Life'})
  }
})
