'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Copy, Trash } from 'lucide-react'
import { RouterOutputs } from '@/trpc/shared'
import { api } from '@/trpc/react';
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Link = RouterOutputs['link']['getLast'][0]



const LinkCardActions = ({ link }: { link: Link }) => {

    const router = useRouter();

    const { mutate } = api.link.delete.useMutation({
        onSuccess: () => {
            toast('Link Removed!')
            router.refresh();
            return;
        }
    })

    const deleteLink = () => {
        mutate({ slug: link.slug })
    }

    const copyLink = async() => {
        await navigator.clipboard.writeText(`https://yausr.vercel.app/${link.slug}`);
        toast.success('Link copied!', { position: 'bottom-center' })
    }

    return (
    <div className='flex flex-row gap-0'>
        <Button className='p-1' variant={'ghost'} onClick={copyLink}>
            <Copy size={20}/>
        </Button>
        <Button className='p-1' variant={'ghost'} onClick={deleteLink}>
            <Trash size={20}/>
        </Button>
    </div>
    )
}

export default LinkCardActions