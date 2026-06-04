import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'signatureName',
      title: 'Signature Logo Name',
      description: 'The handwritten-style name shown in the navigation and hero.',
      type: 'string',
      initialValue: 'Chloe Wang',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'The Art of Moving',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt text', type: 'string'}]
    }),
    defineField({
      name: 'introKicker',
      title: 'Introduction Label',
      type: 'string',
      initialValue: 'Not a resume'
    }),
    defineField({
      name: 'introTitle',
      title: 'Introduction Title',
      type: 'string'
    }),
    defineField({
      name: 'introductionText',
      title: 'Introduction Text',
      type: 'text',
      rows: 4
    })
  ],
  preview: {
    prepare: () => ({title: 'Home Page'})
  }
})
