import H1 from '@/components/H1'
import H3 from '@/components/H3'
import Navbar from '@/components/Navbar'
import XMargins from '@/components/XMargins'
import YMargins from '@/components/YMargins'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='bg-base-200'>
      <Navbar />
      <XMargins>
        <YMargins className="flex flex-col items-center">
          <H1>Chat Cards</H1>
          <br />
          <H3>Speak to your flashcards and validate your answers with AI</H3>
          <br /> 
          <p className='text-center'>Chat Cards is a plattform where people with reading/writing difficulties can utilize the power of flashcards with Machine Learning</p>
          <br />
          <Link href="/signin">
            <button className="btn btn-primary" name='signup'>Sign In</button>
          </Link>
          <div className='flex flex-wrap gap-8 pt-8'>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Cutting Edge</h2>
                <p>ChatCards uses Large langauge models, Text to speech and speech to text AI in order to help you utilize the power of flashcards</p>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Social Good</h2>
                <p>ChatCards benefits people with reading difficulties by focusing on listening and speaking, making learning more comfortable and effective for them.</p>
              </div>
            </div>
          </div>
        </YMargins>
      </XMargins>
    </main>
  )
}
