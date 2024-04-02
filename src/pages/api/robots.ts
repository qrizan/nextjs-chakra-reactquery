export default function handler(req: { headers: { host: any; }; }, res: { send: (arg0: string) => void; }) {
  const host = req.headers.host;

  const URL = `http://${host}`;

  res.send(`User-agent: *\nDisallow: /profile\n\nSitemap: ${URL}/sitemap.xml`);
}