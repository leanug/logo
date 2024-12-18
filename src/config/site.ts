export const siteConfig = {
  title: 'Logoplacer',
  description: `
    Logoplacer is your go-to platform for placeholder logos and quick mockup designs, 
    enabling designers and developers to enhance workflows effortlessly. 
    Perfect for web apps, design tools, and product prototypes.`,
  siteUrl: 'https://www.logoplacer.com',
  navLinks: [
    {name: 'Home', url: '/'},
    {name: 'License', url: '/license'},
    {name: 'Contact', url: '/contact'},
  ],
  metaTags: {
    keywords: [
      'placeholder logos',
      'logo resources',
      'free logos',
      'design tools',
      'mockup design',
      'developer tools',
      'UI/UX design',
      'product prototypes',
      'web design assets',
      'logo placeholders',
      'design workflow',
      'Figma resources',
      'web app tools',
      'branding mockups',
      'graphic design helpers'
    ],
    ogImage: 'https://www.logoplacer.com/og-image.png'
  }
}

export type SiteConfig = typeof siteConfig
