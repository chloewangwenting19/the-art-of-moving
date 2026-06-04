import {defineField, defineType} from 'sanity'

export const aboutMe = defineType({
  name: 'aboutMe',
  title: 'About Me',
  type: 'document',
  fields: [
    defineField({
      name: 'biography',
      title: 'Biography',
      description: 'A warm personal introduction. This can replace the intro paragraph on the website.',
      type: 'array',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'profilePhotos',
      title: 'Profile Photos',
      description: 'Upload 2-5 portraits or lifestyle photos.',
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
      ],
      validation: (Rule) => Rule.max(5)
    }),
    defineField({
      name: 'interests',
      title: 'Interests',
      description: 'Examples: art, travel, European culture, books, coffee, citywalk.',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'quotes',
      title: 'Quotes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'quote', title: 'Quote', type: 'text', rows: 2},
            {name: 'attribution', title: 'Attribution', type: 'string'},
            {name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 10}
          ],
          preview: {
            select: {title: 'quote', subtitle: 'attribution'}
          }
        }
      ]
    })
  ],
  preview: {
    prepare: () => ({title: 'About Me'})
  }
})
