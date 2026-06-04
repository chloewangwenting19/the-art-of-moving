import {defineField, defineType} from 'sanity'

export const journalNote = defineType({
  name: 'journalNote',
  title: 'Journal Note',
  type: 'document',
  fields: [
    defineField({name: 'category', title: 'Category', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'excerpt', title: 'Short Excerpt', type: 'text', rows: 3}),
    defineField({name: 'fullText', title: 'Full Text', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'date', title: 'Date', type: 'date'}),
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
    select: {title: 'title', subtitle: 'category'}
  }
})
