import React from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Coffee Connoisseur
          </h1>
        </main>
      </div>
    </React.Fragment>
  )
}
