'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { type Session } from '@supabase/auth-helpers-nextjs'
import { Hash, ImageIcon, MenuSquareIcon, X } from 'lucide-react'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { addPost } from '@/app/_actions/post'

import { Button } from './ui/button'

export type FileWithPreview = { path: string; preview: string }

export const CreateThread = ({ session }: { session: Session }) => {
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileWithPreview[] | null>(
    null,
  )
  const inputFileRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleOpenFile = () => {
    inputFileRef.current?.click()

    if (inputFileRef.current?.files) {
      inputFileRef.current.value = ''
    }
  }

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const filesWithPreview = Array.from(files).map((file) => {
        return Object.assign(file, {
          path: file.name.replace(/\s/g, '-').toLowerCase(),
          preview: URL.createObjectURL(file),
        })
      })
      setSelectedFile((prev) => [...(prev || []), ...filesWithPreview])
    }
  }

  return (
    <>
      <Image
        src={session.user?.user_metadata?.avatar_url}
        alt='avatar'
        width={36}
        height={36}
        className='rounded-full'
      />
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setOpen(true)}
              variant='ghost'
              className=' bg-transparent p-0 font-thin hover:bg-transparent'
            >
              Start a thread
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-lg'>
            <DialogHeader className='flex flex-col space-y-4'>
              <DialogTitle>New Thread</DialogTitle>
              <DialogDescription asChild>
                <div className='grid grid-cols-[36px,1fr] items-start gap-4'>
                  <div className='flex justify-start space-x-2'>
                    <Image
                      src={session.user?.user_metadata?.avatar_url}
                      alt='avatar'
                      width={36}
                      height={36}
                      className='rounded-full '
                    />
                  </div>
                  <div className='flex w-full flex-col justify-end'>
                    <h2 className='font-semibold text-primary'>
                      {session.user?.user_metadata?.full_name}
                    </h2>

                    <form
                      ref={formRef}
                      className='flex flex-col'
                      action={async (formData: FormData) => {
                        try {
                          if (!formData.get('body')) {
                            toast.error('Post body is required!')
                            return
                          }
                          await addPost(formData)
                          setOpen(false)
                          toast.promise(addPost(formData), {
                            loading: 'Posting...',
                            success: 'Posted !',
                            error: 'Error',
                          })
                          formRef.current?.reset()
                        } catch (error) {
                          if (error instanceof Error) {
                            toast.error('Post failed!')
                          }
                        }
                      }}
                    >
                      <input
                        type='text'
                        name='body'
                        autoComplete='off'
                        className='w-full bg-transparent p-0 focus:border-secondary focus:outline-none'
                        placeholder='Start a thread'
                      />
                      <div className='mt-2 flex items-center space-x-2'>
                        <input
                          type='file'
                          accept='image/*'
                          multiple
                          hidden
                          ref={inputFileRef}
                          onChange={handleInputFile}
                        />
                        <ImageIcon
                          onClick={handleOpenFile}
                          size={20}
                          className='text-muted-foreground/40 '
                        />
                        <Hash size={20} className='text-muted-foreground/40 ' />
                        <MenuSquareIcon
                          size={20}
                          className='text-muted-foreground/40 '
                        />
                      </div>

                      <div className='relative mt-2 flex items-center space-x-2'>
                        {selectedFile ? (
                          <>
                            {selectedFile.map((file) => {
                              return (
                                <div className='relative' key={file.preview}>
                                  <div className='absolute right-0 top-1 rounded-full bg-background p-1 '>
                                    <X
                                      size={18}
                                      className='text-primary'
                                      onClick={() =>
                                        setSelectedFile(
                                          (prev) =>
                                            prev?.filter(
                                              (f) => f.path !== file.path,
                                            ) || null,
                                        )
                                      }
                                    />
                                  </div>
                                  <img src={file.preview} alt={file.path} />
                                </div>
                              )
                            })}
                          </>
                        ) : null}
                      </div>

                      <div className='flex justify-end'>
                        <Button type='submit'>Post</Button>
                      </div>
                    </form>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
