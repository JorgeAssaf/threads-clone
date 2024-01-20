import { LoginButton } from '@/components/login-button'

export default function AuthPage() {
  return (
    <div className='container flex min-h-screen items-center justify-center'>
      <div className=' flex flex-col items-center gap-y-4 p-4'>
        <h1 className=' text-center font-bold'>
          Log in with your Instagram account
        </h1>
        <LoginButton />
      </div>
    </div>
  )
}
