import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

const Contact = () => {
  return (
    <>
    <section
    className="relative min-h-screen px-4 sm:px-8 md:px-[100px] py-[50px] flex flex-col justify-center items-center bg-[url('https://toppng.com/uploads/preview/city-night-moon-buildings-water-dark-11569870921inbgemqnla.jpg')] bg-cover bg-center">
    {/* Contact Info Header */}
    <div className="max-w-full md:max-w-[80%] text-center mt-[40px]">
        <h2 className="text-[36px] font-medium text-white">Contact Us</h2>
        <p className="text-[16px] font-light text-white">
        Ready to start your next construction project? Contact us today to discuss your vision, and let us help you build something amazing.
        </p>
    </div>

    
    <div className="w-3xl mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
    {/* Contact Details */}
    <div className="flex flex-col space-y-6 md:w-[90%] lg:w-full mx-auto">
        {/* Address */}
        <div className="flex space-x-4">
            <MapPin size={24} strokeWidth={2} className="text-cyan-500" />
            <div className="text-white text-[16px] font-light">
                <h3 className="font-medium text-cyan-400">Address</h3>
                <p>Đ. Lê Văn Lương, phường Nhân Chính, quận Thanh Xuân, Hà Nội</p>
            </div>
        </div>

        {/* Email */}
        <div className="flex space-x-4">
            <Mail size={24} strokeWidth={2} className="text-cyan-500" />
            <div className="text-white text-[16px] font-light">
                <h3 className="font-medium text-cyan-400">Email</h3>
                <p>gì đó @gmail.com</p>
            </div>
        </div>

        {/* Phone */}
        <div className="flex space-x-4">
            <Phone size={24} strokeWidth={2} className="text-cyan-500" />
            <div className="text-white text-[16px] font-light">
                <h3 className="font-medium text-cyan-400">Phone</h3>
                <p>+09123458676</p>
            </div>
        </div>
    </div>

    {/* Contact Form */}
    <div className="w-full md:w-[90%] lg:w-full bg-white p-6 md:p-8 rounded-lg shadow-lg mx-auto">
        <h2 className="text-[24px] font-medium text-gray-800 text-center mb-4">Feel free to send a message to us</h2>
        <form>
            <div className="mb-4">
                <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full p-3 border-b-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
            </div>
            <div className="mb-4">
                <input
                    type="email"
                    required
                    placeholder="Email"
                    className="w-full p-3 border-b-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
            </div>
            <div className="mb-4">
                <textarea
                    required
                    placeholder="Type your message..."
                    className="w-full p-3 border-b-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
            </div>
            <button className="w-full p-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition duration-300">
                Send
            </button>
        </form>
    </div>
</div>
    </section>
    </>
  )
}

export default Contact