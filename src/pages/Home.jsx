import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import avatarIcon from '../assets/images/avatar-icon.png';
import faqImg from '../assets/images/faq-img.png';
import featureImg from '../assets/images/feature-img.png';
import heroImg01 from '../assets/images/hero-img01.png';
import heroImg02 from '../assets/images/hero-img02.png';
import heroImg03 from '../assets/images/hero-img03.png';
import icon01 from '../assets/images/icon01.png';
import icon02 from '../assets/images/icon02.png';
import icon03 from '../assets/images/icon03.png';
import videoIcon from '../assets/images/video-icon.png';
import About from '../components/About/About';
import DoctorList from '../components/Doctors/DoctorList';
import FaqList from '../components/Faq/FaqList';
import ServiceList from '../components/Services/ServiceList';
import Testimonial from '../components/Testimonial/Testimonial';

const Home = () => {
    return (
        <>
            {/* ==================== hero section ========================= */}
            <section className='hero__section pt-[60px] 2xl:h-[800px]'>
                <div className='container mx-auto px-4'>
                    <div className='flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-between'>

                        {/* ======================== hero content ========================= */}
                        <div className='w-full lg:w-1/2'>
                            <div className='lg:w-[570px]'>
                                <h1 className='text-2xl leading-tight text-headingColor font-bold md:text-4xl md:leading-tight'>
                                    We help patients live a healthy, longer life.
                                </h1>
                                <p className='text__para mt-4'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem odio et distinctio rem, repudiandae quod accusantium placeat excepturi odit vel earum sunt, reprehenderit deserunt ratione. Veritatis, ducimus. Voluptas, sed iusto.
                                </p>
                                <button className='btn mt-4'>
                                    Request an Appointment
                                </button>
                            </div>
                            {/* ===================== hero counter ============================ */}
                            <div className='mt-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8'>
                                <div>
                                    <h2 className='text-2xl leading-tight lg:text-3xl lg:leading-tight font-bold text-headingColor'>
                                        30+
                                    </h2>
                                    <span className='w-20 h-1 bg-yellowColor rounded-full block mt-[-4px]'></span>
                                    <p className='text__para'>Years of Experience</p>
                                </div>

                                <div>
                                    <h2 className='text-2xl leading-tight lg:text-3xl lg:leading-tight font-bold text-headingColor'>
                                        15+
                                    </h2>
                                    <span className='w-20 h-1 bg-purpleColor rounded-full block mt-[-4px]'></span>
                                    <p className='text__para'>Clinic Location</p>
                                </div>

                                <div>
                                    <h2 className='text-2xl leading-tight lg:text-3xl lg:leading-tight font-bold text-headingColor'>
                                        100%
                                    </h2>
                                    <span className='w-20 h-1 bg-irisBlueColor rounded-full block mt-[-4px]'></span>
                                    <p className='text__para'>Patient Satisfaction</p>
                                </div>
                            </div>
                        </div>

                        {/* ===================== hero content ============================ */}
                        <div className='flex gap-4 lg:gap-8 justify-end w-full lg:w-1/2'>
                            <div>
                                <img className='w-full' src={heroImg01} alt="Hero 1" />
                            </div>
                            <div className='mt-4'>
                                <img src={heroImg02} alt="Hero 2" className='w-full mb-4' />
                                <img src={heroImg03} alt="Hero 3" className='w-full' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ============================= hero section end ==================================== */}
            <section className='py-16'>
                <div className="container mx-auto px-4">
                    <div className='lg:w-[470px] mx-auto'>
                        <h2 className='heading text-center'>
                            Providing the best medical services
                        </h2>
                        <p className='text__para text-center mt-4'>
                            World-class care for everyone. Our health System offers unmatched, expert health care.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mt-8'>

                        <div className='py-8 px-4'>
                            <div className='flex items-center justify-center'>
                                <img src={icon01} alt="Icon 1" />
                            </div>

                            <div className="mt-8 text-center">
                                <h2 className='text-xl leading-tight text-headingColor font-bold'>
                                    Find a Doctor
                                </h2>
                                <p className='text-base leading-7 text-textColor mt-4'>
                                    World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.
                                </p>

                                <Link to='/doctors' className='w-10 h-10 rounded-full border border-solid border-gray-800 mt-8 mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                                    <BsArrowRight className='group-hover:text-white w-6 h-6' />
                                </Link>
                            </div>
                        </div>

                        <div className='py-8 px-4'>
                            <div className='flex items-center justify-center'>
                                <img src={icon02} alt="Icon 2" />
                            </div>

                            <div className="mt-8 text-center">
                                <h2 className='text-xl leading-tight text-headingColor font-bold'>
                                    Find a Location
                                </h2>
                                <p className='text-base leading-7 text-textColor mt-4'>
                                    World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.
                                </p>

                                <Link to='/doctors' className='w-10 h-10 rounded-full border border-solid border-gray-800 mt-8 mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                                    <BsArrowRight className='group-hover:text-white w-6 h-6' />
                                </Link>
                            </div>
                        </div>

                        <div className='py-8 px-4'>
                            <div className='flex items-center justify-center'>
                                <img src={icon03} alt="Icon 3" />
                            </div>

                            <div className="mt-8 text-center">
                                <h2 className='text-xl leading-tight text-headingColor font-bold'>
                                    Book Appointment
                                </h2>
                                <p className='text-base leading-7 text-textColor mt-4'>
                                    World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.
                                </p>

                                <Link to='/doctors' className='w-10 h-10 rounded-full border border-solid border-gray-800 mt-8 mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                                    <BsArrowRight className='group-hover:text-white w-6 h-6' />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <About />

            {/* ============================ services section============================ */}
            <section className='py-16'>
                <div className='container mx-auto px-4'>
                    <div className='xl:w-[470px] mx-auto'>
                        <h2 className='heading text-center'>
                            Our medical services
                        </h2>
                        <p className='text__para text-center mt-4'>
                            World-class care for everyone. Our health System offers unmatched, expert health care.
                        </p>
                    </div>
                    <ServiceList />
                </div>
            </section>
            {/* ============================ services section end ======================== */}

            {/* ============================ feature section ============================= */}
            <section className='py-16'>
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between">

                        {/* =============== feature content ======================== */}
                        <div className='xl:w-[670px]'>
                            <h2 className='heading'>
                                Get Virtual treatment <br /> from anywhere.
                            </h2>

                            <ul className='pl-4 mt-4'>
                                <li className='text__para'>
                                    1. Schedule the appointment directly.
                                </li>
                                <li className='text__para'>
                                    2. Search for your physician here, and contact their office.
                                </li>
                                <li className='text__para'>
                                    3. View our physician who are accepting new patients, use the online scheduling tool to select an appointment time.
                                </li>
                            </ul>

                            <Link to='/'>
                                <button className="btn mt-4">Learn More</button>
                            </Link>
                        </div>

                        {/*  ========================= feature img ================================= */}
                        <div className="relative z-10 xl:w-[770px] flex justify-end mt-8 lg:mt-0">
                            <img src={featureImg} className='w-3/4' alt="Feature" />

                            <div className='w-36 lg:w-60 bg-white absolute bottom-12 left-0 md:bottom-24 md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-6 rounded-lg'>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 lg:gap-3">
                                        <p className='text-xs leading-none lg:text-sm lg:leading-none text-headingColor font-bold'>Tue, 24</p>
                                        <p className='text-xs leading-none lg:text-sm lg:leading-none text-headingColor font-normal'>10:00AM</p>
                                    </div>
                                    <span className='w-5 h-5 lg:w-8 lg:h-8 flex items-center justify-center bg-yellowColor rounded py-1 px-2 lg:py-2 lg:px-3'>
                                        <img src={videoIcon} alt="Video Icon" />
                                    </span>
                                </div>

                                <div className='w-16 lg:w-24 bg-[#CCF0F3] py-1 px-2 lg:py-1.5 lg:px-2.5 text-xs leading-none lg:text-sm lg:leading-none text-irishBlueColor font-medium mt-2 lg:mt-4 rounded-full'>
                                    Consultation
                                </div>

                                <div className='flex items-center gap-2 lg:gap-3 mt-2 lg:mt-4'>
                                    <img src={avatarIcon} alt="Avatar" />
                                    <h4 className='text-xs leading-none lg:text-sm lg:leading-none font-bold text-headingColor'>
                                        Suraj Gautam
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ============================ feature section end ========================== */}
            {/* ============================ our great doctors ============================ */}
            <section className='py-16'>
                <div className="container mx-auto px-4">
                    <div className='xl:w-[470px] mx-auto'>
                        <h2 className='heading text-center'>
                            Our great doctors
                        </h2>
                        <p className='text__para text-center mt-4'>
                            World-class care for everyone. Our health System offers unmatched, expert health care.
                        </p>
                    </div>
                    <DoctorList />
                </div>
            </section>
            {/* ============================ our great doctors end ============================ */}
            {/* ============================ faq section =================================== */}
            <section className='py-16'>
                <div className='container mx-auto px-4'>
                    <div className='flex flex-col md:flex-row justify-between gap-8'>
                        <div className='w-full md:w-1/2 hidden md:block'>
                            <img src={faqImg} alt="FAQ" />
                        </div>
                        <div className='w-full md:w-1/2'>
                            <h2 className='heading'>
                                Most questions by our beloved patients
                            </h2>
                            <FaqList />
                        </div>
                    </div>
                </div>
            </section>
            {/* ============================ faq section end ================================ */}
            {/*  =========================== testimonial =================================== */}
            <section className='py-16'>
                <div className="container mx-auto px-4">
                    <div className='xl:w-[470px] mx-auto'>
                        <h2 className='heading text-center'>
                            What our patient say
                        </h2>
                        <p className='text__para text-center mt-4'>
                            World-class care for everyone. Our health System offers unmatched, expert health care.
                        </p>
                    </div>
                    <Testimonial />
                </div>
            </section>
            {/*  =========================== testimonial end =================================== */}
        </>
    )
}

export default Home
