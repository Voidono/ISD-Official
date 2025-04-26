import React, { useState, Fragment } from 'react';
import { MapPinIcon as MapPinIconOutline } from '@heroicons/react/24/outline'; // Đổi tên để tránh trùng nếu cần
import { Loader2 } from 'lucide-react'; // Icon Spinner
import { Dialog, Transition } from '@headlessui/react'; // Thư viện Modal
import Swal from 'sweetalert2'; // Thư viện Alert

// Dữ liệu giả lập cho các vị trí tuyển dụng
const jobOpenings = [
    {
        id: 1,
        title: 'Frontend Developer (ReactJS)',
        description: 'Phát triển giao diện người dùng web hiện đại, tối ưu hiệu năng và trải nghiệm người dùng.',
        location: 'Hà Nội',
    },
    {
        id: 2,
        title: 'Backend Developer (Node.js)',
        description: 'Xây dựng và bảo trì API, làm việc với cơ sở dữ liệu và đảm bảo hệ thống hoạt động ổn định.',
        location: 'TP. Hồ Chí Minh',
    },
    {
        id: 3,
        title: 'UI/UX Designer',
        description: 'Thiết kế giao diện, trải nghiệm người dùng cho các sản phẩm web và mobile của công ty.',
        location: 'Đà Nẵng (Remote)',
    },
    // Thêm vị trí nếu cần
];

