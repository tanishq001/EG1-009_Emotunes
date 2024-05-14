import React from 'react';
import pic from "./test.png";
import Navbar from "../navbar/Navbar";
import tanishq from "./tanishq.jpg";
import tamanna from "./tamanna.jpg"
import tanisha from "./tanisha.jpg"
import tanya from "./tanya.jpg"
export const AboutUs = () => {
  return (
    <div className='flex flex-col h-screen bg-emerald-800 '>
      {/* Navbar component */}
      <Navbar />

      {/* Content */}
      <div className='flex flex-col md:flex-row justify-center items-center'>
        <div className='md:w-1/2 mx-8 ml-8 pl-10'>
        <h1 class="text-left md:text-[45px] text-2xl  md:pb-[50px] font-bold text-white bg-emerald-800">About Us</h1>
          <div>
            <p className="text-white text-xl text-justify">
            Welcome to EmoTunes, where the power of music meets cutting-edge technology. We are a team passionate about revolutionizing therapy through the fusion of music and facial emotion recognition.
            
Through our innovative platform, individuals can embark on a journey of self-discovery, healing, and empowerment. Whether you're seeking relief from stress, anxiety, depression, or simply looking to enhance your emotional well-being, EmoTunes offers a personalized and immersive experience like no other.

What sets us apart is our commitment to inclusivity and accessibility. Our software is designed to adapt to the unique needs and preferences of each user, ensuring that everyone can benefit from the therapeutic power of music.
</p>
          </div>
        </div>
        <div className='md:w-1/2 md:mx-auto'>
          <img src={pic} alt="About Us Illustration" className="md:max-w-full h-auto mx-auto" />
        </div>
      </div>

      <h1 class="flex items-center flex-col text-center md:text-[45px] text-2xl  md:pb-[50px] p-10 font-bold text-white bg-emerald-800">Our Team Members
        </h1>
      <div class="flex justify-center flex-col md:flex-row items-center bg-emerald-800">
        <div class="m-2 text-white ">
          <img src={tamanna} alt="" width="200" height="200" className='rounded-full aspect-square object-cover object-top  bg-white' />
          <div class="px-2 bg-main w-[90%]  relative -top-1 left-[15px] h-10 flex justify-between items-center ">
            <p class="font-bold text-xl ">Tamanna Sharma</p>
          </div>
        </div>
        <div class="m-2 text-white ">
          <img src={tanisha} alt="" width="200" height="200" className='rounded-full aspect-square object-cover object-top  bg-white'/>
          <div class="px-3 bg-main w-[90%]  relative -top-1 left-[15px] h-10 flex justify-between items-center ">
            <p class="font-bold text-xl ">Tanisha Mudgal</p>
          </div>
        </div>
        <div class="m-2 text-white ">
          <img src={tanishq} alt="" width="200" height="200" className='rounded-full aspect-square object-cover object-top bg-white' />
          <div class="px-3 bg-main w-[90%]  relative -top-1 left-[20px] h-10 flex justify-between items-center ">
            <p class="font-bold text-xl ">Tanishq Goyal</p>
          </div>
        </div>
        <div class="m-2 text-white ">
          <img src={tanya} alt="" width="200" height="200" className='rounded-full aspect-square object-cover object-top bg-white'/>
          <div class="px-3 bg-main w-[90%]  relative -top-1 left-[30px] h-10 flex justify-between items-center ">
            <p class="font-bold text-xl ">Tanya Verma</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;







// import React from 'react'

// export const AboutUs = () => {
//   return (
//     <div className='flex justify-center items-center'>
//         <p className="text-bold text-white"> About Us</p>
//     <div className='flex flex-col'>
//         <div className=''>
//             <p>
//             Lorem epsum
//             </p>
//         </div>

//         <div className=''>
//             <img src={}/>
//         </div>
//     </div>
{/* <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
  <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512">
  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
    <blockquote>
      <p class="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div class="text-sky-500 dark:text-sky-400">
        Sarah Dayan
      </div>
      <div class="text-slate-700 dark:text-slate-500">
        Staff Engineer, Algolia
      </div>
    </figcaption>
  </div>
</figure>
//     </div> */}
//   )
// }
