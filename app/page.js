import AnimatedText from "@/components/ui/AnimatedText"
import LogoOrigami from "@/components/ui/LogoOrigami"
import Image from "next/image"

function page() {
  return (
    <div>
       <div className="flex flex-col">
       <div className="flex gap-2 items-center justify-center  my-24 ">
     <Image src={'/logo.svg'} width={80} height={80} alt='logo' />
        <h1 className="text-primary-light font-serif text-5xl">Interviewer.ai</h1>
     </div>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-between my-[-100px] ">
      <div className=" col-span-2"><AnimatedText/></div>  
      <div> <LogoOrigami/></div>
       </div>
    </div>
  )
}

export default page