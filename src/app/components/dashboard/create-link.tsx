'use client'

import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { useForm, SubmitHandler } from "react-hook-form"
import { api } from '@/trpc/react';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';
import { generateHash } from '@/lib/utils';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';

type LinkCreationForm = {
    slug: string;
    redirectUrl: string;
}



const CreateLink = () => {

  const router = useRouter();

  const { mutate, isLoading } = api.link.create.useMutation({
        onSuccess: () => {
            toast('Link Created!')
            router.refresh();
        },
        onError: (err) => {
            console.log(err)
        }
    })

  const {
    handleSubmit,
    register,
    formState,
    getValues,
    setValue
  } = useForm<LinkCreationForm>()

  const onLinkCreated: SubmitHandler<LinkCreationForm> = async(data) => {

    mutate({
        slug: data.slug,
        redirectUrl: data.redirectUrl
    })

    
    
  } 

  const createRandomHash = () => {
    if(!getValues().redirectUrl) return;
    const hash = generateHash(getValues().redirectUrl);
    setValue('slug', hash);
  }

  return (
    <div className='p-[2px] bg-gradient-to-br from-white to-transparent mx-auto rounded-xl shadow-2xl shadow-white/90'>
        <form onSubmit={handleSubmit(onLinkCreated)} className='bg-gradient-to-br from-white via-primary to-white rounded-xl flex flex-col gap-2 items-center justify-center p-4 w-full'>
            <div className='flex flex-col gap-2 w-full'>
                <Label htmlFor='slug'>Redirect URL</Label>
                <Input id='slug' placeholder='Redirect to' className='flex-1' type='text' {...register('redirectUrl', { required: true })}/>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <Label htmlFor='slug'>Final URL 😎</Label>
                <div className='flex flex-row items-center'>
                <p className='rounded-l-md bg-slate-200 text-black p-2'>{`${'https://yaus-two.vercel.app/'}`}</p>
                <div className="relative flex items-center flex-1">
                    <Button type='button' onClick={createRandomHash} className="absolute right-2 top-1/2 h-8  -translate-y-1/2 transform" >
                        <Sparkles className="h-4 w-4" size={16}/>
                    </Button>
                    <Input id='slug' placeholder='slug' className='flex-1 rounded-l-none' type='text' {...register('slug', { required: true })}/>
                </div>

                </div>
            </div>
            <Button variant={'default'} type='submit' className='p-4 place-self-end disabled:bg-secondary' disabled={isLoading}> Create </Button>
        </form>
    </div>
  )
}

export default CreateLink