export default {
  id: 'qrtrmstr-demo',
  survey: [
    {
      id: 'text1',
      form: false,
      heading: 'Hi Finn, congratulations on joining Quartermaster!',
      headerStyles: {
        textAlign: 'center'
      },
      body: '<p>We\'re super excited for your first day on <strong>February 1st, 2016</strong>. To make your onboarding a lot more fun, and get you up to speed as fast as possible, let\'s walk through some stuff.</p><p>You are a <strong>Node.js Developer</strong> on the <strong>Product Development</strong> team, reporting directly to <strong>Rohan Nair</strong> (who you can contact directly at <a href="mailto:rohan@qrtrmstr.com">rohan@qrtrmstr.com</a>).</p>'
    },
    {
      id: 'text2',
      form: false,
      heading: 'Hardware',
      body: '<p>At Quartermaster, we believe in giving you the equipment that you think will make you most succesful. On the following few pages you can choose the hardware you want, including:</p><ul><li><span>Workstation</span></li><li><span>Monitors</span></li><li><span>Mice</span></li><li><span>Keyboard</span></li><li><span>Stands</span></li><li><span>and other stuff...</span></li></ul><p>If you need something that you don\'t see, let us know on the last page</p>'
    },
    {
      id: 0,
      form: true,
      heading: 'Workstation',
      contents: {
        type: 'imageSelector',
        options: [
          {
            id: 'laptop-1',
            imageUri: '//dl.dropboxusercontent.com/u/5390261/CDN/q/mbpr.png',
            title: 'MacBook Pro',
            body: '13" laptop with Retina Display, 16GB RAM, 512GB SSD',
          },
          {
            id: 'laptop-2',
            imageUri: '//dl.dropboxusercontent.com/u/5390261/CDN/q/mbpa.png',
            title: 'MacBook Air',
            body: '13" laptop with 8GB RAM, 512GB SSD',
          },
          {
            id: 'laptop-3',
            imageUri: '//dl.dropboxusercontent.com/u/5390261/CDN/q/dell.png',
            title: 'Dell XPS F@K3',
            body: '13" laptop that isn\'t a Mac',
          }
        ]
      }
    },
    {
      id: 1,
      form: true,
      heading: 'External Monitors',
      contents: {
        type: 'imageSelector',
        options: [
          {
            id: 'monitor-1',
            imageUri: '//dl.dropboxusercontent.com/u/5390261/CDN/q/Dell-UltraSharp-U3415W-34-Inch-Curved-LED-Lit-Monitor.png',
            title: 'Dell Ultrasharp 34\"',
            body: '',
          },
          {
            id: 'monitor-2',
            imageUri: '//dl.dropboxusercontent.com/u/5390261/CDN/q/DU2414H.png',
            title: '2x Dell Ultrasharp 24\"',
            body: '',
          },
        ]
      }
    },
    {
      id: 2,
      form: true,
      heading: 'Mouse',
      contents: {
        type: 'imageSelector',
        options: [
          {
            id: 'mouse-1',
            imageUri: '//dl.dropboxusercontent.com/u/5390261/CDN/q/magicmouse.png',
            title: 'Apple Magic Mouse 2',
            body: '',
          },
          {
            id: 'mouse-2',
            imageUri: '//dl.dropboxusercontent.com/u/5390261/CDN/q/magictrackpad.png',
            title: 'Apple Magic Trackpad 2',
            body: '',
          },
          {
            id: 'mouse-3',
            imageUri: '//dl.dropboxusercontent.com/u/5390261/CDN/q/mxmaster.png',
            title: 'Logitech MX Master',
            body: '',
          },
          {
            id: 'mouse-4',
            imageUri: '//dl.dropboxusercontent.com/u/5390261/CDN/q/logitechtrackpad.png',
            title: 'Logitech Trackpad',
            body: '',
          },
        ]
      }
    },
    {
      id: 3,
      form: true,
      heading: 'Keyboard',
      contents: {
        type: 'imageSelector',
        options: [
          {
            id: 'keyboard-1',
            imageUri: '//dl.dropboxusercontent.com/u/5390261/CDN/q/applewireless.png',
            title: 'Apple Wireless',
            body: '',
          },
          {
            id: 'keyboard-2',
            imageUri: '//dl.dropboxusercontent.com/u/5390261/CDN/q/applewired.png',
            title: 'Apple Wired',
            body: '',
          },
          {
            id: 'keyboard-3',
            imageUri: '//dl.dropboxusercontent.com/u/5390261/CDN/q/logitechwireless.png',
            title: 'Logitech Wireless',
            body: '',
          },
          {
            id: 'keyboard-4',
            imageUri: '//dl.dropboxusercontent.com/u/5390261/CDN/q/logitechwired.png',
            title: 'Logitech Wired',
            body: '',
          },
        ]
      }
    },
    {
      id: 'text3',
      form: false,
      heading: 'Misc',
      className: 'textarea-container',
      body: '<textarea placeholder="Need something that wasn`t listed? Tell us here (Optional)"></textarea>'
    }
  ]
};
