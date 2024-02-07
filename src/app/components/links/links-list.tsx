import { RouterOutputs } from '@/trpc/shared'
import React from 'react'
import LinkCard from './link-card'

type Links = RouterOutputs['link']['getLast']

interface LinksListProps extends React.ComponentPropsWithoutRef<'div'>{
  links: Links
}

const LinksList = ({ links, ...props }: LinksListProps) => {

  return (
    <div {...props}>
        {
            links.map((link) => (
                <LinkCard key={link.slug} link={link} />
            ))
        }
    </div>
  )
}

export default LinksList