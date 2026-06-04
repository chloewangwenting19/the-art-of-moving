import {defineField, defineType} from 'sanity'

export const contactSettings = defineType({
  name: 'contactSettings',
  title: 'Contact and Social Links',
  type: 'document',
  fields: [
    defineField({name: 'email', title: 'Email', type: 'email'}),
    defineField({name: 'instagram', title: 'Instagram URL', type: 'url'}),
    defineField({name: 'linkedin', title: 'LinkedIn URL', type: 'url'}),
    defineField({
      name: 'socialLinks',
      title: 'Other Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
            {name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 10}
          ],
          preview: {
            select: {title: 'label', subtitle: 'url'}
          }
        }
      ]
    })
  ],
  preview: {
    prepare: () => ({title: 'Contact and Social Links'})
  }
})
