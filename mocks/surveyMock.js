export default {
  fields: [
    {
      id: 0,
      title: 'Personal Details',
      type: 'inputs',
      options: [
        {
          name: 'Name',
          input: {
            placeholder: '',
            type: 'text',
            value: 'Rohan Nair',
          }
        },
        {
          name: 'Title',
          input: {
            placeholder: '',
            type: 'text',
            value: 'Founder',
          }
        },
        {
          name: 'Department',
          input: {
            placeholder: '',
            type: 'text',
            value: 'Executive',
          }
        },
        {
          name: 'Email',
          input: {
            placeholder: '',
            type: 'email',
            value: 'rohan@qrtrmstr.com'
          }
        },
        {
          name: 'Phone',
          input: {
            placeholder: '',
            type: 'phone'
          }
        }
      ]
    },
    {
      id: 1,
      title: 'OS Preference',
      name: 'os',
      type: 'singleChoice',
      options: [
        { name: 'OS X 10.11' },
        { name: 'Windows' },
        { name: 'Linux' },
      ]
    },
    {
      id: 2,
      title: 'Equipment Preference',
      name: 'equipment',
      type: 'singleChoice',
      options: [
        { name: 'Apple MacBook Air' },
        { name: 'Apple MacBook Pro Retina 13"' },
        { name: 'Apple MacBook Pro Retina 15"' },
      ]
    },
    {
      id: 3,
      title: 'External Monitors',
      name: 'monitors',
      type: 'singleChoice',
      options: [
        { name: 'Apple Cinema Display' },
        { name: 'Dell Ultrasharp' },
      ]
    },
    {
      id: 4,
      title: 'IDE/Editor',
      name: 'editor',
      type: 'singleChoice',
      options: [
        { name: 'Atom' },
        { name: 'IntelliJ IDEA' },
        { name: 'Sublime Text 3' },
        { name: 'Webstorm' },
      ]
    }
  ]
};
