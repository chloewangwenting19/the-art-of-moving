import {defineField, defineType} from 'sanity'

export const photoWallItem = defineType({
  name: 'photoWallItem',
  title: 'Photo Wall Item',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Internal Title', type: 'string'}),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt text', type: 'string'}],
      validation: (Rule) => Rule.required()
    }),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
    defineField({name: 'date', title: 'Date', type: 'date'}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Travel', 'Daily life', 'Art', 'Architecture', 'Sea', 'Shanghai', 'Motherhood', 'Work']
      }
    }),
    defineField({
      name: 'featured',
      title: 'Featured Photo',
      description: 'Featured photos appear larger in the photo wall.',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 10
    })
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrderAsc',
      by: [{field: 'displayOrder', direction: 'asc'}]
    }
  ],
  preview: {
    select: {title: 'caption', subtitle: 'location', media: 'photo'},
    prepare: ({title, subtitle, media}) => ({title: title || 'Photo', subtitle, media})
  }
})
