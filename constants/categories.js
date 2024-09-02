const Categories = [
  {
    name: 'ongoing',
    items: [
      {
        name: 'Networking Event',
        price: 199,
        isTopOfTheWeek: true,
        deadline: '26-aug',
        payEnabled: false,
      },
      {
        name: 'System Upgrade',
        price: 299,
        isTopOfTheWeek: false,
        deadline: '27-aug',
        payEnabled: false,
      },
      {
        name: 'Data Backup',
        price: 149,
        isTopOfTheWeek: false,
        deadline: '28-aug',
        payEnabled: false,
      },
    ],
  },
  {
    name: 'pending',
    items: [
      {
        name: 'Linux Server Setup',
        price: 299,
        isTopOfTheWeek: false,
        deadline: '30-aug',
        payEnabled: false,
      },
      {
        name: 'Network Configuration',
        price: 199,
        isTopOfTheWeek: true,
        deadline: '26-aug',
        payEnabled: false,
      },
      {
        name: 'Firewall Installation',
        price: 229,
        isTopOfTheWeek: true,
        deadline: '27-aug',
        payEnabled: false,
      },
    ],
  },
  {
    name: 'completed',
    items: [
      {
        name: 'Linux Migration',
        price: 399,
        isTopOfTheWeek: true,
        deadline: '24-aug',
        payEnabled: true,
      },
      {
        name: 'Server Maintenance',
        price: 249,
        isTopOfTheWeek: false,
        deadline: '25-aug',
        payEnabled: true,
      },
      {
        name: 'VPN Setup',
        price: 199,
        isTopOfTheWeek: true,
        deadline: '26-aug',
        payEnabled: true,
      },
    ],
  },
];

export default Categories;
