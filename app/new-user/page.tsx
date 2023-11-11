import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/dist/server/api-utils'
import Image from 'next/image'
import Link from 'next/link'


const createNewUser = async () => {
	const user  = await currentUser()

	const match =  await prisma.user.findUnique({
		where: {
			clerkId: user.id as string
		}
	})
	if (!match) {
		await prisma.user.create({
			data: {
				clerkId: user.id as string,
				email: user?.emailAddresses[0].emailAddress
			}
		})
	}

	redirect('/journal')
}

export default async function NewUser() {
	await createNewUser();
  return (
    <div className='w-screen h-screen bg-black flex justify-center items-center text-white'>
     ...Loading
    </div>
    
  )
}