import { api } from '@/trpc/server'
import React from 'react'
import LinksList from '../links/links-list';

const LastLinks = async() => {

    const links = await api.link.getLast.query({
        length: 10
    });

  return (
    <div className='bottom-0 left-1/2 right-1/2 -translate-x-1/2 w-full h-[30rem] absolute bg-gradient-to-bl from-white to-transparent rounded-t-xl overflow-y-hidden shadow-2xl shadow-white/90 p-[2px]'>
      <div className='w-full h-full bg-gradient-to-br from-white via-secondary to-white rounded-t-xl p-8 flex flex-row items-start gap-2 '>

      <LinksList className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' links={links}/>

      </div>
    </div>
  )
}

export default LastLinks