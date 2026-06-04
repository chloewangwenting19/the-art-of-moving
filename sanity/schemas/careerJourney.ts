import {defineField, defineType} from 'sanity'

export const careerJourney = defineType({
  name: 'careerJourney',
  title: 'Career Journey',
  type: 'document',
  fields: [
    defineField({name: 'company', title: 'Company', type: 'string'}),
    defineField({name: 'category', title: 'Category Label', description: 'Small uppercase label shown above the card title.', type: 'string'}),
    defineField({name: 'role', title: 'Role', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'timePeriod', title: 'Time Period', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
    defineField({
      name: 'images',
      title: 'Photos or Project Images',
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
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      description: 'Lower numbers appear first.',
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
    select: {title: 'role', subtitle: 'company'}
  }
})
