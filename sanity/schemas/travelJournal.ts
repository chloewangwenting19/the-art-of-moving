import {defineField, defineType} from 'sanity'

export const travelJournal = defineType({
  name: 'travelJournal',
  title: 'Travel Journal',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt text', type: 'string'}]
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', title: 'Alt text', type: 'string'},
            {name: 'caption', title: 'Caption', type: 'string'}
          ]
        }
      ]
    }),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'date', title: 'Date', type: 'date'}),
    defineField({name: 'shortDescription', title: 'Short Description', type: 'text', rows: 3}),
    defineField({name: 'fullText', title: 'Full Text', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 10})
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrderAsc',
      by: [{field: 'displayOrder', direction: 'asc'}]
    }
  ],
  preview: {
    select: {title: 'title', subtitle: 'location', media: 'coverImage'}
  }
})
