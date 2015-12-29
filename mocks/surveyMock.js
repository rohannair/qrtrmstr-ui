export default {
  fields: [
    {
      title: 'Main',
      type: 'inputs',
      options: [
        {
          name: 'Name',
          input: {
            placeholder: '',
            type: 'text'
          }
        },
        {
          name: 'Email',
          input: {
            placeholder: '',
            type: 'email'
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
      title: 'External Monitors',
      name: 'monitors',
      type: 'singleChoice',
      options: [
        { name: 'Apple Cinema Display' },
        { name: 'Dell Ultrasharp' },
      ]
    },
  ]
};
