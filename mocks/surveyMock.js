export default {
  fields: [
    {
      id: 0,
      title: 'Your Details',
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
        { name: 'Mac OS X (10.11)',
          img: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Osx-mavericks-logo.png' },
        { name: 'Windows',
          img: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg' },
        { name: 'Linux',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/NewTux.svg/100px-NewTux.svg.png' },
      ]
    },
    {
      id: 2,
      title: 'Equipment Preference',
      name: 'equipment',
      type: 'singleChoice',
      options: [
        { name: 'Apple MacBook Air',
          img: 'http://store.storeimages.cdn-apple.com/4931/as-images.apple.com/is/image/AppleInc/aos/published/images/m/ac/macbook/air/macbook-air-13-select-hero-201505?wid=265&hei=154&fmt=png-alpha&qlt=95&.v=1444731872423' },
        { name: 'Apple MacBook Pro Retina 13"',
          img: 'http://store.storeimages.cdn-apple.com/4931/as-images.apple.com/is/image/AppleInc/aos/published/images/m/ac/macbook/pro/macbook-pro-13-select-hero-201505?wid=228&hei=134&fmt=png-alpha&qlt=95&.v=1433485784426' },
        { name: 'Apple MacBook Pro Retina 15"',
          img: 'http://store.storeimages.cdn-apple.com/4931/as-images.apple.com/is/image/AppleInc/aos/published/images/m/ac/macbook/pro/macbook-pro-15-select-hero-201505?wid=267&hei=156&fmt=png-alpha&qlt=95&.v=1433482384585' },
      ]
    },
    {
      id: 3,
      title: 'External Monitors',
      name: 'monitors',
      type: 'singleChoice',
      options: [
        { name: 'Apple Cinema Display',
          img: 'http://store.storeimages.cdn-apple.com/4931/as-images.apple.com/is/image/AppleInc/aos/published/images/M/C9/MC914/MC914?wid=572&hei=572&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1444730064373' },
        { name: 'Dell Ultrasharp',
          img: 'http://i.dell.com/images/us/segments/dhs/ena/dell-mon-u2414h-149x149.jpg' },
      ]
    },
    {
      id: 4,
      title: 'IDE/Editor',
      name: 'editor',
      type: 'singleChoice',
      options: [
        { name: 'Atom',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Atom_editor_logo.svg/2000px-Atom_editor_logo.svg.png' },
        { name: 'IntelliJ IDEA',
          img: 'http://ikame.vn/img/intellij.svg' },
        { name: 'Sublime Text 3',
          img: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Sublime_Text_Logo.png' },
        { name: 'Webstorm',
          img: 'http://www.aaronmshapiro.com/wp-content/uploads/2014/06/webstormLogo.png' },
      ]
    }
  ]
};
