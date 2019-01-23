export default {
  cloud: {
    env: '',
    collections: {
      safes: 'safes',
      publicKeys: 'public_keys',
      settings: 'settings',
    }
  },
  defaultTheme: 'black',
  themes: {
    black: {
      name: 'black',
      navigationBar: {
        "frontColor": "#ffffff",
        "backgroundColor": "#353435"
      },
      tabBarStyle: {
        color: "#4D4C4D",
        selectedColor: "#ffffff",
        backgroundColor: "#353435",
        borderStyle: "white",
      },
      items: [
        {
          index: 0,
          selectedIconPath: "images/lock_fill.png"
        },
        {
          index: 1,
          selectedIconPath: "images/setup_fill.png"
        },
      ]
    },
    white: {
      name: 'white',
      navigationBar: {
        frontColor: "#000000",
        backgroundColor: "#ffffff",
      },
      tabBarStyle: {
        color: "#4D4C4D",
        selectedColor: "#555555",
        backgroundColor: "#ffffff",
        borderStyle: "black",
      },
      items: [
        {
          index: 0,
          selectedIconPath: "images/white_lock_fill.png"
        },
        {
          index: 1,
          selectedIconPath: "images/white_setup_fill.png"
        },
      ],
    },
  }
}
