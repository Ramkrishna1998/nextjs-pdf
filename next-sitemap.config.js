/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
    generateRobotsTxt: true, // (optional)
    changefreq: 'monthly',
    sitemapSize: 7000,
    // exlude: ["/form/saved"],
}