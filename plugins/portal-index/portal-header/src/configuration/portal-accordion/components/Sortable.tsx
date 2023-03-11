import { CSS } from '@dnd-kit/utilities'
import { PropsWithChildren } from 'react'
import { useSortable } from '@dnd-kit/sortable'

const Sortable = (props: PropsWithChildren<{ id: string }>) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  )
}

export default Sortable