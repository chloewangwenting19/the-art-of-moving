import {defineField, defineType} from 'sanity'

export const artInspiration = defineType({
  name: 'artInspiration',
  title: 'Art and Inspiration',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Artwork or Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt text', type: 'string'}],
      validation: (Rule) => Rule.required()
    }),
    defineField({name: 'artist', title: 'Artist', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'shortNote', title: 'Short Note', type: 'text', rows: 3}),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: ['Museum', 'Painting', 'Photography', 'Architecture', 'Book', 'Design', 'Culture']}
    }),
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
    select: {title: 'title', subtitle: 'artist', media: 'image'},
    prepare: ({title, subtitle, media}) => ({title: title || 'Inspiration', subtitle, media})
  }
})
