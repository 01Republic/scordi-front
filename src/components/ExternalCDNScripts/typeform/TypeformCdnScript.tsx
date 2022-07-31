export function TypeformCdnScript() {
  return (
    process.env.NODE_ENV !== 'development' ? (
      <script id="cdn-typeform" src="//embed.typeform.com/next/embed.js" />
    ) : <></>
  )
}
