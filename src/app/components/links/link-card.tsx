import { RouterOutputs } from '@/trpc/shared'
import React from 'react'
import { api } from '@/trpc/server'
import LinkCardActions from './link-card-actions'

type Link = RouterOutputs['link']['getLast'][0]
const LinkCard = (link: Link) => {


  return (
    <div className='bg-gradient-to-br from-white to-transparent rounded-lg w-56 p-[2px] shadow-xl shadow-black/10'>
      <div className='bg-gradient-to-br from-primary to-white rounded-lg w-full h-full px-4 py-8 grid place-content-center gap-4'>
          <header className='flex justify-between items-center'>
              <p className='font-bold'>/{link.slug}</p>
              <LinkCardActions link={link} />
          </header>
          <a className='text-sm overflow-hidden text-ellipsis text-nowrap' href={link.redirectUrl}>{link.redirectUrl}</a>
      </div>
    </div>

  )
}



export default LinkCard