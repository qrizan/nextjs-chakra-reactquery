import axios from "axios";


function generateSiteMap(games: { slug: string; updatedAt: string; }[], host: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
   <loc>${host}</loc>
   <priority>1</priority>
 </url>
 <url>
   <loc>${`${host}/posts/`}</loc>
   <changefreq>weekly</changefreq>
   <priority>0.8</priority>
 </url>   
     ${games
      .map((game: { slug: string; updatedAt: string; }) => {
        return `
       <url>
           <loc>${`${host}/posts/${game.slug}`}</loc>
           <lastmod>${game.updatedAt}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.8</priority>           
       </url>
     `;
      })
      .join('')}
   </urlset>
 `;
}

function SiteMap() {
}

export async function getServerSideProps({ req, res }: any) {
  const reqPosts = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/public/games`)
  const resreqPosts = await reqPosts.data

  const host = `http://${req.headers.host}`;

  const sitemap = generateSiteMap(resreqPosts.data, host);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;