'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/app/components/ui/dropdown'
import React from 'react'
import Image from 'next/image';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { User } from 'next-auth';

const Avatar = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'}>
            <Image className='rounded-full' src={user.image || 'https://source.boringavatars.com/'} alt={user.name || 'Unnamed'} width={48} height={48} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
      <DropdownMenuItem className='flex'>
          <a href='/dashboard'>My Links</a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='flex'>
          <LogOut className="mr-2 h-4 w-4" />
          <a href='/api/auth/signout'>Log out</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Avatar