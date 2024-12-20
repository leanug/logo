import AuthContent from '@/components/Auth/AuthContent'

async function LoginPage() {
  return (
    <div className="h-screen flex items-center w-full justify-center">
      <div className="p-6 rounded-lg border w-full max-w-96 shadow-sm bg-base-100">
        <AuthContent />
      </div>
    </div>
  )
}

export default LoginPage
