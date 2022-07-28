import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Payplo</title>
        <meta name="description" content="똑똑한 팀을 위한 SaaS 관리 플랫폼 | Payplo - 구독 서비스 관리를 한 곳에서 쉽고 편하게" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
    </div>
  )
}

export default Home
