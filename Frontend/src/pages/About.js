import React from "react";
import Layout from "../components/layout/layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
    <div>
            
    <div className='md:w-[100%] w-full text-[black] '>
        <div className='md:w-fullw-full ml-[20px] mr-[20px] justify-center items-center'>
            <h1 className='text-center  font-semibold mt-5 text-[25px]'>ABOUT US </h1>
            <hr className=' bg-[black] h-[2px]' />

            <div className='md:w-[100%] w-full h-[auto] mt-10 grid grid-cols-1 md:grid-cols-2'>
                <img src="images/about4.webp" className='ml-[100px] w-[65%] mt-6 md:mb-2 mb-10' alt="" />
                <div className='w-30% '>
                <p className=" text-[25px]">Ecommerce ; Leave a Mark and We Care</p>
                <hr className=" h-[2px] bg-[black]" />
                <p className=" text-[#777]">
                  We're known more by the impact we create than the titles we
                  hold. Impact that is brought by working together on audacious
                  challenges at scale with an aim to revolutionize for the
                  Indian customer. We believe great ideas can emerge from
                  anywhere and must be backed. Our people - backed by our
                  culture of end-to-end ownership - have revolutionised India's
                  e-commerce sector - several times over . Impact that is brought by working together on audacious
                  challenges at scale with an aim to revolutionize for the
                  Indian customer.
                </p>
                <br />
                <p className=" text-[#777]">
                  Our culture of care extends to our people, stakeholders,
                  customers and the planet! We do not believe in a one size fits
                  all strategy. Our benefits and care policies are driven by
                  empathy and customised to the unique needs of individual
                  Flipsters. Because when Flipsters and their families are cared
                  for, they can focus on doing their best work. We put your
                  hopes, dreams and endeavours first - always.
                </p>

                </div>
            </div>
            <div className='md:w-[100%] w-full h-[auto] mt-10 grid grid-cols-1 md:grid-cols-2'>
                <div className='w-30%  '>
                <p className=" text-[25px]">Ecommerce ; Experiment Learn Grow</p>
                <hr className="h-[2px] bg-[black]" />
                <p className=" text-[#777]">
                  Our journey of building India's biggest unicorn start-up has
                  been full of successes, but also failures and learning from
                  them. That's why there's calculated risk-taking, a high
                  willingness to learn and improvise, and a growth orientation
                  built into everything we do. Whether it be opening a new
                  warehouse, or making our mobile app a bit more consumer
                  friendly, we're always experimenting, learning and growing!
                </p>
                <br />
                <p className=" text-[#777]">
                  The best people make the best teams. And we put all our
                  efforts into finding the right people that fit into our
                  high-performing inclusive teams. Everyone has a voice on the
                  table and diversity of thoughts, styles and actions is
                  celebrated. From a category leader to a wishmaster, we are all
                  bound together and guided by our values of audacity, bias for
                  action, customer-first, integrity and inclusion.
                </p>
                </div>
                <img src="images/about3.webp " className='ml-20 w-[60%] mt-6 md:mb-2 mb-10' alt="" />
            </div>



        </div>
    

    </div>

{/* <Link to={"/about"}>about</Link> */}
</div>
    </Layout>
  );
};

export default About;
