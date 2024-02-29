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
    }

    return (
    <div>
        <Button variant={'ghost'} onClick={copyLink}>
            <Copy size={20}/>
        </Button>
        <Button variant={'ghost'} onClick={deleteLink}>
            <Trash size={20}/>
        </Button>
    </div>
    )
}

export default LinkCardActions