const RecruitmentPage = () => {
    // --- State và Hàm cho Modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);

    function closeModal() {
        setIsModalOpen(false);
        // Reset form và trạng thái khi đóng modal
        setFormData({ name: '', email: '', phone: '', cv: null, message: '' });
        setSubmitStatus('idle');
    }

    function openModal() {
        setIsModalOpen(true);
        setSubmitStatus('idle'); // Reset trạng thái khi mở lại
    }
    // --------------------------------

    // --- State và Hàm cho Form bên trong Modal ---
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cv: null, // Sẽ lưu trữ đối tượng File
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('idle'); // idle, loading, success, error

    const handleFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'cv') {
            setFormData({ ...formData, cv: files ? files[0] : null });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        // Reset thông báo lỗi/thành công nếu người dùng thay đổi dữ liệu
        if (submitStatus !== 'idle' && submitStatus !== 'loading') {
            setSubmitStatus('idle');
        }
    };

    // --- Hàm xử lý gửi Form Ứng Tuyển ---
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // --- XÓA ĐOẠN KIỂM TRA CV Ở ĐÂY ---
        // if (!formData.cv) {
        //     Swal.fire({ icon: 'warning', title: 'Thiếu thông tin', text: 'Vui lòng tải lên CV của bạn.' });
        //     return;
        // }
        // ----------------------------------

        setIsSubmitting(true);
        setSubmitStatus('loading');

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        if (formData.phone) data.append('phone', formData.phone);
        if (formData.message) data.append('message', `(Ứng tuyển) ${formData.message}`);

        // Chỉ append file nếu người dùng đã chọn file
        if (formData.cv) {
            data.append('cvFile', formData.cv, formData.cv.name);
            console.log("Appending CV:", formData.cv.name);
        } else {
            console.log("No CV file selected to append.");
        }


        console.log("Submitting Application Form Data...");
        // for (let pair of data.entries()) { console.log(pair[0]+ ', ' + pair[1]); }

        try {
            const emailType = "application";
            const apiUrl = `http://localhost:7081/picon/mail/${emailType}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (response.ok) {
                // ... (xử lý success như cũ) ...
                setSubmitStatus('success');
                Swal.fire({
                    icon: 'success',
                    title: 'Nộp hồ sơ thành công!',
                    text: result.message || 'Chúng tôi đã nhận được hồ sơ của bạn.',
                }).then(() => {
                    setFormData({ name: '', email: '', phone: '', cv: null, message: '' });
                    closeModal();
                });
            } else {
                // ... (xử lý error backend như cũ) ...
                setSubmitStatus('error');
                Swal.fire({
                    icon: 'error',
                    title: 'Nộp hồ sơ thất bại!',
                    text: result.message || 'Có lỗi xảy ra từ máy chủ.',
                });
            }
        } catch (error) {
            // ... (xử lý error mạng như cũ) ...
            console.error("Submit Error:", error);
            setSubmitStatus('error');
            // ... (Swal.fire cho lỗi mạng) ...
            let errorText = 'Không thể gửi hồ sơ. Vui lòng kiểm tra kết nối mạng và thử lại.';
            // ... (Các kiểm tra lỗi cụ thể khác) ...
            Swal.fire({ icon: 'error', title: 'Lỗi!', text: errorText });

        } finally {
            setIsSubmitting(false);
        }
    };
    // ----------------------------------------

    // Hàm xử lý khi nhấn nút ứng tuyển cho vị trí cụ thể (chưa dùng để mở modal)
    const handlePositionApply = (jobId, jobTitle) => {
        console.log(`Nút Ứng tuyển cho vị trí "${jobTitle}" (ID: ${jobId}) được nhấn`);
        // Trong tương lai, bạn có thể muốn mở modal ở đây và truyền jobId/jobTitle vào form
        // openModal();
        // setFormData(prev => ({...prev, applyingFor: jobTitle})); // Ví dụ
    };

    return (
        // Phần div bao ngoài cùng của trang
        <div className="bg-slate-50 py-12 md:py-16">
            <div className="container mx-auto px-4 space-y-12 md:space-y-16">

                {/* === PHẦN 1: NỘP ĐƠN ỨNG TUYỂN (BANNER) === */}
                <div
                    className="
                        relative text-white p-8 md:p-10 rounded-xl shadow-xl min-h-[450px]
                        text-center overflow-hidden
                        bg-[url('https://apiweb.solenc.vn/public/1668315649131.jpg')] bg-cover bg-center
                        flex flex-col items-center justify-center
                        isolate before:content-[''] before:absolute before:inset-0
                        before:bg-black/70 before:rounded-xl before:z-[-1]
                    "
                >
                    {/* Nội dung trên banner */}
                    <div className="relative z-10">
                        <h2
                            onClick={openModal}
                            className="text-3xl md:text-4xl font-bold mb-4 max-w-3xl mx-auto cursor-pointer hover:text-gray-200 transition"
                        >
                            ỨNG TUYỂN NGÀY HÔM NAY!
                        </h2>
                        <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
                            Chúng tôi luôn tìm kiếm những tài năng đam mê và nhiệt huyết. Nếu bạn không tìm thấy vị trí phù
                            hợp bên dưới, hãy gửi CV của bạn cho chúng tôi.
                        </p>
                        <button
                            onClick={openModal}
                            className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white cursor-pointer"
                        >
                            Gửi hồ sơ của bạn
                        </button>
                    </div>
                </div>

                {/* === PHẦN 2: VỀ CHÚNG TÔI === */}
                <div className="bg-white p-8 md:p-10 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center md:text-left">Về chúng tôi</h2>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        {/* !!! THAY THẾ NỘI DUNG PLACEHOLDER BẰNG THÔNG TIN CÔNG TY BẠN !!! */}
                        Chào mừng bạn đến với [Tên công ty]! Chúng tôi là [Mô tả ngắn về công ty...]. Sứ mệnh của chúng
                        tôi là [Nêu sứ mệnh]. Tại đây, chúng tôi xây dựng một môi trường làm việc [Nêu đặc điểm môi
                        trường làm việc...] nơi mọi người có thể phát triển và đóng góp.
                        <br/><br/>
                        Chúng tôi tin rằng con người là yếu tố cốt lõi tạo nên thành công. Hãy gia nhập đội ngũ của
                        chúng tôi để cùng nhau tạo ra những giá trị tuyệt vời!
                    </p>
                </div>

                {/* === PHẦN 3: CÁC VỊ TRÍ ĐANG TUYỂN === */}
                <div className="bg-white p-8 md:p-10 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center md:text-left">Các vị trí đang tuyển dụng</h2>
                    {jobOpenings.length > 0 ? (
                        <div className="space-y-6">
                            {jobOpenings.map((job) => (
                                <div key={job.id}
                                     className="border border-gray-200 p-6 rounded-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                                    {/* Chi tiết công việc */}
                                    <div className="flex-grow mb-4 md:mb-0 md:mr-6">
                                        <h3 className="text-xl md:text-2xl font-semibold text-indigo-700 mb-2">{job.title}</h3>
                                        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-2">
                                            <MapPinIconOutline className="h-4 w-4 text-gray-400"/> {/* Đổi tên icon import nếu cần */}
                                            <span>{job.location}</span>
                                        </div>
                                        <p className="text-gray-600 text-base">{job.description}</p>
                                    </div>
                                    {/* Nút ứng tuyển cho vị trí cụ thể */}
                                    <button
                                        onClick={() => handlePositionApply(job.id, job.title)}
                                        className="bg-indigo-600 text-white font-medium py-2 px-5 rounded-md hover:bg-indigo-700 transition duration-300 whitespace-nowrap flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Ứng tuyển
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Thông báo khi không có vị trí nào
                        <p className="text-center text-gray-500 text-lg py-8">Hiện tại chúng tôi chưa có vị trí nào đang mở. Vui lòng quay lại sau hoặc gửi hồ sơ của bạn ở mục trên.</p>
                    )}
                </div>

            </div> {/* Kết thúc container */}

            {/* === MODAL ỨNG TUYỂN (Inline - Headless UI) === */}
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    {/* Lớp phủ nền */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                        leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
                    >

                    <div className="fixed inset-0   bg-opacity-50 backdrop-blur-sm" />


                    </Transition.Child>

                    {/* Nội dung Modal */}
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
                            >
                                {/* Panel Modal */}
                                <Dialog.Panel className="w-full max-w-4xl min-h-[65vh] transform overflow-hidden rounded-lg bg-white p-8 md:p-10 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-gray-900 border-b pb-3 mb-8 text-center">
                                        NỘP HỒ SƠ ỨNG TUYỂN
                                    </Dialog.Title>

                                    {/* FORM */}
                                    <form onSubmit={handleFormSubmit} className="mt-4">
                                        {/* Khu vực trống cho thông báo Swal */}
                                        <div className="min-h-[10px]"></div>

                                        {/* Chỉ hiển thị form nếu chưa submit thành công */}
                                        {submitStatus !== 'success' && (
                                            <>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                                                    {/* Họ và tên */}
                                                    <div>
                                                        <label htmlFor="modal-name"
                                                               className="block text-base font-medium text-gray-700 mb-1">Họ
                                                            và tên <span className="text-red-500">*</span></label>
                                                        <input type="text" name="name" id="modal-name" required
                                                               value={formData.name} onChange={handleFormChange}
                                                               className="block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-4 py-3"
                                                               disabled={isSubmitting}/>
                                                    </div>
                                                    {/* Email */}
                                                    <div>
                                                        <label htmlFor="modal-email"
                                                               className="block text-base font-medium text-gray-700 mb-1">Email <span
                                                            className="text-red-500">*</span></label>
                                                        <input type="email" name="email" id="modal-email" required
                                                               value={formData.email} onChange={handleFormChange}
                                                               className="block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-4 py-3"
                                                               disabled={isSubmitting}/>
                                                    </div>
                                                    {/* Số điện thoại */}
                                                    <div>
                                                        <label htmlFor="modal-phone"
                                                               className="block text-base font-medium text-gray-700 mb-1">Số
                                                            điện thoại</label>
                                                        <input type="tel" name="phone" id="modal-phone"
                                                               value={formData.phone} onChange={handleFormChange}
                                                               className="block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-4 py-3"
                                                               disabled={isSubmitting}/>
                                                    </div>
                                                    {/* Tải CV */}
                                                    <div>
                                                        {/* Sửa label: Bỏ dấu * màu đỏ */}
                                                        <label htmlFor="modal-cv"
                                                               className="block text-base font-medium text-gray-700 mb-1">Tải
                                                            lên CV (PDF, DOC, DOCX)</label>
                                                        <input
                                                            key={formData.cv ? 'file-selected' : 'no-file'}
                                                            type="file"
                                                            name="cv"
                                                            id="modal-cv"
                                                            // required // <-- XÓA thuộc tính này
                                                            onChange={handleFormChange}
                                                            accept=".pdf,.doc,.docx,.PDF,.DOC,.DOCX"
                                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                                                            disabled={isSubmitting}
                                                        />
                                                        {/* Phần hiển thị tên file đã chọn giữ nguyên */}
                                                        {formData.cv && <span
                                                            className="text-sm text-gray-500 mt-1 block">Đã chọn: {formData.cv.name}</span>}
                                                    </div>
                                                </div>
                                                {/* Lời nhắn */}
                                                <div className="mt-6">
                                                    <label htmlFor="modal-message"
                                                           className="block text-base font-medium text-gray-700 mb-1">Lời
                                                        nhắn</label>
                                                    <textarea name="message" id="modal-message" rows="4"
                                                              value={formData.message} onChange={handleFormChange}
                                                              className="block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-4 py-3"
                                                              disabled={isSubmitting}></textarea>
                                                </div>
                                                {/* Chú thích bắt buộc */}
                                                <p className="text-sm text-gray-500 mt-6"><span className="text-red-500">*</span> là trường bắt buộc</p>
                                            </>
                                        )}

                                        {/* Nút Bấm */}
                                        <div className="mt-8 flex justify-end space-x-3">
                                            {/* Chỉ hiển thị Hủy/Gửi khi chưa thành công */}
                                            {submitStatus !== 'success' && (
                                                <>
                                                    <button type="button" className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" onClick={closeModal} disabled={isSubmitting}>
                                                        Hủy bỏ
                                                    </button>
                                                    <button type="submit" className={`inline-flex justify-center items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`} disabled={isSubmitting}>
                                                        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Gửi hồ sơ'}
                                                    </button>
                                                </>
                                            )}
                                            {/* Chỉ hiển thị nút Đóng khi đã thành công */}
                                            {submitStatus === 'success' && (
                                                <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer" onClick={closeModal}>
                                                    Đóng
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                    {/* --- HẾT FORM --- */}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {/* === KẾT THÚC MODAL === */}

        </div> // Kết thúc div component chính
    );
};

export default RecruitmentPage;