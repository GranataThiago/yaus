import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation';
import React from 'react'
import CreateLink from '../components/dashboard/create-link';
import { api } from '@/trpc/server';
import LinksList from '../components/links/links-list';



export default async function Page() {
    const session = await getServerAuthSession();

    if(!session) {
        return redirect('/')
    }

    const links = await api.link.getByUser.query({ userId: session.user.id });

    return (
        <main className='h-dvh max-h-dvh w-3/4 mx-auto'>
            <CreateLink />

            <p className='pt-8 font-extrabold text-3xl'>Your links</p>
            <hr className='my-2'/>
            <LinksList className='grid grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' links={links}/>
        </main>
    )
}
