

import { api } from '@/trpc/server'
import { redirect } from 'next/navigation'


export default async function LinkPage ({ params }: { params: { slug: string } }) {
    const foundLink = await api.link.getBySlug.query({
        slug: params.slug
    })
    
    return redirect(foundLink ? foundLink.redirectUrl : '/')
}